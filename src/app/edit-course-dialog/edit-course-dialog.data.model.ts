import {Course} from "../models/course.model";
import {Signal} from "@angular/core";


export type EditCourseDialogData = {
  title:string;
  course: Signal<Course | null>
}
