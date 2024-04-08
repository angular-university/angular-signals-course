import {afterNextRender, Component, computed, effect, EffectRef, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

 counter = signal(0);

 effectRef: EffectRef | null = null;

 constructor() {

   this.effectRef = effect((onCleanup) => {

     const counter = this.counter();

     const timeout = setTimeout(() => {
       console.log(
         `counter value: ${counter}`);
     }, 1000)

     onCleanup(() => {
       console.log(`Calling clean up`);
       clearTimeout(timeout);
     })

   })

 }

  increment() {

    this.counter.update(val => val + 1);

  }

  cleanup() {
    this.effectRef?.destroy();
  }

}
