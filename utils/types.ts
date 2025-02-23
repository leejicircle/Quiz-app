export interface IQuestion {
  id: number;
  text: string;
  options: IOption[];
  answer: number;
  img: boolean;
  type: QuestionTypes;
}

export enum QuestionTypes {
  CHECK_BOX,
  RADIO_BOX
}

interface IOption {
  id: number;
  text: string;
}

export interface IState {
  id: number;
  title: string;
  questions: IQuestion[];
}