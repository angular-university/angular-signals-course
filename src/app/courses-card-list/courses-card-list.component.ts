import {Component, effect, inject, input, output, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'courses-card-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

  dialog = inject(MatDialog);

  courses = input.required<Course[]>();

  courseUpdated = output<Course>();

  courseDeleted = output<string>();

  dialogOutput = signal<Course | null>(null);

  constructor() {

    effect(() => {

      const course = this.dialogOutput();

      if (!course) {
        console.log(`Skipping effect because course is null.`);
        return;
      }

      console.log(`Effect called with course: `, course);

    });

    effect(async () => {
      const newCourse = this.dialogOutput();
      if (newCourse) {
        this.courseUpdated.emit(newCourse);
      }
    });

  }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, {
      mode: "update",
      title: "Update Existing Course",
      course,
      dialogOutput: this.dialogOutput
    });

  }

  deleteCourse(courseId: string) {
    this.courseDeleted.emit(courseId);
  }
}
