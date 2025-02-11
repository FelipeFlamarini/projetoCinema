FROM oven/bun:1.2-debian

WORKDIR /app

COPY . .

RUN ["bun", "install"]

EXPOSE 3000

CMD ["bun", "run", "dev"]