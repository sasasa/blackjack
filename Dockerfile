FROM node:12.13.1-alpine3.9

WORKDIR /app

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH
# apk add openjdk8 && \ ここが上手くいかない


# ホットリロード
ENV CHOKIDAR_USEPOLLING=true
RUN yarn global add @vue/cli

EXPOSE 8080

CMD ["/bin/sh"]