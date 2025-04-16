export interface CursotodoSchema {
  title: string;
  unit:  Unit[];
}

export interface Unit {
  title:       string;
  description: string;
  lesson:      Lesson[];
}

export interface Lesson {
  id:              number;
  title:           string;
  lesson_progress: LessonProgress[];
}

export interface LessonProgress {
  completed: boolean;
}
