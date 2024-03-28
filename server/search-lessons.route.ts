
import {Request, Response} from 'express';
import {LESSONS} from "./db-data";
import {setTimeout} from "timers";



export function searchLessons(req: Request, res: Response) {

  const query = req.query["query"] as string;

  const allLessons: any[] = Object.values(LESSONS);

  console.log(allLessons)

  const filtered = allLessons.filter(
    lesson => lesson?.description?.trim()?.toLowerCase()?.search(query?.toLowerCase()) >= 0);

  const lessons = filtered.slice(0, 10);

  setTimeout(() => {
    res.status(200).json({lessons});
  },1000);

}
