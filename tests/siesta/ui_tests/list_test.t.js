StartTest(function(t) {
    t.diag("List Page Tests");

    // Header test 
    var tool = Ext.ComponentQuery.query('toolbar');
    // console.log('This is the toolbar: ');
    console.log(tool);
    t.is(tool[1].config.itemId, 'listPageToolbar', "We have a Header"); 

    // Back button test
    var Bbtn = Ext.ComponentQuery.query('button[itemId=HomeButton]');
    console.log("Here is Bbtn: ");
    console.log(Bbtn[0]);
    t.click(Bbtn);
    // Check that button exists
    t.is(Bbtn[0]._itemId, 'HomeButton', 'Back button exists.');
    // Now check that it fires correct event to controller
    t.is(Bbtn[0].eventDispatcher.listenerStacks.component.listview.viewBackHomeCommand.listeners.current[0].fn.$name, 'onViewBackHomeCommand', 'The Back button sends us to the Home page.');

    // Home button test
    var Bbtn = Ext.ComponentQuery.query('button[itemId=backHomeButton]');
    // console.log("Here is Bbtn: ");
    // console.log(Bbtn[0]);
    t.click(Bbtn);
    // Check that button exists
    t.is(Bbtn[0]._itemId, 'backHomeButton', 'Home button exists.');
    // Now check that it fires correct event to controller
    t.is(Bbtn[0].eventDispatcher.listenerStacks.component.listview.viewBackHomeCommand.listeners.current[0].fn.$name, 'onViewBackHomeCommand', 'The Home button sends us to the Home page.');
   
    t.diag('Map tests');
    // Map view test
    var map = Ext.ComponentQuery.query('SeaGrantMap[itemId=listmap]');
    // console.log(map);
    // Check that Map exists
    t.is(map[0]._itemId, 'listmap', 'Map exists');
    // check that the map reacts to user input

    t.diag('List tests');
    // // list view test
    var list = Ext.ComponentQuery.query('list[itemId=Lpagelist]');
    // console.log("This is the List: ");
    // console.log(list);
    // Check list exists
    t.is(list[0]._itemId, 'Lpagelist', "List exists");
    // list select test
    t.is(list[0].eventDispatcher.listenerStacks.component.listview.viewLpageListItemCommand.listeners.current[0].fn.$name, 'onViewLpageListItemCommand', 'Selected List item fires event to controller');
    

    t.done();   // Optional, marks the correct exit point from the test
});  

