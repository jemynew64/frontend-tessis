export interface CursotodoSchema {
  title: string;
  unit:  Unit[];
}

export interface Unit {
  title:       string;
  description: string;
  color?:       string;
  lesson:      Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  completed: boolean;
  unlocked: boolean;
}
