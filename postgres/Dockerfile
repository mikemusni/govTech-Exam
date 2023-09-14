FROM postgres:latest
ENV POSTGRES_GOVAA govaa
ENV POSTGRES_GOV_SURVEY survey
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD root
COPY init-db.sh /docker-entrypoint-initdb.d/
EXPOSE 5432