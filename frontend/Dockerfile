FROM public.ecr.aws/docker/library/node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept backend URL at build time and make it available for React build
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# This ensures CRA picks up the variable at build time
RUN echo "REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL" >> .env

RUN npm run build

FROM public.ecr.aws/docker/library/node:18 AS runner

WORKDIR /app

COPY --from=builder /app/build ./build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]
