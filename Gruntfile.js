module.exports = function(grunt) {
    grunt.initConfig({
        nodemon: {
            dev: {
                // NEVER PUT A PATH IN THIS FILE NAME
                script: "server.js",
                options: {
                    // PUT PATH HERE INSTEAD
                    // THIS TOOK ME 4 HOURS TO FIX
                    cwd: __dirname + "/server"
                }
            }
        },
        karma: {
            dev: {
                configFile: "config/karma.conf.js",
                singleRun: true
            }
        }
    });
    
    //
    // npm Tasks
    //
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-karma");
    
    //
    // db-clear
    //
    grunt.registerTask("db-clear", "Clears the database of all data.", function() {
        var mongoose = require("mongoose");
        var dbConfig = require("./config/db");
        
        var done = this.async();
        
        mongoose.connect(dbConfig.url);
        var connection = mongoose.connection;
        
        connection.once("open", function() {
            connection.db.dropDatabase(function(err) {
                if(err) {
                    grunt.log.writeln("Error: " + err);
                }
                else {
                    grunt.log.writeln("Successfully dropped development database.");
                }
                
                connection.close(done);
            });
        });
    });
    
    //
    // db-populate
    //
    grunt.registerTask("db-populate", "Populates the database with dummy data.", function() {
        var mongoose = require("mongoose");
        var async = require("async");
        var dbConfig = require("./config/db");
        
        var jsonContacts = grunt.file.readJSON("./config/development-data.json").allContacts;
        var done = this.async();
        
        mongoose.Promise = global.Promise;
        
        global.autoIncrement = require("mongoose-auto-increment");
        mongoose.connect(dbConfig.url);
        var connection = mongoose.connection;
        autoIncrement.initialize(connection);
        
        var Contact = require("./server/models/contact").Contact;
        
        var contacts = [];
        for(var i = 0; i < jsonContacts.length; i++) {
            var newContact = new Contact({
                name: jsonContacts[i].name,
                email: jsonContacts[i].email,
                number: jsonContacts[i].number
            });
            contacts.push(newContact);
        }
        
        connection.once("open", function() {
            async.eachSeries(contacts, function(contact, asyncdone) {
                contact.save(asyncdone);
            }, function(err) {
                if(err) {
                    grunt.log.writeln("Error: " + err);
                }
                else {
                    grunt.log.writeln("Successfully wrote contacts to dev database.");
                }
                
                connection.close(done);
            });
        });
    });
    
    grunt.registerTask("jasmine-node", "Runs server-side Jasmine specs.", function() {
        var jasmine = require("jasmine-node");
        
        var onComplete = function(runner, log) {
            var exitCode;
            grunt.log.writeln("\n");
            if(runner.results().failedCount === 0) {
                exitCode = 0;
            } else {
                exitCode = 1;
                
                process.exit(exitCode);
            }
            jasmine.getGlobal().jasmine.currentEnv_ = undefined;
            done(exitCode === 0);
        };
        
        var jasmineOptions = {
            specFolders: ["./server"],
            onComplete: onComplete,
            isVerbose: true,
            showColors: true,
            teamcity: false,
            useRequireJs: false,
            regExpSpec: new RegExp("\\.*\\.spec\\.js"),
            junitreport: false,
            includeStackTrace: true,
            coffee: false,
            growl: false
        };
        
        var done = this.async();
        
        try {
            jasmine.executeSpecsInFolder(jasmineOptions);
        } catch(e) {
            grunt.log.writeln("Failed to execute specs. Error: " + e.stack);
        }
    });
    
    //
    // db-reset
    //
    grunt.registerTask("db-reset", ["db-clear", "db-populate"]);
    
    //
    // test
    //
    grunt.registerTask("test", ["db-reset", "karma", "jasmine-node"]);
    
    //
    // default
    //
    grunt.registerTask("default", ["db-reset", "nodemon"]);
};
