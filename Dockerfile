FROM oven/bun:1.0.21

ENV NODE_ENV production

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lockb,target=bun.lockb \
    bun i --frozen-lockfile

COPY . .

EXPOSE 3000

CMD bun dev
