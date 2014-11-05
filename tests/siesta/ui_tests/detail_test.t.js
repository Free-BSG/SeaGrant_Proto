StartTest(function(t) {
    t.diag("Detail Page Tests");

    // Header test 
    var tool = Ext.ComponentQuery.query('toolbar');
    // console.log('This is the toolbar: ');
    // console.log(tool[1]);
    t.is(tool[2].config.itemId, 'detailPageToolbar', "We have a Header");

    // Back button test
    var Bbtn = Ext.ComponentQuery.query('button[itemId=backListButton]');
    // console.log("Here is Bbtn: ");
    // console.log(Bbtn[0]);
    t.click(Bbtn); 

    // Check that button exists
    t.is(Bbtn[0]._itemId, 'backListButton', 'Back button exists.');
    // Now check that it fires correct event to controller
    t.is(Bbtn[0].eventDispatcher.listenerStacks.component.detail.viewBackListCommand.listeners.current[0].fn.$name, 'onViewBackListCommand', 'The Back button sends us to the List page.');
   
   // Home button test
    var Bbtn = Ext.ComponentQuery.query('button[itemId=backHomeButton]');
    // console.log("Here is Bbtn: ");
    // console.log(Bbtn[0]);
    t.click(Bbtn);
    // Check that button exists
    t.is(Bbtn[0]._itemId, 'backHomeButton', 'Home button exists.');
    // Now check that it fires correct event to controller
    t.is(Bbtn[0].eventDispatcher.listenerStacks.component.listview.viewBackHomeCommand.listeners.current[0].fn.$name, 'onViewBackHomeCommand', 'The Home button sends us to the Home page.');
   
    // Vendor/Product details

    t.diag('List tests');
    // // list view test
    var list = Ext.ComponentQuery.query('list[itemId=Dpagelist]');
    // console.log("This is the List: ");
    // console.log(list);
    // Check list exists
    t.is(list[0]._itemId, 'Dpagelist', "List exists");
    // list select test
    t.is(list[0].eventDispatcher.listenerStacks.component.detail.viewDpageListItemCommand.listeners.current[0].fn.$name, 'onViewDpageListItemCommand', 'Selected List item fires event to controller');
    

    t.done();   // Optional, marks the correct exit point from the test
});  
