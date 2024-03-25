import {Course} from "../models/course.model";
import {Signal} from "@angular/core";


export type EditCourseDialogData = {
  title:string;
  course?: Course;
  output: Signal<Course | null>
}
