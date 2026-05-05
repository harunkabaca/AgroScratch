# Node.js alpine imajını baz alıyoruz (hafif olması için)
FROM node:20-alpine

# Çalışma dizinini ayarlıyoruz
WORKDIR /app

# Bağımlılıkları kopyalıyoruz
COPY package*.json ./

# Bağımlılıkları kuruyoruz
RUN npm install

# Tüm proje dosyalarını kopyalıyoruz
COPY . .

# Vite'in kullandığı portu dışarıya açıyoruz
EXPOSE 3000

# Uygulamayı başlatıyoruz
CMD ["npm", "run", "dev"]
