FROM ruby:2.4.2

EXPOSE 80
ENV LANG C.UTF-8

COPY ["nginx.conf", "/etc/nginx/sites-enables/default"]

RUN apt-get update \
    && apt-get -y install nginx \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

COPY ["Gemfile", "Gemfile.lock", "/app/"]
RUN bundle install

COPY ["config.yaml", "Rakefile", "Rules", "/app/"]
COPY ["content", "/app/content/"]
COPY ["layouts", "/app/layouts/"]
COPY ["lib", "/app/lib/"]

RUN mkdir /app/static/ \
    && git clone https://github.com/cmc333333/coursera-webgl.git /app/static/coursera-webgl --depth 1
RUN rake

RUN cp -r output/* /var/www/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
