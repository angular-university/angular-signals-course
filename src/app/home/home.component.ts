import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, Observable, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  #courses = signal<Course[]>([]);
  coursesService = inject(CoursesService);

  beginnerCourses = computed(()=>{
    const courses = this.#courses();
    return courses.filter(course=>course.category ==="BEGINNER")
  })
  advancedCourses = computed(()=>{
    const courses = this.#courses();
    return courses.filter(course=>course.category ==="ADVANCED")
  })

  constructor(){
    this.LoadCourses().then(()=>console.log(`all courses loaded`,this.#courses()));

    effect(()=>{
      console.log(`Beginner courses: `,this.beginnerCourses() )
      console.log(`Advanced courses: `,this.advancedCourses() )
    })
  }
  ngOnInit(): void {

  }
  async LoadCourses() {
    try {
      const courses = await this.coursesService.LoadCourses();
      this.#courses.set(courses);
    } catch (err) {
      alert(`error loading courses`);
      console.log(err);
    }
  }
}
