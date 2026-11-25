
# =========================
# Stage 1: Build React App
# =========================

FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# API URL được cung cấp khi build
ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

# Build React
RUN npm run build


# =========================
# Stage 2: Serve with Nginx
# =========================

FROM nginx

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
