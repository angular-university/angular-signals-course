import {inject, Injectable} from "@angular/core";
import {Lesson} from "../models/lesson.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "../models/get-lessons.response";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment;

  http = inject(HttpClient);

  async searchLessons(query: string): Promise<Lesson[]> {

    const params = new HttpParams().set('query', query);

    const lessons$ = this.http.get<GetLessonsResponse>(
      `${this.env.apiRoot}/search-lessons`, {
        params
      });

    const response = await firstValueFrom(lessons$);

    return response.lessons;
  }

  saveLesson(lessonId: string, changes: Partial<Lesson>): Promise<Lesson> {
    return firstValueFrom(this.http.put<Lesson>(
      `${this.env.apiRoot}/lessons/${lessonId}`, changes
    ));
  }

}
