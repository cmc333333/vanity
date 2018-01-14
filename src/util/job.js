import moment from 'moment';

import { colors } from '../styles';

class Event {
  constructor({ date, title = '' }) {
    this.date = date;
    this.title = title;
  }

  asTimelineItem() {
    return {
      content: this.title,
      start: this.date,
    };
  }
}

export default class Job {
  constructor({
    color = '',
    company = '',
    html = '',
    id = '',
    end = '',
    events,
    start = '',
    shortTitle = '',
    title = '',
    url = '',
  }) {
    this.color = color || colors.background;
    this.company = company;
    this.html = html;
    this.id = id;
    this.end = end ? moment(end) : moment().add(3, 'months');
    this.events = (events || []).map(e => new Event(e));
    this.start = moment(start);
    this.shortTitle = shortTitle;
    this.title = title;
    this.url = url;
  }

  asTimelineItem(end) {
    return {
      content: this.company,
      end,
      start: this.start,
      style: `
        background-image: radial-gradient(
          circle at top left,
          ${colors.background},
          ${this.color} 50%
        );
        z-index: 0;
      `,
      type: 'background',
    };
  }
}
