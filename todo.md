# TODO

Since I'm not using any sort of task board for this simple project, I'm going to log stories here.

## Features

The application should do some validation on the data, maybe client and server both.

The client-side controllers need to be more verbose, and handle errors.

The add contact button icon should change from a plus to a check when editing a contact.

## Style

The list items shouldn't animate on load; only new contacts should animate.
A possible solution to this is the async library, but I just have to look into it.

I also want to either not animate at all on a successful edit, or have a different
animation than the ones for adding and removing, preferably slide out/in sideways.

I need to refactor the client-side contacts controller to be singlular for consistency.

## Testing

I would like to be able to more clearly see test results.  
Karma does not specify the names of the tests as they pass or fail.  
Jasmine-node does, but I would like it to be uniform with Karma.

I need to be able to verify that db calls are being made in the server for commands.

I need to add integration tests at some point.

I should add feature tests. I think they may be part of the integration tests.

Add good, formatting logging capabilities.

## Building

I would like the ability to bundle all of my scripts and stylesheets, and minify them.
If I could make one build command for lint/minify/bundle/document/test, that'd be amazing.

## Compatibility

404

## Documentation

Make custom plugins for JSDoc to more finely document specs/services/etc.

## Meta

I need to add a license file to this project.

I need to update the standards for the file, i.e., don't pull request until you
test, document, and squash.

I need to document the folder structure either on the wiki or somewhere.

I should document my batch/command files for mongod on the wiki.