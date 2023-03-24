export interface QuestionI {
  title: string;
  type: string;
  options: [string];
  answer: string | null;
  created: Date;
}
