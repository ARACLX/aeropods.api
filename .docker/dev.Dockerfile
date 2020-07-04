# araclx/aeroapi:latest
#
# Production-ready RESTful API boilerplate based on TypeScript
# language and Express.js library (including GraphQL) with
# MongoDB as a database.
#
# VERSION         0.0.1
# VENDOR          Araclx Corporation
# MAINTAINER      Jakub Olan <jakub.olan001@gmail.com>

FROM node:alpine AS development

# Container Metadata
LABEL com.araclx.aeroapi.vendor = "Araclx Corporation"
LABEL com.araclx.aeroapi.maintainer = "Jakub Olan <jakub.olan001@gmail.com>"
LABEL com.araclx.aeroapi.name="aeroapi"
LABEL com.araclx.aeroapi.version = "0.0.1"
LABEL com.araclx.aeroapi.description = "API Server"

# Working Directory of container
WORKDIR /usr/src/aeroapi

# Healthchecking to monitor application status
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -v http://localhost:3600/ || exit 1

# Container User with root permissions
USER root

# Container DotENV Configuration
ENV NODE_ENV 'development'
ENV AEROAPI_PORT 3600

# Install Application Dependencies
COPY package.json .
RUN yarn install

# Copy source of application
COPY . .

# Post-Installation Process
RUN yarn prisma:generate

# Application Entrypoint
EXPOSE 3600/tcp
ENTRYPOINT ["yarn", "dev"]
