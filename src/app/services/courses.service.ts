import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  http=inject(HttpClient)
  env=environment
  async LoadAllCourses(): Promise<Course[]> {
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }
}
