# --- build Vite ---
FROM node:22-alpine AS build
WORKDIR /app

# L'URL de l'API est figée dans le bundle au moment du build
ARG VITE_API_URL=http://localhost:8002
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

# --- serveur statique ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1