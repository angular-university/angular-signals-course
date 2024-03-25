import { Component, computed, effect, inject, OnInit, Signal, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  coursesService = inject(CoursesService);

  #courses = signal<Course[]>([]);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category == "BEGINNER");
  })

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category == "ADVANCED");
  })

  constructor() {

    this.loadCourses().then(() => console.log(`Courses loaded.`));

    effect(() => {

      console.log(`Beginner courses: `, this.beginnerCourses())

      console.log(`Advanced courses: `, this.advancedCourses())

    })

  }

  async loadCourses() {

    const courses = await this.coursesService.loadAllCourses();

    this.#courses.set(courses.sort(sortCoursesBySeqNo));

  }


}
