import _ from 'lodash';
import moment from 'moment';

export default class TopicEntry {
  constructor({
    date = '',
    entryType = '',
    id = '',
    tags,
    title = '',
    url = '',
  }) {
    this.date = moment(date);
    this.entryType = entryType;
    this.id = id;
    this.tags = new Set(tags || []);
    this.title = title;
    this.url = url;
  }
}

export function commonTags(entries, threshold = 0.01) {
  const tagLists = entries.map(e => Array.from(e.tags));
  const tagCounts = _.countBy(_.flatten(tagLists));
  const total = Object.values(tagCounts).reduce(
    (soFar, next) => soFar + next,
    0,
  );
  return new Set(Object.keys(tagCounts).filter(tag =>
    tagCounts[tag] / total >= threshold));
}

export function tagGraph(entries, threshold = 0.01) {
  const common = commonTags(entries, threshold);
  const tagLists = entries.map(e =>
    Array.from(e.tags).filter(t => common.has(t)));
  const tagCounts = _.countBy(_.flatten(tagLists));
  const nodes = Object.entries(tagCounts).map(([tag, count]) =>
    ({ id: tag, label: tag, value: count }));

  const edgeCounts = tagLists.reduce((soFar, nextTagSet) => {
    const updatedCounts = { ...soFar };
    nextTagSet.forEach((tag, idx) => {
      const remaining = nextTagSet.slice(idx + 1);
      const edgesForTag = soFar[tag] || {};

      remaining.forEach((otherTag) => {
        edgesForTag[otherTag] = (edgesForTag[otherTag] || 0) + 1;
      });
      updatedCounts[tag] = edgesForTag;
    });
    return updatedCounts;
  });
  const mappedEdges = Object.entries(edgeCounts).map(([from, edges]) =>
    Object.entries(edges).map(([to, count]) => ({
      arrows: '',
      from,
      smooth: true,
      to,
      value: count,
    })));

  return { nodes, edges: _.flatten(mappedEdges) };
}
