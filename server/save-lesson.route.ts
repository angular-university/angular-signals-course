import {Request, Response} from 'express';
import {COURSES, LESSONS} from "./db-data";
import {setTimeout} from 'timers';


export function saveLesson(req: Request, res: Response) {

  const id = req.params["id"],
    changes = req.body;

  console.log("Saving lesson changes", id, JSON.stringify(changes));

  const newLesson = {
    ...(LESSONS[id]),
    ...changes
  };

  LESSONS[id] = newLesson;

  console.log("new lesson version", newLesson);

  setTimeout(() => {

    res.status(200).json(LESSONS[id]);

  }, 1500);



}
