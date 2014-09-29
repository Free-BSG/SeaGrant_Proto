var isPresent;
isPresent = true;


Ext.define('SeaGrant_Proto.controller.List', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.MessageBox', 'Ext.util.Geolocation'],
	alias: 'cont',
	config: {
		refs: {
			homeView: 'home',
			listView: 'listview', 
			detailView: 'detail',			
			infoView: 'info',
			specificView: 'specific'
		},
		control: {
			homeView: {				
				setUseLocation: 'onSetUseLocation',
				setDistance: 'onSetDistance',
				chosenLocation: 'onChooseLocation',
				chosenProduct: 'onChooseProduct',
				sortByVendorCommand: 'onSortByVendorCommand',
				sortByProductCommand: 'onSortByProductCommand',
				viewGoCommand: 'onViewGoCommand'				
			},
			listView: {
				viewBackHomeCommand: 'onViewBackHomeCommand',
				viewDetailCommand: 'onViewDetailCommand',
				viewLpageListItemCommand: 'onViewLpageListItemCommand'
			},
			detailView: {
				viewBackListCommand: 'onViewBackListCommand',
				viewInfoCommand: 'onViewInfoCommand',
				viewDpageListItemCommand: 'onViewDpageListItemCommand'
			},
			infoView: {
				viewBackDetailCommand: 'onViewBackDetailCommand',
				viewSpecificCommand: 'onViewSpecificCommand',
				viewIpageListItemCommand: 'onViewIpageListItemCommand'
			},
			specificView: {
				viewBackInfoCommand: 'onViewBackInfoCommand'
			}
		}
	},
	slideLeftTransition: {
		type: 'slide',
		direction: 'left' 
	},
	slideRightTransition: {
		type: 'slide',
		direction: 'right'
	},
	// Functions dealing with 
	// HOME
	// stuff	######################################################################################	HOME
	onSetUseLocation: function(index, record){
		console.log('In controller(home): User Location toggle');
		console.log(record._component._value[0]);
		// console.log(record);
		// this works great in browser, but not on the device. When loaded on the device, the app will not even open
		// if(record._component._value[0] == 1){
		// 	// This updates the user's location and how far from their location they would like to search for vendors/products
		// 	Ext.device.Geolocation.watchPosition({
		// 	    frequency: 3000, // Update every 3 seconds
		// 	    callback: function(position) {
		// 	        console.log('Position updated!', position.coords);
		// 	        // console.log(index._items.items[2]._value.data.val);
		// 			var dist = index._items.items[2]._value.data.val;
		// 	    },
		// 	    failure: function() {
		// 	        console.log('something went wrong!');
		// 	    }
		// 	});
			
		// }else{
		// 	Ext.device.Geolocation.clearWatch();
		// };

		// testing using phonegap geolocation
		// on device, the on success function is never run, because watchID instantiation never gets into on success,
		// a watchID is made, but even if we explicitly call onSuccess, the element can't be set, because then position is undefined
		if(record._component._value[0] === 1){
			// This updates the user's location and how far from their location they would like to search for vendors/products
			// Wait for PhoneGap to load
		    //

		    console.log('watchID is NULL here');
		    document.addEventListener("deviceready", onDeviceReady, false);

		    // var watchID = null;
		    
		    // PhoneGap is ready
		    //
		    function onDeviceReady() {
		    	console.log('Device is ready!');
		        // Update every 3 seconds
		        var options = { frequency: 3000, enableHighAccuracy: true };
		        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		        console.log('got new watch id');
		        console.log(watchID);
		    }

		    // onSuccess Geolocation
		    //
		    function onSuccess(position) {
		    	console.log('We have success');
		        var element = document.getElementById('geolocation');
		        element ={
		        	lat: position.coords.latitude,
		        	lng: position.coords.longitude
		        };
		        // element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
		        //                     'Longitude: ' + position.coords.longitude     + '<br />' +
		        //                     '<hr />'      + element.innerHTML;
		        console.log('element:');
		        console.log(element);
		    }

		    // onError Callback receives a PositionError object
		    //
		    function onError(error) {
		        alert('code: '    + error.code    + '\n' +
		              'message: ' + error.message + '\n');
		    }

		    // THIS IS THE SECONDARY PHONEGAP GEOLOCATION TEST
		    // onSuccess Callback
			//   This method accepts a `Position` object, which contains
			//   the current GPS coordinates
			//
			// function onSuccess(position) {
			// 	console.log('We are finally successful');
			//     var element = document.getElementById('geolocation');
			//     element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
			//                         'Longitude: ' + position.coords.longitude     + '<br />' +
			//                         '<hr />'      + element.innerHTML;
			// }

			// // onError Callback receives a PositionError object
			// //
			// function onError(error) {
			//     alert('code: '    + error.code    + '\n' +
			//           'message: ' + error.message + '\n');
			// }

			// // Options: retrieve the location every 3 seconds
			// //
			// console.log('Before watchID');
			// var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 3000 });
			// console.log('Now we have a watchID');
			// console.log(watchID);

			
		}else{
			console.log('USER LOCATION IS TURNED OFF NOW!');
			console.log(watchID);
			navigator.geolocation.clearWatch(watchID);
		}

		// testing geolocation using utils
		// doesn't return anything on device
		// var geo = new Ext.util.GeoLocation({
		//     autoUpdate: true,
		//     listeners: {
		//         locationupdate: function (geo) {
		//             // alert('New latitude: ' + geo.latitude);
		//             console.log(geo.latitude);
		//         },
		//         locationerror: function (   geo,
		//                                     bTimeout, 
		//                                     bPermissionDenied, 
		//                                     bLocationUnavailable, 
		//                                     message) {
		//             if(bTimeout){
		//                 alert('Timeout occurred.');
		//             }
		//             else{
		//                 alert('Error occurred.');
		//             }
		//         }
		//     }
		// });
		// if(record._component._value[0] == 1){
		// 	geo.updateLocation();
		// 	geo.autoUpdate = true
		// }else{
		// 	// no geolocation update
		// 	geo.autoUpdate = false
		// }
	},
	// This function may be unnecessary due to the fact that we set the distance in the callback function above
	onSetDistance: function(index, record){
		console.log("In controller(home): Distance from user chosen");
		// console.log(record._value.data.val);
		SeaGrant_Proto.dist = record._value.data.val;
	},
	onLoadLocationStore: function(){
		console.log('In the init function');
		// THIS CREATES AN ARRAY TO CALL
		// console.log('Starting Initialize');
		// var store = Ext.data.StoreManager.lookup('Vendor');
		// SeaGrant_Proto.local = [];
		// var temploc;
		// for(var i = 0; i < store.getCount(); i++){
		// 	temploc = store.getAt(i).data.city;
		// 	Ext.Array.include(SeaGrant_Proto.local, temploc);
		// 	// console.log('Current City:');
		// 	// console.log(store.getAt(i).data.city);
		// 	// console.log('The latest array value');
		// 	// console.log(SeaGrant_Proto.Local[i].data.city);
		// }

		// THIS WILL INSTANTIATE A NEW STORE FOR THE LOCATION DROP DOWN LIST TO REFERENCE
		var store = Ext.data.StoreManager.lookup('Vendor');
		var storeLocal = Ext.data.StoreManager.lookup('Location');
		// console.log(stuff);
		// console.log('storeStuff Items: ');
		// console.log(storeStuff.data.items[0]);
		storeLocal.removeAll();
		// console.log(storeStuff.data.items);
		console.log(store);
		console.log(storeLocal);
		var flag;
		console.log(store.data.all);
		console.log(store.data.all.length);
		console.log(store.data.length);
		var t = 0
		// Store is populated with items from selected vendor
		for(var i = 0; i < 15; i++){
			console.log('IN FIRST FOR LOOP I');
			for(var j = 0; j <= storeLocal.data.all.length; j++){
				console.log('IN SECOND FOR LOOP J');
				console.log(storeLocal.data.all.length);
				if(storeLocal.data.all.length !== 0){
					console.log('checking flag status');
					console.log(j);
					console.log(k);
					if(store.data.all[i].city === storeLocal.data.all[k].city){
						flag = 1;					
					}
				}else{
					flag = 1;
				}
				if(flag === 1){
					console.log('newpro');
					var newpro = store.data.all[i];
					console.log(newpro);
					console.log('setting an item in the data store at location '+ t);
					console.log(store.data);
					// console.log('Name:');
					// console.log(index.data.products[i].name);
					// console.log('Prep:');
					// console.log(index.data.products[i].preparation);
					storeLocal.add(newpro);
					console.log('Added new city');
					t++;
				}
				flag = 0;
				var k = j;
			}
			
		}
	},
	onChooseLocation: function(index, record){
		// We first check to see if a location is chosen, if one is we sort by locataion,
		// then we check to see if a product is chosen, if one is we sort by product
		console.log('In controller(home): Drop Down list Location');
		this.onLoadLocationStore();
		console.log('Location is: '+ record._value.data.city); 
		SeaGrant_Proto.location = record._value.data.city;
		// ALL FILTERS ONLY TAKE STRINGS, NONE WORK WITH VARABLES
		// THAT ARE SELECED USING DROP DOWN TABLES, EVEN TOSTRING()
		// FUNCTION WILL NOT WORK
		var store = Ext.data.StoreManager.lookup('Vendor');
		// OLD DATA THAT WORKED TO FILTER BY LOCATION ONLY
		// var locationfilter = new Ext.util.Filter({
		// 	filterFn: function(item, record){
		// 		return item.get('city') === SeaGrant_Proto.location;
		// 	},
		// 	root: 'data'
		// });
		// store.clearFilter(); // this is the fix
		// store.filter(locationfilter); //now it works
		var len = store.data.all.length;
		if(SeaGrant_Proto.location !== 'Please choose a location'){
			var locationfilter = new Ext.util.Filter({
				filterFn: function(item, record){
					return item.get('city') === SeaGrant_Proto.location;
				},
				root: 'data'
			});
			store.clearFilter(); // this is the fix
			store.filter(locationfilter); //now it works
		}else{
			store.clearFilter();
		}
		if(SeaGrant_Proto.product !== 'Please choose a product'){
			// console.log('IN PROD FILTER');
			var prodFilter = new Ext.util.Filter({
				filterFn: function(item, record){
					for(b = 0; b < item.data.products.length; b++){ // cycles through the vendor's products
						// console.log(b+'  '+item.data.products[b].name);
						if(item.data.products[b].name === SeaGrant_Proto.product){ // returns true for vendors with selected product
							return item.data.products[b].name === SeaGrant_Proto.product;
						}
					}				
				},
				root: 'data'
			});
			store.filter(prodFilter);
		}
		
		// THIS FINDS THE NUMBER OF VENDORS AFTER THE SORT
		// NEEDED TO SET MAP MARKERS IN ONGOBUTTONCOMMAND
		SeaGrant_Proto.Litem = new Array();
		SeaGrant_Proto.VstoreLength = store.data.items.length;
		for (j = 0; j < store.data.items.length; j++){
			SeaGrant_Proto.Litem[j] = store.data.items[j].data;			
			// console.log(SeaGrant_Proto.Litem[j]);
		}
		var vendcount;
		// console.log('vendcount:');
		// console.log(vendcount);
		var homeView = this.getHomeView();
		var crud = homeView.getComponent('vendnum'); // gets our display item in from the home page
		// console.log(store);
		// console.log(store[F].data.length);
		// This defines how the tpl data is printed out given the drop down table states
		if ((SeaGrant_Proto.location !== 'Please choose a location') || (SeaGrant_Proto.product !== 'Please choose a product')){
			if(SeaGrant_Proto.location === 'Please choose a location'){
					vendcount = {
						th: 'There are ',
						numItems: store.getCount(),
						v: ' vendors ',
						w: ' with ',
						prod: SeaGrant_Proto.product,
						end: '.'			
					};
			}else{
				if (SeaGrant_Proto.product !== 'Please choose a product'){
					// console.log('Prod ok');
					vendcount = {
						th: 'There are ',
						numItems: store.getCount(),
						v: ' vendors ',
						i: 'in ',
						loc: SeaGrant_Proto.location,
						w: ' with ',
						prod: SeaGrant_Proto.product,
						end: '.'			
					};
				}else{
					// console.log('Prod is horid');
					vendcount = {
						th: 'There are ',
						numItems: store.getCount(),
						v: ' vendors ',
						i: 'in ',
						loc: SeaGrant_Proto.location,
						end: '.'			
					};
				}
			}			
		}
		console.log('vendcount2:');
		console.log(vendcount);
		crud.setData(vendcount); // needed to display tpl data on home view
		Ext.Viewport.setActiveItem(homeView);
	},
	onChooseProduct: function(index, record){
		// We first check to see if a location is chosen, if one is we sort by locataion,
		// then we check to see if a product is chosen, if one is we sort by product
		console.log('In controller(home): Drop Down list Products');
		// console.log(record);
		console.log('Product is: '+ record._value.data.name); 
		SeaGrant_Proto.product = record._value.data.name;
		var store = Ext.data.StoreManager.lookup('Vendor');
		// console.log(store.data.all);
		var len = store.data.all.length;
		if(SeaGrant_Proto.location != 'Please choose a location'){
			// console.log('IN LOC FILTER');
			var locationfilter = new Ext.util.Filter({
				filterFn: function(item, record){
					return item.get('city') === SeaGrant_Proto.location;
				},
				root: 'data'
			});
			store.clearFilter();
			store.filter(locationfilter);
		} else{
			store.clearFilter();
		}
		if(SeaGrant_Proto.product != 'Please choose a product'){
			var prodFilter = new Ext.util.Filter({
				filterFn: function(item, record){
					for(b = 0; b < item.data.products.length; b++){ // cycles through the vendor's products
						// console.log(b+'  '+item.data.products[b].name);
						if(item.data.products[b].name === SeaGrant_Proto.product){ // returns true for vendors with selected product
							return item.data.products[b].name === SeaGrant_Proto.product;
						}
					}				
				},
				root: 'data'
			});		
			store.filter(prodFilter);
		}

		// THIS FINDS THE NUMBER OF VENDORS AFTER THE SORT
		// NEEDED TO SET MAP MARKERS IN ONGOBUTTONCOMMAND
		SeaGrant_Proto.Litem = new Array();
		SeaGrant_Proto.VstoreLength = store.data.items.length;
		for (j = 0; j < store.data.items.length; j++){
			SeaGrant_Proto.Litem[j] = store.data.items[j].data;			
			// console.log(SeaGrant_Proto.Litem[j]);
		}

		var homeView = this.getHomeView();
		var crud = homeView.getComponent('vendnum'); // gets our display item in from the home page
		var vendcount;
		// This defines how the tpl data is printed out given the drop down table states
		if ((SeaGrant_Proto.location !== 'Please choose a location') || (SeaGrant_Proto.product !== 'Please choose a product')){
			if(SeaGrant_Proto.product === 'Please choose a product'){
					vendcount = {
						th: 'There are ',
						numItems: store.getCount(),
						v: ' vendors ',
						i: 'in ',
						loc: SeaGrant_Proto.location,
						end: '.'			
					};
			}else{
				if(SeaGrant_Proto.location !== 'Please choose a location'){
					console.log('Prod ok');
					vendcount = {
						th: 'There are ',
						numItems: store.getCount(),
						v: ' vendors ',
						i: 'in ',
						loc: SeaGrant_Proto.location,
						w: ' with ',
						prod: SeaGrant_Proto.product,
						end: '.'			
					};
				}else{
					console.log('Prod is horid');
					vendcount = {
						th: 'There are ',
						numItems: store.getCount(),
						v: ' vendors ',
						w: ' with ',
						prod: SeaGrant_Proto.product,
						end: '.'			
					};
				}
			}
			
		}
		crud.setData(vendcount); // needed to display tpl data on home view
		Ext.Viewport.setActiveItem(homeView);
	},	
	onSortByVendorCommand: function(){
		console.log('In controller(home): Vendor checkbox');
	},
	onSortByProductCommand: function(){
		console.log('In controller(home): Product checkbox');
	},
	onViewGoCommand: function(){
		console.log('In controller(home): Go to List Page Button');
		// TRYING TO RECENTER THE MAP ON LOAD OF LIST PAGE
		// This WORKS to get a map centered at the correct location!!
		// NOTE: THIS IS WHAT I FIRST THOUGHT THE APP WAS DOING: 
		// "Note: that it doesn't work on the first press of the go button because gMap is not defined untill the 
		// SeaGrantMap xtype is called in the list view."
		// WHAT I REALLY NEED TO DO TO FIX IT WAS: make the timeout longer, so 
		// I changed it from 100 to 1000.
		// console.log('In Our wonderful Controller Go button function:');
		// console.log(SeaGrant_Proto);
		// THIS DYNAMICLY LOADS THE MAP MARKERS
		var lat;
		var lng;
		var infowindow = new google.maps.InfoWindow();
		SeaGrant_Proto.marker = new Array();
		SeaGrant_Proto.cent = new Array();
		for (k = 0; k < SeaGrant_Proto.VstoreLength; k++){
			// NOTE: I swapped the lat and long for now because they were swapped in the api 
			// (this is for testing purposes, so that I get correct lat/longs for google maps)
			lat = SeaGrant_Proto.Litem[k].lng;
			console.log(lat);
			lng = SeaGrant_Proto.Litem[k].lat;
			console.log(lng);
			SeaGrant_Proto.cent[k] = new google.maps.LatLng(lat, lng);

			//THIS IS THE BLOCK OF CODE THAT USES THE MARKER AS AN ARRAY
			// THIS FUNCTION CREATES EACH LIST ITEM MARKER
			SeaGrant_Proto.marker[k] = new google.maps.Marker({
				map: SeaGrant_Proto.gMap,
				animation: google.maps.Animation.DROP,
				position: SeaGrant_Proto.cent[k],
				clickable: true
			});
			// THIS FUNCTION ADDS A CLICKABLE MARKER INFO WINDOW FOR EACH SPECIFIC MARKER
			SeaGrant_Proto.marker[k].info = new google.maps.InfoWindow({
        		content: SeaGrant_Proto.Litem[k].name
        	});
        	// NOW WE ADD AN ON CLICK EVENT LISTENER TO EACH MARKER
        	// WE WILL USE THIS LITENER TO OPEN THE SPECIFIC MARKER INFO THAT WAS CLICKED
        	console.log('This is the marker: (1)');
			console.log(SeaGrant_Proto.marker[k]);
        	google.maps.event.addListener(SeaGrant_Proto.marker[k], 'click', function(){
        		// console.log(this.info.content);
        		infowindow.setContent(this.info.content); // this makes it so that only one info window is displayed at one time
        		infowindow.open(SeaGrant_Proto.gMap, this);
        	});
		}
		setTimeout(function() {
           SeaGrant_Proto.gMap.panTo(SeaGrant_Proto.cent[0]);

           // SeaGrant_Proto.gMap.setZoom(14);
        }, 1000);
        Ext.Viewport.animateActiveItem(this.getListView(), this.slideLeftTransition);
	},
	// Functions dealing with 
	// LIST
	// stuff	######################################################################################	LIST
	onViewBackHomeCommand: function(){
		console.log('In controller(list): Back to Home Page Button');
		// This removes the old markers from the map on the list page
		for(i = 0; i < SeaGrant_Proto.marker.length; i++){
			SeaGrant_Proto.marker[i].setMap(null);
		}
		SeaGrant_Proto.marker.length = 0;
		Ext.Viewport.animateActiveItem(this.getHomeView(), this.slideRightTransition);
	},
	onViewDetailCommand: function(){
		console.log('In controller(list): View Detail Page Button');
		Ext.Viewport.animateActiveItem(this.getDetailView(), this.slideLeftTransition);
	},	
	onViewLpageListItemCommand: function(record, list, index){
		console.log('In controller(list): Select list item');
		// Ext.Msg.alert(index.data.name, 'This is the selected list item.');
		var detailView = this.getDetailView();
		detailView.getAt(1).setData(index.getData());
		Ext.ComponentQuery.query('toolbar[itemId=detailPageToolbar]')[0].setTitle(index.data.name);
		// console.log(index.data.name);
		// var store = Ext.data.StoreManager.lookup('Vendor');
		// console.log('This is the store.');
		// console.log(index.getData());
		// var productfilter = new Ext.util.Filter({
		// 	filterFn: function(item, record){
		// 		return item.get('name') === index.data.name;
		// 	},
		// 	root: 'data'
		// });
		// // console.log(index.data.products[0].name);
		// console.log(index.data.products.name);
		// store.clearFilter();
		// store.filter(productfilter);
		// console.log(detailView);

		// Trying to pass product data from selected vendor to new store, so that we
		// can use the new store to correctly use tpl print to make selectable list 
		// items of each unique product.
				
		// Trying to find store so that we can add data to the new store.
		var storeInventory = Ext.data.StoreManager.lookup('VendorInventory');
		// console.log(stuff);
		// console.log('storeStuff Items: ');
		// console.log(storeStuff.data.items[0]);
		storeInventory.removeAll();
		// console.log(storeStuff.data.items);

		// Store is populated with items from selected vendor
		console.log(index.data.products.length);
		for(i = 0; i < index.data.products.length; i++){
			var newpro = {
				name: index.data.products[i].name, 
				preparation: index.data.products[i].preparation
			};
			// console.log('Name:');
			// console.log(index.data.products[i].name);
			// console.log('Prep:');
			// console.log(index.data.products[i].preparation);
			storeInventory.add(newpro);
		}
		// console.log('Final storeStuff items: ');
		// console.log(storeStuff.data.items); 


		Ext.Viewport.animateActiveItem(detailView, this.slideLeftTransition);
	},
	// Functions dealing with 
	// DETAIL
	// stuff	######################################################################################	DETAIL
	onViewBackListCommand: function(record, index){
		console.log('In controller(detail): Back to List Page Button');
		var store = Ext.data.StoreManager.lookup('Vendor');
		// console.log(record);
		// console.log(index);
		var len = store.data.all.length;
		if(SeaGrant_Proto.location != 'Please choose a location'){
			var locationfilter = new Ext.util.Filter({
				filterFn: function(item, record){
					return item.get('city') === SeaGrant_Proto.location;
				},
				root: 'data'
			});
			store.clearFilter(); // this is the fix
			store.filter(locationfilter); //now it works
		}else{
			store.clearFilter();
		}
		if(SeaGrant_Proto.product != 'Please choose a product'){
			var prodFilter = new Ext.util.Filter({
				filterFn: function(item, record){
					for(b = 0; b < item.data.products.length; b++){ // cycles through the vendor's products
						// console.log(b+'  '+item.data.products[b].name);
						if(item.data.products[b].name === SeaGrant_Proto.product){ // returns true for vendors with selected product
							return item.data.products[b].name === SeaGrant_Proto.product;
						}
					}				
				},
				root: 'data'
			});
			store.filter(prodFilter);
		}
		Ext.Viewport.animateActiveItem(this.getListView(), this.slideRightTransition);
	},
	onViewInfoCommand: function(){
		console.log('In controller(detail): View Info Page Button');
		Ext.Viewport.animateActiveItem(this.getInfoView(), this.slideLeftTransition);
	},	
	onViewDpageListItemCommand: function(record, list, index){
		console.log('In controller(detail): Select list item');
		// Ext.Msg.alert(index.data.name, 'This is the selected list item.');
		Ext.ComponentQuery.query('toolbar[itemId=infoPageToolbar]')[0].setTitle(index.data.name);
		Ext.Viewport.animateActiveItem(this.getInfoView(), this.slideLeftTransition);
	},
	// Functions dealing with 
	// INFO 
	// stuff	######################################################################################	INFO
	onViewBackDetailCommand: function(){
		console.log('In controller(info): Back to Detail Page Button');
		Ext.Viewport.animateActiveItem(this.getDetailView(), this.slideRightTransition);
	},
	onViewSpecificCommand: function(){
		console.log('In controller(info): View Specific Page Button');
		Ext.Viewport.animateActiveItem(this.getSpecificView(), this.slideLeftTransition);
	},	
	onViewIpageListItemCommand: function(record, list, index){
		console.log('In controller(info): Selected');
		// Ext.Msg.alert(index.data.listItem, 'This is the stuff I selected.');
		Ext.ComponentQuery.query('toolbar[itemId=specificPageToolbar]')[0].setTitle(index.data.listItem);
		Ext.Viewport.animateActiveItem(this.getSpecificView(), this.slideLeftTransition);
	},
	// Functions dealing with
	// SPECIFIC
	// stuff	######################################################################################	SPECIFIC
	onViewBackInfoCommand: function(){
		console.log('In controller(specific): Back to Info Page Button');
		Ext.Viewport.animateActiveItem(this.getInfoView(), this.slideRightTransition);
	},
	// Initialize functions
	launch: function(){
		this.callParent(arguments);
		console.log("launch");
	},
	init: function(){
		this.callParent(arguments);
		
		console.log("init");
	}
});