import {Request, Response} from 'express';
import {LESSONS} from "./db-data";
import {setTimeout} from "timers";


export function searchLessons(req: Request, res: Response) {

  const query = req.query["query"] as string,
    courseId = req.query["courseId"] as string;

  const allLessons: any[] = Object.values(LESSONS);

  if (!query && !courseId) {
    res.status(200).json({lessons: []});
    return;
  }

  let filtered: any[] = allLessons;
  console.log(`Filtering total lessons ${filtered?.length}`, allLessons)

  if (courseId) {
    console.log(`Filtering by courseId ${parseInt(courseId)}`)
    filtered = filtered.filter(lesson => lesson.courseId == parseInt(courseId));
    console.log(`Filtered ${filtered?.length} results`)
  }

  if (query) {
    console.log(`Filtering by query ${query}`)
    filtered = allLessons.filter(
      lesson => lesson?.description?.trim()?.toLowerCase()?.search(query?.toLowerCase()) >= 0);
    console.log(`Filtered ${filtered?.length} results`)
  }

  const lessons = filtered.slice(0, 10);

  setTimeout(() => {
    res.status(200).json({lessons});
  }, 1000);

}
