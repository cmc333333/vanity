import React from 'react';

import Contact from '../components/resume/contact';
import Education from '../components/resume/education';
import Links from '../components/resume/links';
import Overview from '../components/resume/overview';
import Pride from '../components/resume/pride';
import { baseFontSize, baseSpace } from '../components/resume/utils';
import WorkHistory from '../components/resume/work-history';
import Layout from '../layouts';

export default function Index() {
  const resumeStyles = {
    fontSize: baseFontSize,
    '& li, & p': {
      marginBottom: baseSpace,
    },
  };
  return (
    <Layout title="Résumé">
      <div css={resumeStyles}>
        <Links />
        <Contact />
        <Overview />
        <WorkHistory />
        <Education />
        <Pride />
      </div>
    </Layout>
  );
}
