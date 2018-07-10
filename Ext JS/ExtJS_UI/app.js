/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'NavTest.Application',

    name: 'NavTest',

    requires: [
        // This will automatically load all classes in the NavTest namespace
        // so that application classes do not need to require each other.
        'NavTest.*'
    ]
});
