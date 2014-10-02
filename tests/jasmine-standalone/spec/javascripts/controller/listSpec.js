// describe('SeaGrant_Proto.controller.List',function() {

// 	var controller;

//     beforeEach(function() {
//         //Set up globals
// 		jasmine.Ajax.install();
// 		controller = Ext.create('SeaGrant_Proto.controller.List');
//     });

//     afterEach(function() {
//         //Take down globals

//         //This looks like it should be leaky, check the sencha API for
//         //something like the model.destroy() function.
// 		jasmine.Ajax.uninstall();
//         controller = null;
//     });

//     // it says that it can't load synchronously via XHR
// 	it('exists', function() {
//         console.log(controller.$className);
//         expect(controller.$className).toEqual('SeaGrant_Proto.controller.List');
//     });
// });

describe('SeaGrant_Proto.controller.List',function() {

    // this is not neccisary, it adds the errors at the bottom of the console.logs
    Ext.require('SeaGrant_Proto.controller.List');

    var controller, app;
 
    beforeEach(function() {
        //Set up globals
        // console.log('in before each function');
        // jasmine.Ajax.install();
        // console.log('Ajax is installed');
        console.log('Create app');
        app = Ext.create('Ext.app.Application', {name: 'SeaGrant_Proto'});
        console.log('app created');
        console.log(app);
        // this checks that the controller is sourced correctly, see the top of List.js
        if(isPresent === true){
            console.log('present is true');
        }
        // We are not loading our store correctly here
        controller = Ext.create('SeaGrant_Proto.controller.List', {application: app});
        console.log('controller created');
        console.log(controller);
        controller.launch();
    });

    afterEach(function() {
        app.destroy();
        console.log('app destroyed');
    });

    it('#onViewgoCommand', function() {
        console.log('#onViewgoCommand function');
        var go = controller.onViewgoCommand();
        expect(SeaGrant_Proto.cent[0]).toBeTruthy();
    });
});