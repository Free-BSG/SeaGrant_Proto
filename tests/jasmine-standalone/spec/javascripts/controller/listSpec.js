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

     var store;
 
    beforeEach(function() {
        //Set up globals
        console.log('in before each function');
        jasmine.Ajax.install();
        console.log('Ajax is installed');
        store = Ext.create('SeaGrant_Proto.controller.List');
        console.log('store created');
        console.log(store);
    });

    afterEach(function() {
        //Take down globals

        //This looks like it should be leaky, check the sencha API for
        //something like the model.destroy() function.
        jasmine.Ajax.uninstall();
        store = null;
        console.log('store removed');
    });

    it('exists', function() {
        console.log('In exists function');
        console.log(store);
        expect(store.$className).toEqual('SeaGrant_Proto.controller.List');
    });
});