import * as React from "react";

import Contact from "../components/resume/contact";
import Education from "../components/resume/education";
import Links from "../components/resume/links";
import Overview from "../components/resume/overview";
import Pride from "../components/resume/pride";
import { baseFontSize, baseSpace } from "../components/resume/utils";
import WorkHistory from "../components/resume/work-history";
import Layout, { cvSidebar } from "../layouts";

const Index: React.FC = () => {
  const resumeStyles = {
    fontSize: baseFontSize,
    "& li, & p": {
      marginBottom: baseSpace,
    },
  };
  return (
    <Layout sidebar={cvSidebar} title="Résumé">
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
};
export default Index;
