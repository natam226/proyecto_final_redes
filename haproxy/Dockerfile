FROM haproxy:latest
USER root

RUN mkdir -p /run/haproxy && \
    chown haproxy:haproxy /run/haproxy

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg

EXPOSE 80

