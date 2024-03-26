import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);

  coursesService = inject(CoursesService);

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  onCancel() {
    this.dialogRef.close();
  }

  async onSave(title: string, longDescription: string, category: string, iconUrl: string) {

    const courseProps = {
      title,
      longDescription,
      category,
      iconUrl
    };

    if (this.data?.mode == 'create') {
      await this.createCourse(courseProps);
    }
    else if (this.data?.mode == 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
    }

  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course);
      this.data.dialogOutput.set(newCourse);
      this.dialogRef.close();
    }
    catch (err) {
      console.error(err);
      alert(`Failed to create course!`);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const course = await this.coursesService.saveCourse(courseId, changes);
      this.data.dialogOutput.set(course);
      this.dialogRef.close();
    }
    catch (err) {
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
