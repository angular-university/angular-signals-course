import {Component, inject, input, signal} from '@angular/core';
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

  editCourse(course: Course) {

    const courseUpdated = signal<Course>(course);

    openEditCourseDialog(this.dialog, {
      title: "Update Existing Course",
      course: courseUpdated
    }).afterClosed();



  }

}
