import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { count, firstValueFrom, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // http=inject(HttpClient)
  // env=environment
  // async LoadAllCourses(): Promise<Course[]> {
  //   const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
  //   const response = await firstValueFrom(courses$);
  //   return response.courses;
  // }
  http = inject(HttpClient)
  env =environment
  async LoadCourses():Promise<Course[]>{
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses
  }

  async createCourse(course:Partial<Course>):Promise<Course>{
    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`,course)
    return await firstValueFrom(course$)
  }
  async updateCourse(id:string , changes:Partial<Course>):Promise<Course>{
    const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${id}`,changes);
    return await firstValueFrom(course$)
  }
  async deleteCourse(id:string):Promise<void>{
    this.http.delete<Course>(`${this.env.apiRoot}/courses/${id}`);
    return;
  }
}
