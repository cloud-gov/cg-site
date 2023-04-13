module RunNodeAfter
    def self.process(site, payload)
      return if @processed
      system "npm run sri" 
      @processed = true
    end
  end
  
  Jekyll::Hooks.register :site, :post_write do |site, payload|
    RunNodeAfter.process(site, payload)
  end