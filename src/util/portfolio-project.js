export default class PortfolioProject {
  constructor({
    html = '',
    job = '',
    source = '',
    summary = '',
    technology,
    title = '',
    url = '',
  }) {
    this.html = html;
    this.job = job;
    this.source = source;
    this.summary = summary;
    this.technology = technology || [];
    this.title = title;
    this.url = url;
  }
}
