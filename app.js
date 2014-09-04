/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setConfig({
    enabled:true,
    disableCaching: false,
    paths: {
        "Ext": 'touch/src'
    }
});

Ext.application({
    name: 'SeaGrant_Proto',

    controllers: ["List"],
    models: ['City', "Test", "Products", "Locations", "States"],
    stores: ["Info", "Education", "CountryStore", "StateStore", "Vendor", "Product", "Location", "Distance"],
    views: ["Home", "Detail", "ListView", "Map", "Info", "Specific", "TestView"],


    launch: function() {
        // Initialize the main view
        // Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.TestView'));
        Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.Home'));
        Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.Detail'));
        Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.Map'));
        Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.ListView'));
        Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.Info'));
        Ext.Viewport.add(Ext.create('SeaGrant_Proto.view.Specific'));
    }
});
