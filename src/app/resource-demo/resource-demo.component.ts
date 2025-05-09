import {Component, effect, inject, resource, signal} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {environment} from "../../environments/environment";
import {Lesson} from "../models/lesson.model";


@Component({
  selector: 'resource-demo',
  templateUrl: './resource-demo.component.html',
  styleUrls: ['./resource-demo.component.scss'],
  imports: [MatProgressSpinner]
})
export class ResourceDemoComponent {

  env = environment;

  search = signal<string>('');

  lessons = signal<Lesson[]>([])

  constructor() {

    effect(() => {
      console.log('searching lessons:', this.search() );
    })
  }

  searchLessons(search: string) {
    this.search.set(search);
  }

  reset() {

  }

  reload() {

  }
}
