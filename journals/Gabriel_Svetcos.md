At a minimum, you'll need to include the following information in each entry:

    The date of the entry
    A list of features/issues that you worked on and who you worked with, if applicable
    A reflection on any design conversations that you had
    At least one ah-ha! moment that you had during your coding, however small
    Keep your journal in reverse chronological order. Always put new entries at the top.

## Tuesday - August 22, 2023

Today, I worked on:

* Project_stacks endpoints

I started and finished the GET, GET (All), POST, PUT, and DELETE methods for the 'project_stacks' table endpoints.

## Monday - August 21, 2023

Today, I worked on:

* First Merge Request for Project POST/DELETE methods; Started project_stacks endpoints

I finished my endpoints for the Project POST and DELETE request methods then completed the merge request into main after it was reviewed. I also created a new branch 'project-stacks' to begin working on the endpoints (GET, GET, POST, PUT, DELETE) for the project-stacks table.

After pulling updated merged code from Main before prepping my own merge request, I ran into an issue with our migration file not matching. I was informed by teammates that I needed to Drop the tables and rerun docker compose. I used Beekeeper to drop the tables, which had to be done in a certain order due to dependencies, and was able to successfully get all the containers running again after executing docker-compose up.

## Friday - August 18, 2023

* No Class

## Thursday - August 17, 2023

* Out of Class

## Wednesday - August 16, 2023

Today, I worked on:

* Project POST and DELETE Endpoints.

I followed along with the FastAPI videos in the learn module to implement the POST request method for the project table. I also implemented/completed the DELETE request method for the project table.

I ran into an issue when trying to test my POST endpoint: the 'account' table doesn't have any data yet, so the 'owner_id' property can't be properly connected as a foreign key. After looking around, I figured out how to use PGAdmin to 'inject' data for a new row in the 'account' table to pull an owner_id from.

## Tuesday - August 15, 2023

Today, I worked on:

* Initial project setup & Starting Endpoint Features

I completed the Docker-Compose YAML, Dockerfile.dev, and added the Psycopg line to requirements.txt to help figure out issues we were having with the docker containers. From there, we were able to successfully setup our project and database tables.

After we got the project initialized, we split up the tasks and assigned issues for each of us to begin working on. Brad and I will be working on the back-end endpoints for the 'Projects'. Specifically, I will be handling the POST and DELETE methods.

By starting the project completely over from scratch, I found that part of the reason our FastAPI container kept failing to run was because the GHI needed time to finish its initial compile.
