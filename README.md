# iv1201-aodaga
the project repo for architecture and design of global applications

# Installing
Make a directory and clone this repository to get access to the source code. Navigate to the front-end directory and do the following:
All the dependencies for the front-end part should be installed with 'npm install' and then run it with 'npm run dev'.
The localhost server is currently served on 'http://localhost:5173/'

# Deploying changes
To deploy changes it is necessary to push it to the upstream at Heroku. This can be done by doing the following:
Navigate to the directory that contains the front-end repository.
Enter the following prompt:
$ git push heroku main

# Testing
After each deployment to Heroku the application should be tested immediately in the following browsers:
Mozilla Firefox, Google Chrome, Microsoft Edge, Safari.

# Architectural Decisions
## Application
Monolithic
## Front-end
MVP (Model-View-Presenter)
## Back-end
MVC (Model-View-Controller) with RESTapi endpoints.

# Languages
## Application
Mixed
## Front-end
JavaScript with React
## Back-end
Java with Spark
## Database
PostgreSQL

# Misc
## Build tools
### Back-end
Maven
### Front-end
Vite
## Hosting Service
Heroku
## Documentation
The codebase follows JavaDoc convention of documenting code both in front-end and back-end.
Back-end uses JavaDoc and front-end JSDoc.
## Structure
The code-base follows Google Java convention, in short for the front-end you will use 2-space indentation
## IDE
Use whichever IDE you want, suggested ones for back-end are IntelliJ and VSCode. For front-end it matters less but VSCode has live-share so that is something to consider.
## Decisions
Decisions should be unanimous, if unable to reach consensus then a democratic vote should be done. If there is still a deadlock, keep discussing until either consensus or majority vote is reached.
