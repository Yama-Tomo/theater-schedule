export interface Actor {
  name: string;
}

export interface Schedule {
  startDate: Date | undefined;
  endDate: Date | undefined;
  name: string;
  theater: string;
  station: string;
  theaterSiteUrl: string | undefined;
  runningTime: string | undefined;
  recess: string | undefined;
  ticketsOnTheDay: string | undefined;
  ticketsOnTheDayInformationUrl: string | undefined;
  officialSiteUrl: string | undefined;
  actors: Actor[];
}
