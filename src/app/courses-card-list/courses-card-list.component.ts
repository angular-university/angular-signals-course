import {Component, inject, input, output} from '@angular/core';
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

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, {
      mode: "update",
      title: "Update Existing Course",
      course
    })
      .afterClosed()
      .subscribe((course) => this.courseUpdated.emit(course));
  }

  deleteCourse(courseId: string) {
    this.courseDeleted.emit(courseId);
  }
}
