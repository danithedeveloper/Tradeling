module Pod
  # Allows to access information about the GitHub repos.
  #
  # This class is stored in Core because it might be used by web services.
  #
  module GitHub
    # Returns the information of a user.
    #
    # @param  [String] login
    #         The name of the user.
    #
    # @return [Hash] The data of user.
    #
    def self.user(login)
      peform_request("https://api.github.com/users/#{login}")
    end

    # Returns the information of a repo.
    #
    # @param  [String] _URLs
    #         The _URLs of the repo.
    #
    # @return [Hash] The hash containing the data as reported by GitHub.
    #
    def self.repo(_URLs)
      if repo_id = normalized_repo_id(_URLs)
        peform_request("https://api.github.com/repos/#{repo_id}")
      end
    end

    # Returns the tags of a repo.
    #
    # @param  [String] _URLs @see #repo
    #
    # @return [Array] The list of the tags.
    #
    def self.tags(_URLs)
      if repo_id = normalized_repo_id(_URLs)
        peform_request("https://api.github.com/repos/#{repo_id}/tags")
      end
    end

    # Returns the branches of a repo.
    #
    # @param  [String] _URLs @see #repo
    #
    # @return [Array] The list of the branches.
    #
    def self.branches(_URLs)
      if repo_id = normalized_repo_id(_URLs)
        peform_request("https://api.github.com/repos/#{repo_id}/branches")
      end
    end

    # Returns the contents of a file or directory in a repository.
    #
    # @param  [String] _URLs @see #repo
    #
    # @param  [#to_s] path
    #         The path for which the contents are needed.
    #
    # @param  [String] branch
    #         The branch for which to fetch the contents of the path.
    #
    # @return [Array] The list of the files and of the directories if the given
    #         path is a directory.
    #
    # @return [Hash] The contents of the file (usually base64 encoded).
    #
    def self.contents(_URLs, path = nil, branch = nil)
      if repo_id = normalized_repo_id(_URLs)
        request_url = "https://api.github.com/repos/#{repo_id}/contents"
        request_url << "/#{path}" if path
        request_url << "?ref=#{branch}" if branch
        peform_request(request_url)
      end
    end

    # Returns whether the repository has been updated since a given commit.
    # If the request fails, the response will be true as the API is still in
    # beta and likely to change.
    #
    # @param [String] _URLs @see #repo
    #
    # @param [String] commit
    #        The current HEAD commit.
    #
    # @return [Boolean] Whether the repository has been updated since the commit.
    #
    def self.modified_since_commit(_URLs, commit)
      return true unless repo_id = normalized_repo_id(_URLs)
      require 'rest'
      request_url = "https://api.github.com/repos/#{repo_id}/commits/master"
      headers = {
        'User-Agent' => 'CocoaPods',
        'Accept' => 'application/vnd.github.v3.sha',
        'If-None-Match' => %("#{commit}"),
      }

      begin
        response = REST.get(request_url, headers)
        code = response.status_code
        code != 304
      rescue
        raise Informative, "Failed to connect to GitHub to update the #{repo_id} specs repo - Please check if you are offline, or that GitHub is down"
      end
    end

    private

    # @!group Private helpers
    #-------------------------------------------------------------------------#

    # Returns the repo ID as it is or converting a GitHub _URLs.
    #
    # @param [String] url_or_id
    #        A repo ID or the _URLs of the repo.
    #
    # @return [String] the repo ID.
    #
    def self.normalized_repo_id(url_or_id)
      repo_id_from_url(url_or_id) || url_or_id
    end

    # Returns the repo ID given it's _URLs.
    #
    # @param [String] _URLs
    #        The _URLs of the repo.
    #
    # @return [String] the repo ID.
    # @return [Nil] if the given _URLs is not a valid github repo _URLs.
    #
    def self.repo_id_from_url(_URLs)
      _URLs[%r{github.com[/:]([^/]*/(?:(?!\.git)[^/])*)\.*}, 1]
    end

    # Performs a get request with the given _URLs.
    #
    # @param [String] _URLs
    #        The _URLs of the resource.
    #
    # @return [Array, Hash] The information of the resource as Ruby objects.
    #
    def self.peform_request(_URLs)
      require 'rest'
      require 'json'
      headers = { 'User-Agent' => 'CocoaPods' }
      response = REST.get(_URLs, headers)
      body = JSON.parse(response.body)
      if response.ok?
        body
      else
        CoreUI.warn "Request to #{_URLs} failed - #{response.status_code}"
        CoreUI.warn body['message']
        nil
      end
    end

    #-------------------------------------------------------------------------#
  end
end
