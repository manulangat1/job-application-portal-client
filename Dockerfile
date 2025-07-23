# FROM node:22-alpine AS builder

# WORKDIR /usr/src/app 


# COPY package.json package*.json yarn.lock  ./ 

# RUN yarn install 


# COPY . .  


# ENV DISABLE_ESLINT_PLUGIN=true
# # RUN yarn build 



# # # Remove build dependencies to reduce layer size
# # RUN apk del .build-deps


# # FROM node:22-alpine 


# # WORKDIR /usr/src/app  


# # Create non-root user
# RUN addgroup -S appuser && adduser -S -G appuser appuser \
#     && chown -R appuser:appuser /usr/src/app


# # # Copy only production files from builder
# # COPY --from=builder --chown=appuser:appuser /usr/src/app/dist ./dist
# # COPY --from=builder --chown=appuser:appuser /usr/src/app/node_modules ./node_modules


# USER appuser


# EXPOSE 5173 

# CMD [ "yarn", "dev" ]


FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .



EXPOSE 5173

CMD [ "yarn", "dev", "--host" ]
# CMD [ "yarn", "build" ]