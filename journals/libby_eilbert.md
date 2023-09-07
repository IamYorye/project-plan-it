8/16/23

Today I worked on:

auth:   - generated signing key
        - created authenticator.py file, queries.accounts.py, routers.accounts.py
        - edited main.py
        - had to change account table to make the password character limit longer

Struggled with the create and get functions in AccountRepo class, spent a lot of time debugging before finally finding the answer in the lecture on backend auth (I hadn't configured the get function and had missed that it was getting called in authenticator.py)


8/17/23

Today I worked with Jaspreet on:

- merging our branches with main

Took a while to resolve merge conflicts because we'd both been working in the same files, but now all the accounts endpoints are finished.


8/21/23

Today I worked on an endpoint to create an 'attendee,' which is just a way to link an account to a project, for when a user wants to join a project.

8/22/23

Today I worked on an endpoint to list all the attendees of a given project. Spent a long time debugging because it wasn't working and the error I was getting in Docker was not very descriptive, but as soon as I showed it to my team I was able to see that I had an inconsistency in my response model in the router and in the query.

8/23/23, 8/24/23

On these 2 days I worked with the whole group on implementing front end authentication. We ran into a lot of bugs and I had to fix an issue I've had for a while with starting the React container through Docker, but everything is working as of end of day Thursday. There is still a problem with my computer not being able to properly run out docker-compose.yml so I had to make some changes to it that I'll have to leave out of all my future commits.

8/25/23

Today I worked on:

an edit profile React component:

- created EditProfile.js in ghi/src
- added route to App.js

Ran into an issue here the edit account endpoint was returning a 500 internal servor error and couldn't trouble shoot it on my own so I'll have to bring it to the team on Monday.

8/28/23

Today I worked on the edit profile React component:

- fixed the problem with the get account endpoint by editing queries/accounts.py
- got most of the form to work but still have to finish adding tech stacks
- had to change the tech stacks table in the database so that it has a string property called "name" instead of an array property called "stacks"

8/29/23

Today I worked on the edit profile React component:

- had to create a new endpoint to get a specific user's tech stacks so that I can list them as the user adds them to their profile
- created a placeholder Profile.js so that Edit Profile would have a page to redirect to
