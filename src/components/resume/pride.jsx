import React from 'react';

import { ParagraphWithTitle, SectionHeader } from './utils';


export default function Pride() {
  return (
    <section>
      <SectionHeader>Other Points of Pride</SectionHeader>
      <ParagraphWithTitle title="Presentations & Articles">
        about security, technologies, clean code, CS theory, team morale, and
        more
      </ParagraphWithTitle>
      <ParagraphWithTitle title="Open Source">
        patches/plugins to upstream frameworks, community management, and
        personal projects
      </ParagraphWithTitle>
      <ParagraphWithTitle title="Recognition & Awards">
        for innovation, promoting best practices, helping colleagues, and
        customer service
      </ParagraphWithTitle>
      <ParagraphWithTitle title="Purpose">
        matters; I write tools for pro bono attorneys, charities, regulators,
        the public, and other do-gooders
      </ParagraphWithTitle>
    </section>
  );
}
