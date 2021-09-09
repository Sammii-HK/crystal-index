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

_NB_
```docker-compose up``` 
will build the container the first time if it's never been built before, but any changes to Dockerfiles or anything to do with it, **you have to manually build again**
