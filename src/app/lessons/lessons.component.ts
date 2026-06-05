import {Component, ElementRef, inject, signal, viewChild, ChangeDetectionStrategy} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {




}
