def writing_items
  @items.select{ |i|
    i.identifier.start_with?("/writings/") &&
    i.identifier.split("/").length == 3
  }.sort_by{ |i| i[:title] }
end

def misc_items
  @items.select{ |i|
    i.identifier.start_with?("/misc/") &&
    i.identifier.split("/").length == 3 &&
    i.identifier.split("/")[-1] != "calendar"
  }.sort_by{ |i| i[:title] }
end
