import { Schedule } from './state/schedule';

export interface State {
  lastUpdated: Date;
  schedules: Schedule[];
  searchWord: string;
}

export const state = (): State => ({
  lastUpdated: new Date(),
  schedules: [],
  searchWord: '',
});

export default state;

export const initialStateResolver = (data: any): State => {
  const defaultState = state();
  const schedules: Schedule[] = data.schedules.map((schedule: any) => {
   return {
     startDate: schedule.start_date ? new Date(schedule.start_date) : undefined,
     endDate: schedule.end_date ? new Date(schedule.end_date) : undefined,
     name: schedule.name ? schedule.name : '',
     theater: schedule.theater ? schedule.theater : '',
     station: schedule.station ? schedule.station : '',
     theaterSiteUrl: schedule.theater_site_url ? schedule.theater_site_url : undefined,
     runningTime: schedule.running_time ? schedule.running_time : undefined,
     recess: schedule.recess ? schedule.recess : undefined,
     ticketsOnTheDay: schedule.tickets_on_the_day ? schedule.tickets_on_the_day : undefined,
     ticketsOnTheDayInformationUrl: schedule.tickets_on_the_day_information_url ?
       schedule.tickets_on_the_day_information_url : undefined,
     officialSiteUrl: schedule.official_site_url ? schedule.official_site_url : undefined,
     actors: schedule.actors ? schedule.actors.map((actor: any) =>  ({
       name: actor.name,
     })) : [],
    };
  });

  return {
    lastUpdated: new Date(data.last_updated),
    schedules,
    searchWord: defaultState.searchWord,
  };
};
