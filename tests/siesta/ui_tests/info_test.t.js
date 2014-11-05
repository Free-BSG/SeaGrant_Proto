StartTest(function(t) {
    t.diag("Info Page Tests");

    // Header test 
    var tool = Ext.ComponentQuery.query('toolbar');
    // console.log('This is the toolbar: ');
    // console.log(tool);
    t.is(tool[4].config.itemId, 'infoPageToolbar', "We have a Header");

    // Back button test
    var Bbtn = Ext.ComponentQuery.query('button[itemId=backDetailButton]');
    // console.log("Here is Bbtn: ");
    // console.log(Bbtn[0]);
    //t.click(Bbtn);
    // Checks that button exists 
    t.is(Bbtn[0]._itemId, 'backDetailButton', 'We have a back button to detail page');
    // Now check that button fires correct event to controller
    t.is(Bbtn[0].eventDispatcher.listenerStacks.component.info.viewBackDetailCommand.listeners.current[0].fn.$name, 'onViewBackDetailCommand', 'The Back button sends us to the Detail page.');

    // Home button test
    var Bbtn = Ext.ComponentQuery.query('button[itemId=backHomeButton]');
    // console.log("Here is Bbtn: ");
    // console.log(Bbtn[0]);
    t.click(Bbtn);
    // Check that button exists
    t.is(Bbtn[0]._itemId, 'backHomeButton', 'Home button exists.');
    // Now check that it fires correct event to controller
    t.is(Bbtn[0].eventDispatcher.listenerStacks.component.listview.viewBackHomeCommand.listeners.current[0].fn.$name, 'onViewBackHomeCommand', 'The Home button sends us to the Home page.');
   
    t.diag('List tests');
   // Data displayed test
   var fixed = Ext.ComponentQuery.query('list[itemId=Ipagelist]');
   // console.log(fixed);
   // Check that the list exists
   t.is(fixed[0]._itemId, 'Ipagelist', 'List exists');
   // Check on list item select
   t.is(fixed[0].eventDispatcher.listenerStacks.component.info.viewIpageListItemCommand.listeners.current[0].fn.$name, 'onViewIpageListItemCommand', 'Selecting a list item sends us to the specific page.');
    

    t.done();   // Optional, marks the correct exit point from the test
});  
