# TODO

Since I'm not using any sort of task board for this simple project, I'm going to log stories here.

## Features

I would like the ability to edit contacts.

I would like the ability to delete contacts.

The application should do some validation on the data, maybe client and server both.

I should be able to hit `return` instead of having to click on the add button.

The server-side endpoints need to be more verbose, and handle errors.

## Style

I would like the application to look better.

The list items shouldn't animate on load; only new contacts should animate.
A possible solution to this is the async library, but I just have to look into it.

## Testing

I would like to be able to more clearly see test results.  
Karma does not specify the names of the tests as they pass or fail.  
Jasmine-node does, but I would like it to be uniform with Karma.

I need to be able to verify that db calls are being made in the server for commands.
Specifically, the add/edit/delete endpoints. This may require refactoring the endpoints
so that they call functions rather than have the functions inside them. Or, I could
possibly spy on the db calls themselve via Jasmine-node.

## Building

I would like the ability to bundle all of my scripts and stylesheets, and minify them.

## Compatibility

I need the ability to work on this cross-platform with other people. I need to look
into my pathing and possibly use approaches like `join` that will make them compatible
with other architectures.
