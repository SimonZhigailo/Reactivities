import { IActivity, IAttendee } from "app/models/activity";
import { IUser } from "app/models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
  // const timeString = time.getHours() + ":" + time.getMinutes() + ":00";
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();

  // const dateString = `${year}-${month}-${day}`;

  const dateString = date.toISOString().split("T")[0];
  const timeString = time.toISOString().split("T")[1];

  return new Date(dateString + "T" + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  //если в atendees есть этот юзер
  activity.isGoing = activity.attendees.some(a => a.username === user.username);
  activity.isHost = activity.attendees.some(
    a => a.username === user.username && a.isHost
  );

  return activity;
};
//принимаем юзера возвращаем attendee
export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    username: user.username,
    image: user.image!
  };
};
