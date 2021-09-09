# The Crystal Index

A very ambitious side project to catalogue my crystals.

## Project setup
```
docker exec -it crystalsbackend npx sequelize-cli db:create
docker exec -it crystalsbackend npx sequelize-cli db:migrate
```

### Compiles and hot-reloads for development
```
docker-compose -f development.yml build
docker-compose -f development.yml up crystalsbackend crystalsfrontend
```

### Compiles and minifies for production
```
docker-compose up --build
```
