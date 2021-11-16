import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { ModuleRepository, LessonRepository } from '../database/repositories/'

let errors

class LessonController {
  async store(req: Request, res: Response) {
    const { name, description, lesson_url } = req.body
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const existLesson = await LessonRepository().findOne({ name })

    if (existLesson)
      return res
        .status(400)
        .json({ error: 'Já existe uma aula com este nome!' })

    const existModule = await ModuleRepository().findOne({ where: { id } })
    if (!existModule)
      return res.status(400).json({ error: 'O moduo não existe!' })

    const lesson = LessonRepository().create({
      name,
      description,
      lesson_url,
      module: existModule,
    })

    await LessonRepository().save(lesson)

    return res.status(201).json(lesson)
  }

  async index(req: Request, res: Response) {
    const lessons = await LessonRepository().find({ relations: ['module'] })

    res.json(lessons)
  }
}

export default new LessonController()
