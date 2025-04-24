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
  courses = signal<Course[]>([]);
  coursesService = inject(CoursesService);
  constructor(){
    afterNextRender(()=>{
      this.LoadCourses().then(()=>console.log(`all courses loaded`));
    });
  }
  ngOnInit(): void {

  }
  async LoadCourses() {
    try {
      const courses = await this.coursesService.LoadAllCourses();
      this.courses.set(courses);
      console.log(courses);
    } catch (err) {
      alert(`error loading courses`);
      console.log(err);

    }
  }
}
