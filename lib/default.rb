# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

class Nanoc::Item
  def trimmed_filename(include_ext=false)
    filename = @attributes[:filename]
    if not filename.nil?
      filename = filename.split("/")[-1]
      if not include_ext
        filename = filename.split(".")[0]
      end
    end
    filename
  end

  def url
    filename = @attributes[:content_filename]
    if filename
      filename[7..-1].split(".")[0]
    else
      nil
    end
  end
end
