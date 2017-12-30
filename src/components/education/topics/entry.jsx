import { css } from 'glamor';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { space, trailingComma } from '../../../styles';
import { buttonStyle } from './styles';

const rowStyle = {
  borderBottom: '1px solid black',
  paddingBottom: space,
  paddingTop: space,
};

export default function Entry({
  activate,
  entryType,
  end,
  inBrowser,
  tags,
  title,
  url,
}) {
  const col1 = url ? <a href={url}>{ title }</a> : title;
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
    <div className="row-fluid" css={rowStyle}>
      <div className="span5">{ col1 }</div>
      <div className="span1">{ entryType }</div>
      <div className="span2">{ moment(end).format('MMM Do, YYYY') }</div>
      <div className="span4">{ tagLinks }</div>
    </div>
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

