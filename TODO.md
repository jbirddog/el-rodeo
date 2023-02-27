## Braindump TODOs

* Rename top level `docker` folder to something like `local`
* Can backend drop `orjson`? If so revisit alpine
* Worth trying to install backend with just one DB driver?
* Move away from poetry in containers
* Run jobs in Makefile with clean env 

## Ongoing efforts

### Minimal backend dev image

1. Sqlite for the db
   1. v1 upgrade db on boot
   1. v2 look at building image with correct schema
1. No keycloak, same auth as getting started guide
1. src/tests as volumes
1. El Rodeo version of bin as volume

### Development image
