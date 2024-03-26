import {Course} from "../models/course.model";
import {Signal, WritableSignal} from "@angular/core";


export type EditCourseDialogData = {
  mode: 'create' | 'update';
  title:string;
  course?: Course;
  courseChanged: WritableSignal<Course | null>
}
