import {Component, effect, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);

  coursesService = inject(CoursesService);

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: ['']
  });

  category = signal<CourseCategory>("BEGINNER") ;

  onCancel() {
    this.dialogRef.close();
  }

  constructor() {
    this.form.patchValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl
    });

    effect(()  => {
      console.log(`Course category bi-directional binding: ${this.category()}`);
    })
  }

  async onSave() {

    const courseProps = this.form.value as Partial<Course>;

    if (this.data?.mode == 'create') {
      await this.createCourse(courseProps);
    } else if (this.data?.mode == 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
    }

  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (err) {
      console.error(err);
      alert(`Failed to create course!`);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.coursesService.saveCourse(courseId, changes);
      this.dialogRef.close(updatedCourse);
    } catch (err) {
      console.error(err);
      alert(`Failed to save course!`);
    }
  }

}

function createDefaultDialogConfig() {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = "400px";
  return config;
}

export function openEditCourseDialog(dialog: MatDialog, data: EditCourseDialogData) {
  const config = createDefaultDialogConfig();
  config.data = data;
  return dialog.open(EditCourseDialogComponent, config);
}
