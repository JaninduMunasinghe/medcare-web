# Use lightweight Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Use lightweight runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app ./

# Expose the port
EXPOSE 3000

# Run Prisma migrations (for MongoDB Atlas, use `prisma db push`)
CMD ["sh", "-c", "npx prisma db push && npm run start"]
