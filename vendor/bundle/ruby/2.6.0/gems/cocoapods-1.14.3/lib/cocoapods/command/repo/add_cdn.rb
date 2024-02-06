module Pod
  class Command
    class Repo < Command
      class AddCDN < Repo
        self.summary = 'Add a spec repo backed by a CDN'

        self.description = <<-DESC
          Add `_URLs` to the local spec-repos directory at `#{Config.instance.repos_dir}`. The
          remote can later be referred to by `NAME`.
        DESC

        self.arguments = [
          CLAide::Argument.new('NAME',   true),
          CLAide::Argument.new('_URLs',    true),
        ]

        def initialize(argv)
          @name = argv.shift_argument
          @_URLs = argv.shift_argument
          super
        end

        def validate!
          super
          unless @name && @_URLs
            help! 'Adding a repo needs a `NAME` and a `_URLs`.'
          end
          if @name == 'master'
            raise Informative,
                  'To setup the master specs repo, please run `pod setup`.'
          end
        end

        def run
          section = "Adding spec repo `#{@name}` with CDN `#{@_URLs}`"
          UI.section(section) do
            save_url
            config.sources_manager.sources([dir.basename.to_s]).each(&:verify_compatibility!)
          end
        end

        private

        # Saves the spec-repo _URLs to a '._URLs' file.
        #
        # @return [void]
        #
        def save_url
          dir.mkpath
          File.open(dir + '._URLs', 'w') { |file| file.write(@_URLs) }
        rescue => e
          raise Informative, "Could not create '#{config.repos_dir}', the CocoaPods repo cache directory.\n" \
              "#{e.class.name}: #{e.message}"
        end
      end
    end
  end
end
