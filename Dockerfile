FROM node:16

RUN apt update -y && apt upgrade -y
RUN apt install -y make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip
RUN wget https://github.com/git/git/archive/refs/heads/master.zip -O git.zip && \
    unzip git.zip && \
    cd git-master && \
    make prefix=/usr/local all && \
    make prefix=/usr/local install
