# Build stage
FROM node:18 as build-stage

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Vue app for production
RUN npm run build

# Production stage - Serve with NGINX
FROM nginx:1.23 as production-stage

# Copy built files from Node stage to NGINX web root
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]