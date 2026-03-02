FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the frontend using Vite
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built frontend from the build stage
COPY --from=build /app/dist ./dist

# Copy backend files
COPY --from=build /app/server ./server
COPY --from=build /app/package.json ./package.json

# Expose the API and Web port
EXPOSE 5000

# Start the server directly
CMD ["npm", "run", "server"]
