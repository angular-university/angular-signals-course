import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ResourceDemoComponent} from "./resource-demo/resource-demo.component";
import {LinkedSignalDemoComponent} from "./linked-signal/linked-signal-demo.component";
import { authGuard } from './guards/auth.guard';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './course/course.resolver';
import { courseLessonsResolver } from './course/course-lessons.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: "courses/:courseId",
    component: CourseComponent,
    canActivate: [authGuard],
    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver
    }    
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path:"shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
