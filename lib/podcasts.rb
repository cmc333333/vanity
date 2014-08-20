require 'kramdown'
require 'nanoc'
require 'nokogiri'
require 'open-uri'
require 'yaml'

def podcast_list
  items.select {|i| 
    i[:meta_filename] \
    and i[:meta_filename].start_with? "content/data/podcasts/"
  }.sort_by {|i| 
    i[:last_updated]
  }.reverse
end

def fetch_podcast_rss
  yaml = YAML.load(File.read('content/data/podcasts.yaml'))
  output_dir = "content/data/podcasts"
  Dir.mkdir(output_dir) unless File.exists?(output_dir)
  yaml["rss"].each{|rss|
    open(rss["url"]) {|rss_url|
      key = rss["id"]
      rss = Nokogiri::XML(rss_url)
      title = rss.xpath("//channel/title").first.content
      link = rss.xpath("//channel/link").first.content
      description = rss.xpath("//channel/description").first.content.strip
      latest = rss.xpath("//item/enclosure").first["url"]
      latest_date = rss.xpath("//item/pubDate").first.content
      latest_date = DateTime.rfc2822(latest_date)
      File.open(output_dir + "/" + key + ".yaml", "w") {|file|
        as_yaml = {"title" => title, "link" => link,
                   "description" => description, "latest" => latest,
                   "last_updated" => latest_date.strftime("%F")}
        file.write(as_yaml.to_yaml)
      }
    }
  }
end

if __FILE__ == $0
  fetch_podcast_rss()
end
