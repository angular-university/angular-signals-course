import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env = environment;

  constructor(private http: HttpClient) {

  }


  async loadAllCoursesAlt() {

    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);

    const response = await firstValueFrom(courses$);

    return response.courses;

  }

  async loadAllCourses(): Promise<Course[]> {

    const response = await fetch(`${environment.apiRoot}/courses`);

    const payload = await response.json();

    return payload.courses;

  }


}
