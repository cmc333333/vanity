import React from 'react';

import setPageTitle from '../util/set-page-title';
import Contact from '../components/resume/contact';
import Education from '../components/resume/education';
import Links from '../components/resume/links';
import Overview from '../components/resume/overview';
import Pride from '../components/resume/pride';
import { baseFontSize, baseSpace } from '../components/resume/utils';
import WorkHistory from '../components/resume/work-history';

export default function Index() {
  const resumeStyles = {
    fontSize: baseFontSize,
    '& li, & p': {
      marginBottom: baseSpace,
    },
  };
  return (
    <div css={resumeStyles}>
      { setPageTitle('Résumé') }
      <Links />
      <Contact />
      <Overview />
      <WorkHistory />
      <Education />
      <Pride />
    </div>
  );
}
