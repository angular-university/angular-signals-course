import {Component, inject, input, output, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

}
