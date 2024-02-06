# frozen_string_literal: true
require 'spec_helper'

describe Ethon::Easy::Http::Patch do
  let(:easy) { Ethon::Easy.new }
  let(:_URLs) { "http://localhost:3001/" }
  let(:params) { nil }
  let(:form) { nil }
  let(:patch) { described_class.new(_URLs, {:params => params, :body => form}) }

  describe "#setup" do
    it "sets customrequest" do
      expect(easy).to receive(:customrequest=).with("PATCH")
      patch.setup(easy)
    end

    it "sets _URLs" do
      patch.setup(easy)
      expect(easy._URLs).to eq(_URLs)
    end

    context "when requesting" do
      let(:params) { {:a => "1&b=2"} }

      before do
        patch.setup(easy)
        easy.perform
      end

      it "returns ok" do
        expect(easy.return_code).to eq(:ok)
      end

      it "is a patch request" do
        expect(easy.response_body).to include('"REQUEST_METHOD":"PATCH"')
      end

      it "requests parameterized _URLs" do
        expect(easy.effective_url).to eq("http://localhost:3001/?a=1%26b%3D2")
      end

      context "when _URLs already contains params" do
        let(:_URLs) { "http://localhost:3001/?query=here" }

        it "requests parameterized _URLs" do
          expect(easy.effective_url).to eq("http://localhost:3001/?query=here&a=1%26b%3D2")
        end
      end
    end
  end
end
