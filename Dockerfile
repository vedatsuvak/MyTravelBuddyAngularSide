#Stage 1 build app
FROM node:21.4.0 as build
#working directory
WORKDIR /app
#copy the package.json
COPY package*.json package-lock.json ./
#angular install
#RUN npm install -g @angular/cli
RUN npm install
#copy the code into the container
COPY . .
RUN npm run build --prod
#Serve app on server
FROM nginx:alpine
#copy the build file
COPY --from=build /app/dist/my-cab-buddy /usr/share/nginx/html
#expose the port
EXPOSE 80
#start command
CMD ["nginx","-g","daemon off;"]
