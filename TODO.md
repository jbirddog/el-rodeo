## Braindump TODOs

* Worth trying to install backend with just one DB driver?
* Move away from poetry in containers
* Revisit alpine for backend now that `orjson` is gone
* Run jobs in Makefile with clean env + PATH 
  * How is env specified

## Ongoing efforts

### Minimal backend dev image

1. Sqlite for the db
   1. v0 assume db exists from outside of El Rodeo (not ideal)
   1. v1 look at building image with correct schema
   1. migration issue blocking v1 reproduces outside of El Rodeo, needs rmall action
1. No keycloak, same auth as getting started guide (done)
1. src/tests as volumes (src done)
1. El Rodeo version of bin as volume (done)
1. Own permissions file?

### Arena dev image

1. ./bin/run_pyl

### Recipes/Environments

1. docker-compose.yml to launch frontend lastest-main and local minimal backend
1. use root docker-compose.yml from getting started guide, provide overlays

### Development image

1. alpine
   1. vim, git, gh, tmux
   1. .ssh as volume
1. volumes for arena/SpiffWorkflow
1. run tests, ./bin/run_pyl
1. logs
