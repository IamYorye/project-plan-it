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
