# TODO

Since I'm not using any sort of task board for this simple project, I'm going to log stories here.

## Features

The application should do some validation on the data, maybe client and server both.

I should be able to hit `return` instead of having to click on the add button.

The server-side endpoints need to be more verbose, and handle errors.

## Style

The list items shouldn't animate on load; only new contacts should animate.
A possible solution to this is the async library, but I just have to look into it.

I also want to either not animate at all on a successful edit, or have a different
animation than the ones for adding and removing, preferably slide out/in sideways.

I need to refactor the client-side contacts controller to be singlular for consistency.

## Testing
Use PhantomJS instead of Chrome.

I would like to be able to more clearly see test results.  
Karma does not specify the names of the tests as they pass or fail.  
Jasmine-node does, but I would like it to be uniform with Karma.

I need to be able to verify that db calls are being made in the server for commands.
Specifically, the add/edit/delete endpoints. This may require refactoring the endpoints
so that they call functions rather than have the functions inside them. Or, I could
possibly spy on the db calls themselve via Jasmine-node.

I need to add integration tests at some point.

I should add feature tests. I think they may be part of the integration tests.

Add good, formatting logging capabilities.

## Building

I would like the ability to bundle all of my scripts and stylesheets, and minify them.

## Compatibility

I need the ability to work on this cross-platform with other people. I need to look
into my pathing and possibly use approaches like `join` that will make them compatible
with other architectures.

## Documentation

I need to go through the project and use JSDoc to document my files and functions.

Make custom plugins for JSDoc to more finely document specs/services/etc.

## Meta

I need to add a license file to this project.
