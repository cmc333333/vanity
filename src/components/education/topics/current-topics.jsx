import { css } from 'glamor';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { columns, row, spacing, trailingComma } from '../../../styles';
import Button from './button';


export default function CurrentTopics({
  deactivate,
  topics,
}) {
  if (topics.length) {
    const deactivateList = topics.map((topic, idx) => (
      <Button
        css={css(
          idx <= topics.length - 2 ? trailingComma : {},
          idx === topics.length - 2 ? { '::after': { content: ', or ' } } : {},
        )}
        key={topic}
        onClick={() => deactivate(topic)}
      >
        { topic }
      </Button>
    ));
    return (
      <glamorous.Fieldset
        css={row}
        paddingLeft={spacing()}
        paddingRight={spacing()}
      >
        <glamorous.Legend
          border={0}
          css={columns({ small: 12, medium: 2, large: 1 })}
          fontWeight="bold"
        >
          Topics:
        </glamorous.Legend>
        <div css={columns({ small: 12, medium: 8, large: 9 })}>
          {' '}
          { deactivateList }
          {' '}
        </div>
        <glamorous.Div
          css={columns({ small: 12, medium: 2, large: 2 })}
          textAlign="right"
        >
          <Button onClick={() => deactivate(...topics)}>
            Remove All
          </Button>
        </glamorous.Div>
      </glamorous.Fieldset>
    );
  }
  return null;
}
CurrentTopics.propTypes = {
  deactivate: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
};
