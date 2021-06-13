# How to set up

## Env File
1. create .env file
2. copy from .env.example and fill with your credential

## Migration
1. Export NODE_ENV to development : `export NODE_ENV=development`
2. create database : `npx sequelize-cli db:create`
3. run migration table : `npx sequelize-cli db:migrate`

## Run App
1. Hot Reload : `npm run dev`
2. Node : `npm start`
