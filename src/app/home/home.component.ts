import {Component, computed, effect, inject, Injector, Signal, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, Observable, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

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
    courses = signal<Course[]>([]);
    
    coursesService = inject(CoursesService);

    constructor(){
        this.loadCourses().then(()=>{
            console.log("All Courses", this.courses());  
        });
        
    }
    async loadCourses(){
        try{
            const courses = await this.coursesService.loadAllCourses();
            this.courses.set(courses);
        }
        catch(err){
            console.error("Error loading courses", err);
        }

    }
}
