module Pod
  class TrunkSource < CDNSource
    # On-disk master repo name
    TRUNK_REPO_NAME = 'trunk'.freeze

    # Remote CDN repo _URLs
    TRUNK_REPO_URL = 'https://cdn.cocoapods.org/'.freeze

    def _URLs
      @_URLs ||= TRUNK_REPO_URL
      super
    end
  end
end
