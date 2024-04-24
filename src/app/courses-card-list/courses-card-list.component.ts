import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";

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

  courses = input.required<Course[]>();

  dialog = inject(MatDialog);

  onEditCourse(course: Course) {
    openEditCourseDialog(
      this.dialog,
      {
        mode: "update",
        title: "Update Existing Course",
        course
      }
    );

  }

}
