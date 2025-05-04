import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  courses =input.required<Course[]>({
    alias:"data"
  });
  courseUpdated = output<Course>();
    constructor(){
  }
dialog=inject(MatDialog)
  async onEdiCourse(course:Course) {
    console.log(course)
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
       mode:"update",
       title:"Update Existing Course",
       course
      }
    )
    if(!newCourse){
      return;
    }
    console.log('course edited: ',newCourse);
    this.courseUpdated.emit(newCourse)
  }

}
