import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';

import { space, trailingComma } from '../../../styles';
import { buttonStyle } from './styles';

const deactivateHeight = { lineHeight: '2.5rem' };

const deactivateStyle = css(buttonStyle, deactivateHeight);
const clearStyle = css(deactivateStyle, { paddingLeft: space });
const legendStyle = css(
  deactivateHeight,
  {
    border: 0,
    float: 'left',
    fontSize: '1em',
    fontWeight: 'bold',
    paddingRight: space,
    width: 'auto',
  },
);

export default function CurrentTopics({
  deactivate,
  topics,
}) {
  if (topics.length) {
    const deactivateList = topics.map((topic, idx) => {
      const style = css(
        deactivateStyle,
        idx <= topics.length - 2 ? trailingComma : {},
        idx === topics.length - 2 ? { '::after': { content: ', or ' } } : {},
      );
      const props = {
        css: style,
        key: topic,
        onClick: () => deactivate(topic),
      };
      return <button {...props}><span>{ topic }</span></button>;
    });
    return (
      <fieldset>
        <legend css={legendStyle}>Topics:</legend>
        {' '}
        { deactivateList }
        {' '}
        <button onClick={() => deactivate(...topics)} css={clearStyle}>
          <span>Clear</span>
        </button>
      </fieldset>
    );
  }
  return null;
}
CurrentTopics.propTypes = {
  deactivate: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
};
