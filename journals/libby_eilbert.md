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
