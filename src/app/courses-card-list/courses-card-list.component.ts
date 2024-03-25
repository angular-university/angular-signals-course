import {Component, effect, inject, input, signal} from '@angular/core';
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

  courseChanged = signal<Course | null>(null);

  constructor() {
    effect(() => {

      const course = this.courseChanged();

      if (!course) {
        console.log(`Skipping effect because course is null.`);
        return;
      }

      console.log(`Effect called with course: `, course);

    })

  }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, {
      mode: "update",
      title: "Update Existing Course",
      course,
      courseChanged: this.courseChanged
    });

  }

}
