## Braindump TODOs

* Worth trying to install backend with just one DB driver?
* Move away from poetry in containers?
* Revisit alpine for backend now that `orjson` is gone
* Run jobs in Makefile with clean env + PATH 
  * How is env specified - /usr/bin/env vs .env

## Ongoing efforts

### Minimal backend dev image

1. Sqlite for the db
   1. look at building image with correct schema (move db actions from boot.sh to image)
   1. how does this work with moving away from poetry in containers?
1. No keycloak, same auth as getting started guide (done)
1. src/tests as volumes (src done)
1. El Rodeo version of bin as volume (done)
   1. Once things settle copy in bin
1. Own permissions file?
1. Need build target to run tests

### Arena dev image

1. ./bin/run_pyl
1. How does this play with the dev images/local dev image
1. It needs all the same deps? image caching/resuse should help?

### Recipes/Environments

1. docker-compose.yml to launch frontend lastest-main and local minimal backend (done)
1. use root docker-compose.yml from getting started guide, provide overlays (done)
1. split openid config into overlay

### Local Development image (where the typing happens) aka houston

1. alpine
   1. vim, git, gh, tmux
   1. .ssh as volume
   1. emacs server/client instead?
1. volumes for arena/SpiffWorkflow
1. run tests, ./bin/run_pyl via other containers?
1. view logs from other containers?
1. start/stop/restart containers?
