import {Request, Response} from 'express';
import {COURSES} from "./db-data";
import { Course } from '../src/app/models/course.model';



export function getAllCourses(req: Request, res: Response) {
  res.status(200).json({courses:Object.values(COURSES)});
}


export function getCourseById(req: Request, res: Response) {

    const courseId = req.params["id"];
    const courses:any = Object.values(COURSES);
    const course = courses.find((course: Course) => course.id == courseId);
    res.status(200).json(course);

}
