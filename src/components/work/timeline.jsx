import glamorous from 'glamorous';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTimeline from 'react-visjs-timeline';

import { spacing } from '../../styles';
import Job from '../../util/job';

const timelineMin = moment('2005-08-01');
const partTimeBefore = moment('2008-06-01');

export default function Timeline({ jobs }) {
  const [partTime, fullTime] = _.partition(
    _.orderBy(jobs, ['start'], ['desc']),
    j => j.start.isBefore(partTimeBefore),
  );
  const nearFuture = moment().add(3, 'months');

  let end = nearFuture;
  const backgrounds = fullTime.map((job) => {
    const item = job.asTimelineItem(end);
    end = job.start;
    return item;
  });

  // Collect part time jobs into one span
  backgrounds.push(new Job({
    color: '#d81e05',
    company: 'Part-time Work',
    id: 'part-time',
    end: '2008-05-19',
    start: '2005-08-01',
  }).asTimelineItem(end));

  const options = {
    end: nearFuture,
    height: '350px',
    horizontalScroll: true,
    max: nearFuture,
    min: timelineMin,
    selectable: false,
    showCurrentTime: false,
    start: moment().subtract(4, 'years'),
    zoomable: false,
  };


  const items = backgrounds.concat(
    partTime.map(job => ({
      align: 'center',
      content: job.shortTitle || job.title,
      end: job.end,
      start: job.start,
    })),
    ...(jobs.map(j => j.events.map(e => e.asTimelineItem()))),
  );

  const colors = {
    '& .vis-item': { borderColor: '#1a1a1a' },
  };

  return (
    <glamorous.Div css={colors} marginBottom="1rem" position="relative">
      <ReactTimeline items={items} options={options} />
      <glamorous.P
        bottom={0}
        margin={0}
        padding={spacing(1 / 4)}
        position="absolute"
        textAlign="center"
        width="100%"
      >
        Drag left or right to see more.
      </glamorous.P>
    </glamorous.Div>
  );
}
Timeline.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.instanceOf(Job)).isRequired,
};