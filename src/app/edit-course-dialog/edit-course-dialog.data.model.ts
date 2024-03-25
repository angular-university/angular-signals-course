import {Course} from "../models/course.model";
import {Signal} from "@angular/core";


export type EditCourseDialogData = {
  course: Signal<Course | null>
}
