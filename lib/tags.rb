class Tag
  @@references = {}

  def self.lookup(id)
    name = id.to_s
    id_str = name.downcase.strip.gsub(/[^\w]/, '-').gsub(/-+/, '-')
    id_sym = id_str.to_sym
    unless @@references.has_key? id_sym
      @@references[id_sym] = Nanoc::Item.new("", {name: name}, "//tags/" + id_str)
    end
    @@references[id_sym]
  end

  def self.build_references(items)
    items.
      select {|i| i[:filename]}.
      select {|i| i[:filename].start_with? "content/data/tags/"}.
      each {|i| @@references[i.trimmed_filename.to_sym] = i }
    items.each do |i|
      if i[:tags]
        i.attributes = i.attributes.merge(tags: i[:tags].map{|t| Tag.lookup(t)})
      end
      i
    end
  end
end
