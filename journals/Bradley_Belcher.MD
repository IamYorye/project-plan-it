Things to add:
css grid x 2 for features and icons
sizing, font changes, styling changes
learned about various containers - fluid etc
made all custom icons
made custom logo
made AI generated video
exorbitant amount of .css styling. Reduce amount of css styling to make it universal.
trouble shooting image issues after tailwind integration
writing new code for cards for random population of projects
spent time making cards and carousel
difficulty populating projectcards due to token issues. we require someone to be logged into see projects but the main page doesn't require login or token to see, but to access projects requires a token. we need to fix this.
trouble shooting issues with function being able to access cards via token has taken hours. posted in help me understand.

29 August 2023
I'm still working on the landing page. I'm really trying to incorporate some more advanced webpage design and concepts. Today I spent a couple hours learning about and writing code to use react webpacks to import all my media that I had spent a lot of time creating from the file folder. I didn't want to have to import over a dozen files individually, so spent time writing a const webpack that import all my media. It worked and I was able to get all imgs on the page working. however, when I tried to do a git push to update everything, including the video file, there was huge wait time and it never seemed to update. I have come to teh conclusion that adding the media, especially the video, directly to the project may be causing the delay and issues due to file sizes. While it's only a couple hundred kb per img and less than 8mb for the video, I can't figure out any other reason. I am now uploading all the data to a file sharing site that i can link with URL's instead. Wasted about 4 hours researching and writing that react code. At least I learned something new.

28 August 2023
25 August 2023
24 August 2023
23 August 2023
22 August 2023

this morning I got my code functioning and updated my merge request. My partners confirmed the code is working and I merged to main. I then got started on the next job of creating the user_stacks backend API. since i spent so much time creating the other back end I learned a lot and this was much, much easier to code and implement. I've already got most of it working and think I'll be merging before the end of the day.

21 August 2023

I am still trouble shooting code but I believe I finally have it working. I created my first merge request and my partner Libby immediately found the code wasn't functioning properly and found where the issues were. I had some issues with merging with the main and made some mistakes that took a couple hours to correct. I believe I've found the problem and am working on a fix.

17 August 2023

I've overall completed the coding for the FastAPI and necessary functions and now I'm trouble shooting. I realized there are issues with some of my naming conventions and inconsistencies. I also need to add in better trouble shooting and error functioning. I'm also trying to work with Gabe a bit and see if we can align our code more with naming conventions. It is obvious two separate people created the code simply because of how we are naming and a few other differneces in how we've implemented.

16 August 2023

I am still working on the backend API for Projects. As it's my first time using PostgreSQL language I'm having to take additional time learning the various aspects of not using a framework like Django for my API. I had some issues with my docker container but I did some trouble shooting and I have it working now.

15 August 2023

We divided back end duties. Gabe and I are splitting the back end API to develop Projects. I will be doing two GET functions and the PUT function. I have started by creating two files, projects.py under queries and routers folder. I plan on making the quieries first and make models and define functions, then will move on to the routers and create teh FastAPI
