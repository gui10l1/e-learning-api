import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Course from '@modules/course/infra/database/typeorm/entities/Course';

@Entity('lessons')
export default class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  video_id: string;

  @Column()
  course_id: string;

  @ManyToOne(() => Course, course => course.lessons)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
