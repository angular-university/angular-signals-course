import {Component, computed, effect, inject, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";

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

  coursesService = inject(CoursesService);

  dialog = inject(MatDialog);

  #courses = signal<Course[]>([]);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category == "BEGINNER");
  })

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category == "ADVANCED");
  })

  addCourseDialogOutput = signal<Course | null>(null);

  constructor() {

    this.loadCourses().then(() => console.log(`Courses loaded.`));

    effect(() => {
      console.log(`Beginner courses: `, this.beginnerCourses())
      console.log(`Advanced courses: `, this.advancedCourses())
    });

    effect(async () => {
      const newCourse = this.addCourseDialogOutput();
      if (newCourse) {
        await this.loadCourses();
      }
    });

  }

  async loadCourses() {

    try {

      const courses = await this.coursesService.loadAllCourses();

      this.#courses.set(courses.sort(sortCoursesBySeqNo));

    }
    catch(err) {
      alert(`Error loading courses!`);
      console.error(err);
    }

  }

  async onAddCourse() {

    openEditCourseDialog(this.dialog, {
      mode: "create",
      title: "Create New Course",
      dialogOutput: this.addCourseDialogOutput
    });

  }

  async onCourseDeleted(courseId:string) {

    try {

      await this.coursesService.deleteCourse(courseId);

      await this.loadCourses();
    }
    catch(err) {
      alert(`Error deleting course!`);
      console.error(err);
    }

  }

}
