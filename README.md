# contact-list
An example project for becoming familiar with MEAN stack.

It currently features the ability to list all contacts (name/email address/phone number) from a MongoDB data source. Additionally, you can add a new contact and it will populate the list immediately.

In the future, the app should support the ability to edit and delete contacts, and possibly more beyond that. Based on a YouTube tutorial that I will like when I feel like it another day.

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
