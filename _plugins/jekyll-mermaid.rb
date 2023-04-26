# From https://github.com/jasonbellamy/jekyll-mermaid but not pulling in as a gem because no longer
# maintained
module Jekyll
    class Mermaid < Liquid::Block
  
      def initialize(tag_name, markup, tokens)
        super
      end
  
      def render(context)
        "<div class=\"mermaid cg-diagrams\">#{super}</div>"
      end
    end
  end
  
  Liquid::Template.register_tag('mermaid_diagram', Jekyll::Mermaid)