import {
	Component,
	computed,
	effect,
	ElementRef,
	inject,
	Injector,
	signal,
  viewChild,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
	toObservable,
	toSignal,
	outputToObservable,
	outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { LoadingService } from '../loading/loading.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'home',
	imports: [MatTabGroup, MatTab, CoursesCardListComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {

  beginnersList = viewChild('beginnersList', { read: ElementRef });
  button = viewChild.required<ElementRef<HTMLButtonElement>>('button');
  
	#courses = signal<Course[]>([]);

	beginnerCourses = computed(() => {
		const courses = this.#courses();
		return courses.filter((course) => course.category === 'BEGINNER');
	});

	advancedCourses = computed(() => {
		const courses = this.#courses();
		return courses.filter((course) => course.category === 'ADVANCED');
	});

	private readonly coursesService = inject(CoursesService);
	private readonly messagesService = inject(MessagesService);

	dialog = inject(MatDialog);

	constructor() {
		this.loadCourses();
	}

	async loadCourses() {
		try {
			const courses = await this.coursesService.loadAllCourses();
			this.#courses.set(courses.sort(sortCoursesBySeqNo));
		} catch (err) {
			this.messagesService.showMessage(
				`Error loading courses`,
				'error'
			)
		}
	}

	onCourseUpdated(updatedCourse: Course) {
		const courses = this.#courses();
		const newCourses = courses.map((course) =>
			course.id === updatedCourse.id ? updatedCourse : course
		);
		this.#courses.set(newCourses);
	}

	async onCourseDeleted(courseId: string) {
		try {
			await this.coursesService.deleteCourse(courseId);
			const courses = this.#courses();
			const newCourses = courses.filter((course) => course.id !== courseId);
			this.#courses.set(newCourses);
		} catch (error) {
			console.log(error);
			alert('Failed deleting the course.');
		}
	}

	async onAddCourse() {
		const newCourse = await openEditCourseDialog(this.dialog, {
			mode: 'create',
			title: 'Creating new course',
		});
    if (!newCourse) return;
		const newCourses = [...this.#courses(), newCourse];
		this.#courses.set(newCourses);
	}
}
