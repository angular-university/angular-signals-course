import {Component, computed, effect, inject, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";
import {MessagesService} from "../messages/messages.service";

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

  messagesService = inject(MessagesService);

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

  constructor() {

    this.loadCourses().then(() => console.log(`Courses loaded.`));

    effect(() => {
      console.log(`Beginner courses: `, this.beginnerCourses())
      console.log(`Advanced courses: `, this.advancedCourses())
    });

  }

  async loadCourses() {

    try {

      const courses = await this.coursesService.loadAllCourses();

      this.#courses.set(courses.sort(sortCoursesBySeqNo));

    } catch (err) {
      this.messagesService.showMessage(`Error loading courses!`, 'error');
      console.error(err);
    }

  }

  onAddCourse() {

    openEditCourseDialog(this.dialog, {
      mode: "create",
      title: "Create New Course"
    })
      .afterClosed()
      .subscribe(() => this.loadCourses());

  }

  async onCourseDeleted(courseId: string) {

    try {

      await this.coursesService.deleteCourse(courseId);

      await this.loadCourses();
    } catch (err) {
      alert(`Error deleting course!`);
      console.error(err);
    }

  }

}
