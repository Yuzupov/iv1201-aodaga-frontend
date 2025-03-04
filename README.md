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

# Adding Routes and Endpoints
## Routes
Adding routes should be done in App.jsx.
Each route should map to at least one view.
Each view should be located in the /src/views directory.
## Endpoints
### Communication with Back-end Endpoints
When adding functionality to communicate with an endpoint, it needs to follow the following structure:
Fetch API should be used when communicating to the back-end. When communicating with the back-end the method that contains the fetch function must be wrapped in another function. See below for an example:

async wrapperMockFunction(){
    const response = await this.mockFunction();
}

async mockFunction(){
    try {
        const response = await fetch(\<endpoint-URI\>,
            {
                \<request-options\>,
            }
        );
        if(!response.ok){
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
    
    } catch (error){
        console.error(\<endpoint-specific-error-handling\>);
    }
}

This is to ensure that the presenter and view layer never directly communicates with the backend.

The flow will as such be:

View does some action -> calls a method in the presenter and passes potential data down as props -> presenter calls the wrapper method in the model and passes potential data down as props.

### Communication protocol
The application follows REST API. Therefore no client information is stored between get requests and every request is separate and unconnected. This means that prop passing will be used for each call, regardless if the model currently holds any data.  
### Encryption protocol
Each request needs to be encrypted according to the implemented encryption protocol. The encryption method accepts JSON objects. The decryption method accepts the encrypted response object, the encryption object's AES key, as well as a signature, and returns a JSON object. For each request a signature is needed and is generated through the Date.now().toString() function. See example below:

async wrapperMockFunction(props){
    const signature = Date.now.toString();
    const crypt = this.encryptJSONObject(props);
    this.fields.JSONCipherObject = crypt.json;
    this.fields.JSONCipherObject.timestamp = signature;
    try {
        const response = await this.mockFunction();
        const decryptedResponse = this.decryptResponse(response, crypt.aeskey, signature);
    } catch (error) {
        console.error(error);
    }
}

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
