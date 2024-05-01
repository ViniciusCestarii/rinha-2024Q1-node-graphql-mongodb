FROM oven/bun:1.0.21

ENV NODE_ENV production

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci

COPY . .

RUN npx tsc

ENTRYPOINT [ "npm", "run", "start" ]
