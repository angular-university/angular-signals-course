import {Component, effect, ElementRef, inject, input, output, viewChildren} from '@angular/core';
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

    courseCards = viewChildren<ElementRef<HTMLDivElement>>('courseCards');
    
    courses = input.required<Course[]>();
    $courseUpdated = output<Course>();
    $courseDeleted = output<string>();

    private readonly dialog = inject(MatDialog);

    constructor() {
      effect(() => {
        console.log('Course cards => ',this.courseCards());        
      })
    }

    async onEditCourse(course: Course) {
        const newCourse = await openEditCourseDialog(this.dialog, {
            mode: 'update',
            title: 'Updating existing course',
            course
        })
        if (!newCourse) return;
        this.$courseUpdated.emit(newCourse);
    }

    onCourseDeleted(course: Course) {
        this.$courseDeleted.emit(course.id);
    }
}
