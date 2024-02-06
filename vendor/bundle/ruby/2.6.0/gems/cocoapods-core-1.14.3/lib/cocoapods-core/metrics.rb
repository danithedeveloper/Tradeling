module Pod
  # Allows to access metrics about pods.
  #
  # This class is stored in Core because it might be used by web services.
  #
  module Metrics
    # Returns the metrics of a pod.
    #
    # @param  [String] name
    #         The name of the pod.
    #
    # @return [Hash] The metrics for the pod.
    #
    def self.pod(name)
      peform_request("http://metrics.cocoapods.org/api/v1/pods/#{name}")
    end

    private

    # @!group Private helpers
    #-------------------------------------------------------------------------#

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
      headers = { 'User-Agent' => "CocoaPods #{Pod::CORE_VERSION}" }
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
