export interface IEvent {
  id: number;
  creatorId: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: string;
  time: string;
  category: {
    id: number;
    name: string;
  };
}
