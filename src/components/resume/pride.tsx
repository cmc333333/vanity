import * as React from "react";

import { ParagraphWithTitle, SectionHeader } from "./utils";

const Pride: React.FC = () => (
  <section>
    <SectionHeader>Other Points of Pride</SectionHeader>
    <ParagraphWithTitle title="Presentations & Articles">
      about security, technologies, clean code, CS theory, team morale, and more
    </ParagraphWithTitle>
    <ParagraphWithTitle title="Open Source">
      patches/plugins to upstream frameworks, community management, and personal
      projects
    </ParagraphWithTitle>
    <ParagraphWithTitle title="Recognition & Awards">
      for innovation, promoting best practices, helping colleagues, and customer
      service
    </ParagraphWithTitle>
    <ParagraphWithTitle title="Purpose">
      matters; I write software for legal aid agencies, charities, researchers,
      regulators and the public
    </ParagraphWithTitle>
  </section>
);
export default Pride;
