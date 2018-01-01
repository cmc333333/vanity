import { css } from 'glamor';
import glamorous from 'glamorous';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { columns, row, space, trailingComma } from '../../../styles';
import { buttonStyle } from './styles';

const Row = glamorous.div(
  row,
  {
    borderBottom: '1px solid black',
    paddingBottom: space,
    paddingTop: space,
  },
);

export default function Entry({
  activate,
  entryType,
  end,
  inBrowser,
  tags,
  title,
  url,
}) {
  const tagList = Array.from(tags);
  tagList.sort();
  const tagLinks = tagList.map((tag, idx) => {
    if (inBrowser) {
      const props = {
        ...css(buttonStyle, idx < tagList.length - 1 ? trailingComma : {}),
        key: tag,
        onClick: () => activate(tag),
      };
      return <button {...props}><span>{ tag }</span></button>;
    }
    return tag;
  });
  return (
    <Row>
      <div css={columns(5)}>{ url ? <a href={url}>{ title }</a> : title }</div>
      <div css={columns(1)}>{ entryType }</div>
      <div css={columns(2)}>{ moment(end).format('MMM Do, YYYY') }</div>
      <div css={columns(4)}>{ tagLinks }</div>
    </Row>
  );
}
Entry.propTypes = {
  activate: PropTypes.func.isRequired,
  entryType: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  inBrowser: PropTypes.bool.isRequired,
  tags: PropTypes.instanceOf(Set),
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};
Entry.defaultProps = {
  tags: new Set(),
  url: '',
};

