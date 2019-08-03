# Pokedex API Backend

### MEVN app pulling from a Pokedex API, CI setup on Buddy.

## Environment setup:
  
  Using Docker to set up the api environment
  Docker compose builds the images and runs the containers
#### Buddy CI configuration:
- set up new project
- authorize github repository
- add new pipeline (contains the sequence of actions to run)
- pipeline settings:
  - on push (check)
  - single branch : branch name to trigger
  - actions:
   - ssh action: <br />

          if ! ls Pokedex-CI_UI; then

            git clone -b nginxtest https://github.com/team-red-cognz/Pokedex-CI_UI.git

          else

            echo "Repo already here"

          fi

    *checks if repo has been pulled and if not pulls it in HEAD directory*
    - upload files action
    - ssh action:
          
          docker-compose up -d --build

     - send email contification:
       *sends email if the pipeline gets to that point (aka verify if complete)*
