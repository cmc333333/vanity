import PropTypes from 'prop-types';
import React from 'react';

import JobModel from '../../util/job';
import typography from '../../util/typography';

export default function Job({
  job: {
    company,
    html,
    title,
    url,
  },
}) {
  /* eslint-disable react/no-danger */
  const body = <div dangerouslySetInnerHTML={{ __html: html }} />;
  /* eslint-enable react/no-danger */
  const companyEl = url ? <a href={url}>{ company }</a> : company;

  return (
    <div>
      <h2 css={typography.scale(1 / 3)}>
        { title } @ { companyEl }
      </h2>
      { body }
    </div>
  );
}
Job.propTypes = {
  job: PropTypes.instanceOf(JobModel).isRequired,
};
