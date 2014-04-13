require 'digest/sha1'
require 'json'
require 'nanoc'
require 'open-uri'
require 'yaml'


class GEvent < Struct.new(:id, :title, :start, :end, :where)
end

def fetch_gcal
  site = Nanoc::Site.new('.')
  cal_id = site.config[:gcal_id]
  base_url = "http://www.google.com/calendar/feeds/#{cal_id}/public/full"
  base_url += "?alt=json"
  dir = "content/data/gcal"
  Dir.mkdir(dir) unless File.exists?(dir)

  open(base_url) do |json|
    parsed = JSON.parse(json.read)
    parsed["feed"]["entry"].each do |entry|
      event = GEvent.new(
        Digest::SHA1.hexdigest(entry["id"]["$t"]),
        entry["title"]["$t"],
        DateTime.parse(entry["gd$when"][0]["startTime"]),
        DateTime.parse(entry["gd$when"][0]["endTime"]),
        entry["gd$where"][0]["valueString"].sub(", United States", ""))
      File.open(dir + "/" + event.id + ".md", 'w') do |file|
        as_yaml = event.to_yaml.sub("--- !ruby/struct:GEvent", "---")
        file.write(as_yaml)
        file.write("---\n")
        file.write(entry["content"]["$t"])
      end
    end
  end
end

def gcal_events
  items.select {|i|
    i[:filename] \
    and i[:filename].start_with? "content/data/gcal"
  }.sort_by{|i| i[:start]}.reverse
end

if __FILE__ == $0
  fetch_gcal()
end
