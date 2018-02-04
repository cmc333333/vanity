import glamorous from 'glamorous';
import React from 'react';

import { scaleText } from '../../styles';
import { baseSpace, BorderedRow, LeftCol, RightCol } from './utils';

const email = 'cm.lubinski@gmail.com';
const website = 'http://cmlubinski.info';

const ContactRight = glamorous(RightCol)({
  marginBottom: baseSpace,
  marginTop: baseSpace,
});

export default function Contact() {
  return (
    <BorderedRow css={{ textAlign: 'center' }}>
      <LeftCol>
        <glamorous.H2
          css={scaleText(1)}
          marginBottom={baseSpace}
          marginTop={baseSpace}
        >
          C.M. Lubinski
        </glamorous.H2>
        <glamorous.H3
          css={scaleText(-1 / 4)}
          fontStyle="italic"
          fontWeight="normal"
        >
          Humble Hacker
        </glamorous.H3>
      </LeftCol>
      <ContactRight>
        <a href={`mailto:${email}`}>{ email }</a> • 872.333.9262
        <br />
        Pittsburgh, PA 15203
        <br />
        <a href={website}>{ website }</a> •{' '}
        <a href="https://github.com/cmc333333">GitHub</a>
      </ContactRight>
    </BorderedRow>
  );
}
