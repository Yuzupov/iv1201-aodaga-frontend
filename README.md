# iv1201-aodaga
the project repo for architecture and design of global applications

# First Section: Installing
Make a directory and clone this repository to get access to the source code. Navigate to the front-end directory and do the following:
All the dependencies for the front-end part should be installed with 'npm install' and then run it with 'npm run dev'.
The code is currently displayed on 'http://localhost:5173/'

For the back-end it is required to have Java 17 for development and PostgreSQL locally to emulate the DB. The migration script is in the root of the project. Run the SQL script and then run the main method in the back-end and it should work in conjunction with the front-end on localhost.

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
