import {LessonsService} from "../services/lessons.service";
import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";


export const courseLessonsResolver =
  async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const courseId = route.paramMap.get('courseId');
  if (!courseId) {
    return [];
  }
  const lessonsService = inject(LessonsService);
  return lessonsService.loadLessons({courseId})
}
