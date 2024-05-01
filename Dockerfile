FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]
