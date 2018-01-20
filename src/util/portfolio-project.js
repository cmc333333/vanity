export default class PortfolioProject {
  constructor({
    job = '',
    source = '',
    summary = '',
    technology,
    title = '',
    url = '',
  }) {
    this.job = job;
    this.source = source;
    this.summary = summary;
    this.technology = technology || [];
    this.title = title;
    this.url = url;
  }
}
