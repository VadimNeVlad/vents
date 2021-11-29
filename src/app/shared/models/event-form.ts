import { Participant } from './participant';

export interface EventForm {
  uid: string;
  title: string;
  author: string;
  cancelEvent: boolean;
  category: string;
  city: string;
  description: string;
  content: string;
  venue: string;
  createAt: Date;
  eventDate: Date | string;
}
