#node
FROM node:14 as build
#working directory
WORKDIR /app
#copy the package.json
COPY package*.json ./
#angular install
RUN npm install -g @angular/cli
RUN npm install
#copy the code into the container
COPY . .
#server
FROM nginx:1.21.1
#copy the build file
COPY --from=build /app/dist/my-cab-buddy /usr/share/nginx/html
#expose the port
EXPOSE 80
#start command
CMD ["nginx","-g","daemon off;"]
