# contact-list
An example project for becoming familiar with MEAN stack.

## Notice:
This project has been refactored into [Abject Admin](https://github.com/Jenuma/abject-admin), which picks up right where I left off here. The new project integrates the contact list into a much larger intranet that can also house other tools.

## Legacy
`contact-list` currently features the ability to list all contacts (name/email address/phone number) from a MongoDB data source.
Additionally, you can add new contacts, delete contacts, or edit contacts.

Based on [this](https://www.youtube.com/watch?v=kHV7gOHvNdk) YouTube tutorial.

I have derailed from the tutorial quite a bit:
- This project uses Mongoose instead of MongoJS
- This project implements up-to-date Angular best-practices
- This project's concerns are separated appropriately
- This project features unit tests for client and server controllers
- This project utilizes `grunt` to automate several tasks
- This project features dummy data for automated testing
- This project is styled with CSS
- This project features `animate.css` animations
- This project utilizes `font-awesome` icons

## Running the App Locally
1. Clone the repo to your destination of choice.
2. Install Node.js if you haven't already.
3. Navigate to contact-list and install dependecies
4. Install MongoDB if you haven't already.
5. Run an instance of mongod.exe on localhost at port 27017 (default address).
6. Run `npm install -g grunt-cli` if you wish to use automation tasks
7. Run `grunt` (or navigate to /server and run `node server` if you didn't install grunt)
8. Navigate to localhost:3000 to load the client.

## Testing the App
This application uses the Jasmine testing framework for both client and server JavaScript files.  
Client-side tests are run with Karma and server-side tests are run with jasmine-node.

If you have grunt, you can automate all tests with `grunt test`.  
If not, you can use `karma start` to run client-side tests, and `jasmine-node /server` to run server-side tests.
