FROM jekyll/jekyll:3.8

COPY . .

RUN gem install bundler:2.3.9 && bundle install

CMD bundle exec jekyll serve -H 0.0.0.0 -t --livereload --force_polling
