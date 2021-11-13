import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getCustomRepository } from 'typeorm'

import LessonRepository from '../database/repositories/LessonRepository'
import ModuleRepository from '../database/repositories/ModuleRepository'

let errors

class LessonController {
  async store(req: Request, res: Response) {
    const lessonRepository = getCustomRepository(LessonRepository)
    const moduleRepository = getCustomRepository(ModuleRepository)

    const { name, description, lesson_url } = req.body
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const existLesson = await lessonRepository.findOne({ name })

    if (existLesson)
      return res
        .status(400)
        .json({ error: 'Já existe uma aula com este nome!' })

    const existModule = await moduleRepository.findOne({ where: { id } })
    if (!existModule)
      return res.status(400).json({ error: 'O moduo não existe!' })

    const lesson = lessonRepository.create({
      name,
      description,
      lesson_url,
      module: existModule,
    })

    await lessonRepository.save(lesson)

    return res.status(201).json(lesson)
  }

  async index(req: Request, res: Response) {
    const lessonRepository = getCustomRepository(LessonRepository)

    const lessons = await lessonRepository.find({ relations: ['module'] })

    res.json(lessons)
  }
}

export default new LessonController()
