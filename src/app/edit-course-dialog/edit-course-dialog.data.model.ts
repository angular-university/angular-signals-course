import {Course} from "../models/course.model";
import {Signal} from "@angular/core";


export type EditCourseDialogData = {
  mode: 'create' | 'update';
  title:string;
  course?: Course;
  courseChanged: Signal<Course | null>
}
