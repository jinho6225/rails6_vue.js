FROM ruby:3.0-bullseye

ENV BUNDLE_VERSION 2.2.3

RUN apt-get update -qq && apt-get install -y postgresql-client
# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN gem install bundler --version ${BUNDLE_VERSION} \ 
&& bundle install

COPY . .

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

# EXPOSE 3000
# Start the main process.
# CMD ["rails", "server", "-b", "0.0.0.0"]