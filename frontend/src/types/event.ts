export type CampusEvent = {
  id: string;
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  goingPeople: string[];
  lookingPeople: string[];
  goingUserIds: number[];
  lookingUserIds: number[];
};
