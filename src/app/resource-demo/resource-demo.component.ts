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

  courseId = signal<string | null>(null);

  courses = resource<Course[], unknown>({
    loader: async () => {
      return await this.coursesService.loadAllCourses()
    }
  })

  /*
  course = resource({
    loader: async (params) => {
      const response = await fetch(`/api/courses/${params.request?.courseId}`);
      return await response.json();
    }
  })

  */

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
}
