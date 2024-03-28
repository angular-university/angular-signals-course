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

  async loadAllCourses() {

    console.log(`Calling API to load all courses...`);

    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`, {
      //context:  new HttpContext().set(SkipLoading, true),
    });

    const response = await firstValueFrom(courses$);

    return response.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {

    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`, course);

    return await firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {

    const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);

    return await firstValueFrom(course$);
  }

  async deleteCourse(courseId: string): Promise<void> {

    const delete$ = this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);

    await firstValueFrom(delete$);
  }

}
