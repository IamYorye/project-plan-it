August 16, 2023

Yesterday we set up our yaml file and created our database in the migrations file.  Created the volumes for each volume in the yaml file and docker-composed up to see all the containers running without any error.  As for today, for the majority of the day, Brad, Libby, Gabe and I all worked on our portions of the endpoints.  I was able to finish all of the endpoints for accounts and tested them out to make sure no errors occurred.  I was able to create an account with the correct output, get all of the accounts that have been created in a list, get a specific account by passing in an id, delete an account by passing in an id, and update the content of an account by passing in an id.  Some blockers occurred with some validation errors, but nothing google and the learn concepts couldn't fix.

August 17, 2023

Successfully merged auth and accounts.  Had some merge conflicts which Libby and I sorted out and were able to resolve.  Tested out the branch with everything resolved.  All endpoints functioned correctly.  Libby approved the merge request and we merged both account and auth to main.  I tested out her auth branch, and she tested out my accounts branch.

August 21, 2023

Created endpoints for tech stacks and tested them all out to make sure no errors were occurring.  I was able to create a tech stack by passing the name of the tech stack in a string value.  Get all of tech stacks I've created which gets returning as an array.  Get a specific tech stack by passing in it;s id, delete a tech stack by passing in it's id, and update a tech stack by changing the string values name, and once again passing in the id.  A blocker had occurred in where I wasn't able to get the list of all tech stacks, which I fixed by fixing the return statement in the router (I was missing a parenthesis).
