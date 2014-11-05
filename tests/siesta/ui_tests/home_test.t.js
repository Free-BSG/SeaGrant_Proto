StartTest(function(t) {
    t.diag("Home Page Tests");

    // Header test 
    var tool = Ext.ComponentQuery.query('toolbar');
    // console.log('This is the toolbar: ');
    // console.log(tool);
    t.is(tool[0].config.itemId, 'homePageToolbar', "We have a Header");

    t.diag("User Location Tests"); //###############################################################################################
    // User location toggle test
    var tog = Ext.ComponentQuery.query('togglefield[name=userlocation]');
    // console.log("Here is tog[0].config.name: ");
    // console.log(tog[0].config.name);
    t.click(tog);
    // This checks that a toggle button exists
    t.is(tog[0]._component._value[0], '0', 'We have a togglefield for user location');
    // Now check that when the toggle is toggled, an event is fired and recieved by the controller
    t.is(tog[0].eventDispatcher.listenerStacks.component.home.setUseLocation.listeners.current[0].fn.$name, 'onSetUseLocation', 'The user location toggle sends current user location data');


    t.diag("Number of vendors test"); //#############################################################################################
    var num = Ext.ComponentQuery.query('panel[itemId=vendnum]');
    // console.log('This is the num: ');
    // console.log (num);
    t.is(num[0]._itemId, 'vendnum', 'Number of Vendors panel exists');

    var print = Ext.ComponentQuery.query('panel[itemId=vendnum]');
    // console.log('This is the print: ');
    // console.log (print);
    t.is(print[0]._tpl.html, '</pre><div class="vendnum">{th}{numItems}{v}{i}{loc}{w}{prod}{end}</div><pre>', 'Number of Vendors string prints out data in correct order');

    // User location distance test
    var dropd = Ext.ComponentQuery.query('selectfield[itemId=distance]');
    // console.log("Here is tog[0].config.name: ");
    // console.log(dropd);
    // This checks that a distance drop down menu exists
    t.is(dropd[0]._component._value, '200 miles', 'We have a drop down menu for distance from user location');
    // Now check that when the toggle is toggled, an event is fired and recieved by the controller
    t.is(dropd[0].eventDispatcher.listenerStacks.component.home.setUseLocation.listeners.current[0].fn.$name, 'onSetUseLocation', 'The user location distance data is sent to the controller ');


    t.diag("Drop down list tests"); //###############################################################################################
    // Location drop list test
    var sel = Ext.ComponentQuery.query('selectfield[itemId=selectlocation]');
    // console.log("This is the Location selectfield: ");
    // console.log(sel);
    t.is(sel[0].config.itemId, 'selectlocation', " A Location selectfield exists");
    t.is(sel[0].eventDispatcher.listenerStacks.component.home.chosenLocation.listeners.current[0].fn.$name, 'onChooseLocation', 'The Location drop table sends data to the controller.');

    // Product drop list test
    var loc = Ext.ComponentQuery.query('selectfield[itemId=selectproduct]');
    // console.log("This is the Product selectfield: ");
    // console.log(loc);
    t.is(loc[0].config.itemId, 'selectproduct', " A Product selectfield exists");
    t.is(sel[0].eventDispatcher.listenerStacks.component.home.chosenProduct.listeners.current[0].fn.$name, 'onChooseProduct', 'The Product drop table sends data to the controller.');


    t.diag("Checkbox Tests");  //####################################################################################################
    // Optional sort function test
    var sortvend = Ext.ComponentQuery.query('checkboxfield[itemId=vendor]');
    var sortprod = Ext.ComponentQuery.query('checkboxfield[itemId=product]');
    // console.log("Sorting by vendor:");
    // console.log(sortvend);
    // console.log("Sorting by product:");
    // console.log(sortprod);
    // Checks that the two checkboxes exist
    t.is(sortvend[0]._itemId, 'vendor', 'Vendor checkbox exists');
    t.is(sortprod[0]._itemId, 'product', 'Product checkbox exists');
    // Now check that the check boxes fire the correct event to the controller
    t.is(sortvend[0].eventDispatcher.listenerStacks.component.home.sortByVendorCommand.listeners.current[0].fn.$name, 'onSortByVendorCommand', 'The vendor checkbox is used to sort the listpage list');
    t.is(sortprod[0].eventDispatcher.listenerStacks.component.home.sortByProductCommand.listeners.current[0].fn.$name, 'onSortByProductCommand', 'The product checkbox is used to sort the listpage list');
    
    t.diag("Go button Tests");  //####################################################################################################
    // Go button test
    var go = Ext.ComponentQuery.query('button[itemId=goButton]');
    // console.log("This is the Go button: ");
    // console.log(go); 
    t.click(go);
    // console.log(go);
    // Check that the button exists here
    t.is(go[0]._itemId, 'goButton', " We have a Go button");
    // console.log(go[0].eventDispatcher.listenerStacks.component.home.viewGoCommand.listeners.current[0].fn.$name);
    // When Go button is pressed it should fire an event to the controller that should use a function to change 
    // the view to the list page, in this case the function is onViewGoCommand
    t.is(go[0].eventDispatcher.listenerStacks.component.home.viewGoCommand.listeners.current[0].fn.$name, 'onViewGoCommand', 'The Go button sends us to the list page.');
   

    t.done();   // Optional, marks the correct exit point from the test
});  



