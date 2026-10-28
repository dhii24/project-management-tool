
FROM node:22-alpine

# Update npm to the tested version
RUN npm install -g npm@11.21.1

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["npm", "start"]
