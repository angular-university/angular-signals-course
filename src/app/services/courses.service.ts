import {inject, Injectable} from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";
import {SkipLoading} from "../loading/skip-loading.component";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient);

  env = environment;

  async loadAllCourses():Promise<Course[]> {
    const courses$ =
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async getCourseById(courseId:string): Promise<Course> {
    const course$ =
        this.http.get<Course>(
          `${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(course$)
  }

  async createCourse(course: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return firstValueFrom(course$);
  }

  async saveCourse(courseId:string,
                   changes: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`,
        changes)
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId:string) {
    const delete$ =
      this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }


}
