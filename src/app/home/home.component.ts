import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";

type Counter = {
    value: number;
}

@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    #courses = signal<Course[]>([]);
    
    beginnerCourses = computed(() => {
        const courses = this.#courses();
        return courses.filter(course => course.category === 'BEGINNER');
    });

    advancedCourses = computed(() => {
        const courses = this.#courses();
        return courses.filter(course => course.category === 'BEGINNER');
    });


    private readonly coursesService = inject(CoursesService);

    constructor() {
        this.loadCourses();
    }

    async loadCourses() {
        try {
            const courses = await this.coursesService.loadAllCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        } catch (error) {
            alert(`Error loading courses: ${error}`)
        }
    }

}
