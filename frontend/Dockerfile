FROM public.ecr.aws/docker/library/node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept the backend URL at build time and make it available for the React build
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

# Serve with 'serve' package, or you can use nginx for production
FROM public.ecr.aws/docker/library/node:18 AS runner

WORKDIR /app

# Copy only the production build from the previous stage
COPY --from=builder /app/build ./build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]
