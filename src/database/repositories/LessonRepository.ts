import { EntityRepository, Repository } from 'typeorm'
import { Lesson } from '../entity/Lesson'

@EntityRepository(Lesson)
class LessonRepository extends Repository<Lesson> {}

export default LessonRepository
