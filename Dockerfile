

# FROM node:22-alpine

# WORKDIR /usr/src/app

# COPY package.json yarn.lock ./
# RUN yarn install

# COPY . .



# EXPOSE 5173

# CMD [ "yarn", "dev", "--host" ]


ARG NODE_VERSION=22-alpine

# =========================
# Build Stage
# =========================
FROM node:${NODE_VERSION} AS build

ARG APP_HOME=/app
WORKDIR ${APP_HOME}

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Build-time environment variables


ENV VITE_APP_BASE_API_URL=https://jobzy-be.vm.kipchirchirlangat.com/api/v1

RUN yarn build


# =========================
# Serve Stage
# =========================
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Vite SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]