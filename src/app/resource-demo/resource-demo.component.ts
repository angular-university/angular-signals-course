import {Component, effect, inject, resource, signal} from "@angular/core";
import {CoursesService} from "../services/courses.service";
import {Course} from "../models/course.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'resource-demo',
  templateUrl: './resource-demo.component.html',
  styleUrls: ['./resource-demo.component.scss'],
  imports: [MatProgressSpinner]
})
export class ResourceDemoComponent {

  coursesService = inject(CoursesService);

  courseId = signal<string>('');

  courses = resource<Course[], unknown>({
    loader: async () => {
      return await this.coursesService.loadAllCourses()
    }
  })

  course = resource<Course, { courseId:string}>({
    request: () => ({
      courseId: this.courseId()
    }),
    loader: async ({request}) => {
      console.log("Loader request: ", request);
      return await this.coursesService.getCourseById(request.courseId);
    }
  })

  constructor() {
    effect(() => {
      console.log("Courses: ", this.courses.value());
      console.log("Loading:", this.courses.isLoading());
    })

  }


  reloadCourses() {
    this.courses.reload();
  }

  resetCourses() {
    this.courses.set([]);
  }

  onCourseIdSelected(courseId: string) {
    console.log("CourseId selected: ", courseId);
    this.courseId.set(courseId);
  }
}
