require 'nanoc'
require 'nokogiri'
require 'open-uri'
require 'yaml'

class GRBook < Struct.new(:shelves, :book_id, :title, :author, :published,
                          :link, :desc, :desc_m, :desc_s, :img_m, :img_l,
                          :added)
end


def goodreads(reading)
  items.select {|i|
    i[:meta_filename] \
    and i[:meta_filename].start_with? "content/data"
  }.sort_by {|i|
    i[:added]
  }.reverse.select {|i|
    if reading then
      i[:shelves].any? {|s| s.include? "reading"}
    else
      i[:shelves].all? {|s| not s.include? "reading"}
    end
  }
end


# cut the text after char_count characters + the nearest <br>
def cut_after(text, char_count)
  idx = text.index('<br', char_count)
  if idx
    text[0, idx]
  else
    text
  end
end


def goodreads_rss
  site = Nanoc::Site.new('.')
  user_id = site.config[:goodreads_user_id]
  shelves = site.config[:goodreads_shelves]
  base_url = "http://www.goodreads.com/review/list_rss/#{user_id}?shelf="

  items = {}
  shelves.each do |shelf|
    open(base_url + shelf) do |rss|
      rss = Nokogiri::XML(rss)
      rss.xpath("//item").each do |item|
        f = lambda { |field| item.xpath("./" + field).first.content }
        key = f.call("book_id")
        if items.has_key? key
          items[key].shelves.push(shelf)
        else
          desc = f.call("book_description")
          img_m = f.call("book_medium_image_url")
          img_l = f.call("book_large_image_url")
          img_m = (img_m.include? "nocover") ? nil : img_m
          img_l = (img_l.include? "nocover") ? nil : img_l
          items[key] = GRBook.new(
            [shelf], key, f.call("title"), f.call("author_name"),
            f.call("book_published"), f.call("link"), desc,
            cut_after(desc, 1000), cut_after(desc, 500), img_m, img_l,
            DateTime.parse(f.call("pubDate")))
        end
      end
    end
  end

  dir = "content/data/goodreads"
  Dir.mkdir(dir) unless File.exists?(dir)
  items.each do |key, value|
    File.open(dir + "/" + key + ".yaml", 'w') do |file|
      as_yaml = value.to_yaml.sub("--- !ruby/struct:GRBook", "---")
      file.write(as_yaml)
    end
  end
end

if __FILE__ == $0
  goodreads_rss()
end
