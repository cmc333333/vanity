include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering
require 'json'
require 'set'

def add_certs
  certs = items.select {|i|
    i[:filename] \
    and i[:filename].start_with? "content/assets/files/certificates"
  }.map{|i|
    [i.trimmed_filename, i]
  }
  certs = Hash[certs]

  items.select {|i|
    not i.binary? \
    and i[:filename] \
    and i[:filename].start_with? "content/data/courses" \
    and certs.include? i.trimmed_filename
  }.each {|i|
    i[:cert] = certs[i.trimmed_filename]
  }
end

def course_markdown
  language = Tag.lookup("language")
  library = Tag.lookup("library")
  tool = Tag.lookup("tool")

  items.select {|i|
    not i.binary? \
    and i[:filename] \
    and i[:filename].start_with? "content/data/courses"
  }.map {|i|
    if i[:tags]
      langs = i[:tags].
        select{|t| t.attributes.fetch(:tags, []).include? language}.
        map{|t| t[:name]}
      libs = i[:tags].
        select{|t| t.attributes.fetch(:tags, []).include? library}.
        map{|t| t[:name]}
      tools = i[:tags].
        select{|t| t.attributes.fetch(:tags, []).include? tool}.
        map{|t| t[:name]}
      cats = i[:tags].
        reject{|t| (t.attributes.fetch(:tags, []) & [language, library, tool]).any?}.
        map{|t| t[:name]}

      if langs.any?
        i.attributes = i.attributes.merge(languages: langs)
      end
      if libs.any?
        i.attributes = i.attributes.merge(libraries: libs)
      end
      if tools.any?
        i.attributes = i.attributes.merge(tools: tools)
      end
      if cats.any?
        i.attributes = i.attributes.merge(categories: cats)
      end
    end
    i
  }.group_by {|i| 
    i[:start].year
  }.to_a.sort_by{|year, courses|
    year
  }.reverse.each_with_index.map{|pair, index|
    year, courses = pair
    courses = courses.sort_by{|i|
      i[:start]
    }.reverse
    universities = Set.new()
    courses.each{|course|
      universities.add(course[:university])
    }
    {:first => index == 0, :year => year, 
     :universities => universities.to_a.sort, :courses => courses}
  }
end
