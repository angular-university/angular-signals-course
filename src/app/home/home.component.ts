import { Component, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  courses = signal<Course[]>([]);

  couserService = inject(CoursesService);

  constructor() {
    this.loadCourses()
      .then(() => console.log(`All courses loaded:`, this.courses()));
  }

  async loadCourses() {
    try {
      const courses = await this.couserService.loadAllCourses();
      this.courses.set(courses);
    } catch (err) {
      alert(`Error loading courses`);
      console.error(err);
    }
  }
}
