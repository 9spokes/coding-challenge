init:
	gem install bundler
	bundle install

test:
	rspec spec

run:
	ruby ./src/challenge.rb ./data.json
