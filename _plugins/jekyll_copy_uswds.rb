# module Jekyll
#   class JekyllCopyUswds < Generator
#     def generate(site)
#       source = "node_modules/uswds/dist"
#       Dir.glob(File.join(source, "{fonts,img}", "**", "*")) do |filename|
#         next if File.directory?(filename)
#         dir, name = File.split(filename.delete_prefix(source))
#         append_dir = File.join('uswds', dir)
#         site.static_files.push(Jekyll::StaticFile.new(site, source, append_dir, name))
#         end
#     end
#   end
# end