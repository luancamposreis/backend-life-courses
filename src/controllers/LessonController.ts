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

    const lesson = LessonRepository().create({
      name,
      description,
      lesson_url,
    })

    await LessonRepository().save(lesson)

    return res.status(201).json(lesson)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params
    const lessons = await LessonRepository().findOne({ id })

    res.json(lessons)
  }

  async index(req: Request, res: Response) {
    const lessons = await LessonRepository().find()

    res.json(lessons)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, lesson_url } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const lessonExist = await LessonRepository().findOne({ id })
    if (!lessonExist) return res.status(400).json({ error: 'Aula não existe!' })

    const lesson = await LessonRepository().update(id, {
      name,
      description,
      lesson_url,
    })

    if (lesson.affected) {
      return res.json({ message: 'Aula atualizado com sucesso!' })
    } else {
      return res.status(304).json({ error: 'Erro ao atualizar a aula!' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const lessonExist = LessonRepository().findOne({ id })
    if (!lessonExist) return res.status(400).json({ error: 'Aula não existe' })

    const lesson = await LessonRepository().delete(id)

    if (!lesson.affected) {
      res.status(304).json({ error: 'Erro ao deletar o aula!' })
    } else {
      res.status(200).json({ error: 'Aula deletado com sucesso' })
    }
  }
}

export default new LessonController()
