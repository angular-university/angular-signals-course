import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";

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

  editCourse(course: Course) {

  }
}
