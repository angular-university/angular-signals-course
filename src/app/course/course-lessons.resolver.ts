import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Course } from '../models/course.model';
import { inject } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';

export const courseLessonsResolver: ResolveFn<Lesson[]> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lessonsService = inject(LessonsService);
  const courseId = route.paramMap.get('courseId');

  if (!courseId) {
    return [];
  }

  return lessonsService.loadLessons({ courseId });
};
