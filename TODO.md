## Braindump TODOs

* Rename top level `docker` folder to something like `local`
* Worth trying to install backend with just one DB driver?
* Move away from poetry in containers
* Revisit alpine for backend now that `orjson` is gone
* Run jobs in Makefile with clean env 

## Ongoing efforts

### Minimal backend dev image

1. Sqlite for the db
   1. v1 upgrade db on boot
   1. v2 look at building image with correct schema
1. No keycloak, same auth as getting started guide
1. src/tests as volumes
1. El Rodeo version of bin as volume

### Recipes/Environments

1. docker-compose.yml to launch frontend lastest-main and local minimal backend

### Development image
