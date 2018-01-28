import { css } from 'glamor';
import React from 'react';

import resume from '../../assets/lubinski-resume.pdf';
import { columns, row } from '../../styles';

const docsUrl = 'https://docs.google.com/document/d/16djyBXmJ1mij0uM76wzmT_fkgnihqvBGocLnyPUngDY/edit';

export default function Links() {
  return (
    <div css={css(row, { marginBottom: '1rem' })}>
      <section css={columns({ small: 6 })}>
        <a href={resume}>PDF Version</a>
      </section>
      <section css={css(columns({ small: '6' }), { textAlign: 'right' })}>
        <a href={docsUrl}>Google Drive Version</a>
      </section>
    </div>
  );
}
