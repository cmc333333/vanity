import * as _ from "lodash";
import * as moment from "moment";

export interface TopicEntry {
  date: moment.Moment;
  entryType: string;
  id: string;
  tags: Set<string>;
  title: string;
  url: string;
}

export const commonTags: (
  entries: TopicEntry[],
  threshold?: number
) => Set<string> = (entries, threshold = 0.01) => {
  const tagLists = entries.map((e) => Array.from(e.tags));
  const tagCounts = _.countBy(_.flatten(tagLists));
  const total = Object.values(tagCounts).reduce(
    (soFar, next) => soFar + next,
    0
  );
  return new Set(
    Object.keys(tagCounts).filter((tag) => tagCounts[tag] / total >= threshold)
  );
};

interface TagGraph {
  nodes: { id: string; label: string; value: number }[];
  edges: {
    arrows: string;
    from: string;
    smooth: boolean;
    to: string;
    value: number;
  }[];
}

export const tagGraph: (
  entries: TopicEntry[],
  threshold?: number
) => TagGraph = (entries, threshold = 0.01) => {
  const common = commonTags(entries, threshold);
  const tagLists: string[][] = entries.map((e) =>
    Array.from(e.tags).filter((t) => common.has(t))
  );
  const tagCounts: Record<string, number> = _.countBy(_.flatten(tagLists));
  const nodes: { id: string; label: string; value: number }[] = Object.entries(
    tagCounts
  ).map(([tag, count]) => ({
    id: tag,
    label: tag,
    value: count,
  }));

  const edgeCounts: Record<string, Record<string, number>> = tagLists.reduce(
    (soFar, nextTagSet) => {
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
    },
    {} as Record<string, Record<string, number>>
  );
  const mappedEdges = Object.entries(edgeCounts).map(([from, edges]) =>
    Object.entries(edges).map(([to, count]) => ({
      arrows: "",
      from,
      smooth: true,
      to,
      value: count,
    }))
  );

  return { nodes, edges: _.flatten(mappedEdges) };
};
