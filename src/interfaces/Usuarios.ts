export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  hearts: number;
  points: number;
  experience: number;
  level: number;
  user_type: "admin" | "student";
}
