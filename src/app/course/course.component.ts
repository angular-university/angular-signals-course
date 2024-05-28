import {Component, signal} from '@angular/core';
import {Course} from "../models/course.model";
import {Lesson} from "../models/lesson.model";

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {

  course = signal<Course | null>(null);

  lessons = signal<Lesson[]>([]);

}
