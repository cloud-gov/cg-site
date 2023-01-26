module Jekyll
  module PaginateV2::Generator

    #
    # https://github.com/cloud-gov/pages-uswds-jekyll/pull/260 introduced a
    # patch that resolved an issue where paginated pages were using a single
    # cached layout file, causing the wrong content to be displayed.
    #
    # A fix has been made to the plugin, however it has not been released as a
    # new version yet. Once it is, this patch can be removed.
    #
    # Source issue: https://github.com/sverrirs/jekyll-paginate-v2/issues/209
    #

    ## Updated from PR https://github.com/sverrirs/jekyll-paginate-v2/blob/01d7bfbe9a88f28c05c144d52c0df5d75f65a32a/lib/jekyll-paginate-v2/generator/paginationPage.rb

    class PaginationPage < Page
      def initialize(page_to_copy, cur_page_nr, total_pages, index_pageandext)
        @site = page_to_copy.site
        @base = ''
        @url = ''
        @name = index_pageandext.nil? ? 'index.html' : index_pageandext
        @path = page_to_copy.path

        self.process(@name) # Creates the basename and ext member values

        # Only need to copy the data part of the page as it already contains the layout information
        self.data = Jekyll::Utils.deep_merge_hashes( page_to_copy.data, {} )
        if !page_to_copy.data['autopage']
          self.content = page_to_copy.content
        else
          # If the page is an auto page then migrate the necessary autopage info across into the
          # new pagination page (so that users can get the correct keys etc)
          if( page_to_copy.data['autopage'].has_key?('display_name') )
            self.data['autopages'] = Jekyll::Utils.deep_merge_hashes( page_to_copy.data['autopage'], {} )
          end
        end

        # Store the current page and total page numbers in the pagination_info construct
        self.data['pagination_info'] = {"curr_page" => cur_page_nr, 'total_pages' => total_pages }

        # Perform some validation that is also performed in Jekyll::Page
        validate_data! page_to_copy.path
        validate_permalink! page_to_copy.path

        # Trigger a page event
        #Jekyll::Hooks.trigger :pages, :post_init, self
      end

      def set_url(url_value)
        @path = url_value.delete_prefix '/'
        @dir  = File.dirname(@path)
        @url = url_value
      end
    end # class PaginationPage

  end # module PaginateV2
end # module Jekyll
