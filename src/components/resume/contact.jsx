import styled from '@emotion/styled';
import React from 'react';

import { scaleText } from '../../styles';
import { baseSpace, BorderedRow, LeftCol, RightCol } from './utils';

const email = 'cm.lubinski@gmail.com';
const website = 'https://cmlubinski.info';

const ContactRight = styled(RightCol)({
  marginBottom: baseSpace,
  marginTop: baseSpace,
});

export default function Contact() {
  return (
    <BorderedRow css={{ textAlign: 'center' }}>
      <LeftCol>
        <h2
          css={{
            ...scaleText(1),
            marginBottom: baseSpace,
            marginTop: baseSpace,
          }}
        >
          C.M. Lubinski
        </h2>
        <h3
          css={{
            ...scaleText(-1 / 4),
            fontStyle: 'italic',
            fontWeight: 'normal',
          }}
        >
          Humble Hacker
        </h3>
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
