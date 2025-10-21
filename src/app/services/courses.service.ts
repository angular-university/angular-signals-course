import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { firstValueFrom } from "rxjs";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  private readonly http = inject(HttpClient);

  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);

    const response = await firstValueFrom(courses$);

    return response.courses;
    
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return await firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes)
    return await firstValueFrom(course$);
  }

  async deleteCourse(courseId: string) {
    const course$ = this.http.delete(`${this.env.apiRoot}/courses/${courseId}`)
    return await firstValueFrom(course$)
  }

}
