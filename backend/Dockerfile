# 1. Chọn môi trường Node.js
FROM node:24-alpine

# 2. Thiết lập thư mục làm việc
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Cài đặt dependencies
RUN npm ci --omit=dev

# 5. Copy source code
COPY src ./src

# 6. Thiết lập môi trường Production
ENV NODE_ENV=production

# 7. Khai báo port ứng dụng
EXPOSE 5000

# 8. Lệnh khởi chạy ứng dụng
CMD ["node", "src/server.js"]