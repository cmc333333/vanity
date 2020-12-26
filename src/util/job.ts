import * as moment from "moment";

import PortfolioProject from "./portfolio-project";

export interface Event {
  date: moment.Moment;
  title: string;
}

interface Job {
  color: string;
  company: string;
  html: string;
  id: string;
  impact: string[];
  end?: moment.Moment;
  events: Event[];
  projects: PortfolioProject[];
  start: moment.Moment;
  shortTitle: string;
  title: string;
  url: string;
}
export default Job;
