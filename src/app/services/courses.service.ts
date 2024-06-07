import { Injectable, inject } from "@angular/core";
import { Course } from "../models/course.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { GetCoursesResponse } from "../models/get-courses.response";
import { firstValueFrom } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient);

  env = environment

  async loadAllCourses(): Promise<Course[]> {
    const courses$ =
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

}
