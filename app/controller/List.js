var isPresent;
isPresent = true;


Ext.define('SeaGrant_Proto.controller.List', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.MessageBox', 'Ext.util.Geolocation', 'Ext.data.Connection'],
	alias: 'cont',
	config: {
		refs: {
			listback: 'listback',
			detailback: 'detailback',
			infoback: 'infoback',
			specificback: 'specificback',
			homeView: 'home',
			listView: 'listview', 
			detailView: 'detail',			
			infoView: 'info',
			specificView: 'specific'
		},
		control: {
			// listback: {
			// 	viewBackHomeCommand: 'onViewBackHomeCommand'
			// },
			// detailback: {
			// 	viewBackListCommand: 'onViewBackListCommand'
			// },
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
		},
		routes: {
			'listback': 'onViewBackHomeCommand',
			'detailback': 'onViewBackListCommand',
			'infoback': 'onViewBackDetailCommand',
			'specificback': 'onViewBackInfoCommand'
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
			
		}else{
			console.log('USER LOCATION IS TURNED OFF NOW!');
			console.log(watchID);
			navigator.geolocation.clearWatch(watchID);
		}
	},
	// This function may be unnecessary due to the fact that we set the distance in the callback function above
	onSetDistance: function(index, record){
		console.log("In controller(home): Distance from user chosen");
		// console.log(record._value.data.val);
		SeaGrant_Proto.dist = record._value.data.val;
	},
	onChooseLocation: function(index, record){
		// We first check to see if a location is chosen, if one is we sort by locataion,
		// then we check to see if a product is chosen, if one is we sort by product
		console.log('In controller(home): Drop Down list Location');
		// this.onLoadLocationStore();
		var key = 0;
		var LocStore = Ext.getStore('Location');
		if(key === 0){
			LocStore.insert(0, [
				{
					name: 'Please choose a location',
					id: 0
				}
			]);
			key = 1;
		}
		// changed  in order to check the locations for drop down menus
		console.log('Location is: '+ record._value.data.name); 
		SeaGrant_Proto.location = record._value.data.name;
		// console.log('Location is: '+ record._value.data.city); 
		// SeaGrant_Proto.location = record._value.data.city;
		// ALL FILTERS ONLY TAKE STRINGS, NONE WORK WITH VARABLES
		// THAT ARE SELECED USING DROP DOWN TABLES, EVEN TOSTRING()
		// FUNCTION WILL NOT WORK
		var store = Ext.data.StoreManager.lookup('Vendor');
		// var store = Ext.data.StoreManager.lookup('Vendor');
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
		console.log(store.data.items);
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
		var key = 0;
		var ProdStore = Ext.getStore('Product');
		if(key === 0){
			ProdStore.insert(0, [
				{
					name: 'Please choose a product',
					id: 0
				}
			]);
			key = 1;
		}
		// console.log(record);
		console.log('Product is: '+ record._value.data.name); 
		SeaGrant_Proto.product = record._value.data.name;
		var store = Ext.data.StoreManager.lookup('Vendor');
		// console.log(store.data.all);
		var len = store.data.all.length;
		// console.log(store);
		if(SeaGrant_Proto.location !== 'Please choose a location'){
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
		if(SeaGrant_Proto.product !== 'Please choose a product'){
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

		// NEEDED TO SET MAP MARKERS IN ONGOBUTTONCOMMAND
		SeaGrant_Proto.Litem = new Array();
		SeaGrant_Proto.VstoreLength = store.data.items.length;
		console.log(store.data.items);
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
		this.addMapMarkers();
		setTimeout(function() {
           SeaGrant_Proto.gMap.panTo(SeaGrant_Proto.cent[0]);
           		SeaGrant_Proto.gMap.fitBounds(SeaGrant_Proto.bounds);
           		// these statements make sure that our zoom is not to close or to far away from the marker
           		if(SeaGrant_Proto.gMap.getZoom() > 15){
					SeaGrant_Proto.gMap.setZoom(15);
				}
				if(SeaGrant_Proto.gMap.getZoom() < 6){
					SeaGrant_Proto.gMap.setZoom(6);
				}
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
		var listItems = this.getListView();
		listItems._items.items[2].deselect(listItems._items.items[2].selected.items[0]);		
		Ext.Viewport.animateActiveItem(this.getHomeView(), this.slideRightTransition);
	},
	onViewDetailCommand: function(){
		console.log('In controller(list): View Detail Page Button');
		Ext.Viewport.animateActiveItem(this.getDetailView(), this.slideLeftTransition);
	},		
	// declareMap markers and infowindows as well as functions for the listview map
	addMapMarkers: function(){
		var self = this; // important to get the correct data to the viewport
		SeaGrant_Proto.infoClickSelf = self;
		var lat;
		var lng;
		SeaGrant_Proto.infowindow = new google.maps.InfoWindow();
		SeaGrant_Proto.marker = new Array();
		SeaGrant_Proto.cent = new Array();
		SeaGrant_Proto.bounds = new google.maps.LatLngBounds();
		for (k = 0; k < SeaGrant_Proto.VstoreLength; k++){
			// NOTE: I swapped the lat and long for now because they were swapped in the api 
			lat = SeaGrant_Proto.Litem[k].lat;
			console.log(lat);
			lng = SeaGrant_Proto.Litem[k].lng;
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
        		content: '<button onclick=\"javascript:SeaGrant_Proto.infoClickSelf.onInfoWindowClick();\">'+ SeaGrant_Proto.Litem[k].name + '</button>',
        		data: SeaGrant_Proto.Litem[k],
        		Lpos: k // used to index and highlight the correct list item
        	});
        	// This gets the map bounds based on the markers
        	SeaGrant_Proto.bounds.extend(SeaGrant_Proto.marker[k].position);
        	// NOW WE ADD AN ON CLICK EVENT LISTENER TO EACH MARKER
        	// WE WILL USE THIS LISTENER TO OPEN THE SPECIFIC MARKER INFO THAT WAS CLICKED
        	google.maps.event.addListener(SeaGrant_Proto.marker[k], 'click', function(){
        		SeaGrant_Proto.storeItem = this;
        		// console.log('THIS IN THE EVENT LISTENER');
        		// console.log(this);
        		SeaGrant_Proto.infowindow.setContent(this.info.content); // this makes it so that only one info window is displayed at one time
        		SeaGrant_Proto.infowindow.open(SeaGrant_Proto.gMap, this); // this opens the infowindow defined above
        	});	
		}
	},
	onInfoWindowClick: function(record, list, index){
		var lv = SeaGrant_Proto.infoClickSelf.getListView();
		lv._items.items[2].select(SeaGrant_Proto.storeItem.info.Lpos); // selects the list item coresponding to the map marker
		// note, "self" is the key, if I use "this" it will not refrence the correct data
		// THIS USES THE SAME DETAIL PAGE DATA POPULATING CODE THAT THE ON CLICK LIST ITEM EVENT DOES
		SeaGrant_Proto.infoClickSelf.onViewLpageListItemCommand(this, SeaGrant_Proto.infoClickSelf, SeaGrant_Proto.storeItem.info);
	},		
	onViewLpageListItemCommand: function(record, list, index){
		console.log('In controller(list): Select list item');
		// Ext.Msg.alert(index.data.name, 'This is the selected list item.');
		var detailView = this.getDetailView();
		var lv = this.getListView();
		detailView.getAt(1).setData(index.data);
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
		// THIS LOOP OPENS THE INFO PIN THAT CORESPONDS WITH THE SELETED LIST ITEM
		for(i = 0; i < SeaGrant_Proto.marker.length; i++){
			if(SeaGrant_Proto.marker[i].info.data.id === index.data.id){
				SeaGrant_Proto.infowindow.setContent(SeaGrant_Proto.marker[i].info.content); // sets the infowindow that coresponds to the selected list
		        SeaGrant_Proto.infowindow.open(SeaGrant_Proto.gMap, SeaGrant_Proto.marker[i]); // this opens the infowindow defined above
		    }
		}
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
		// This will get rid of the selection when we navigate back to the detail page
		var infoItems = this.getInfoView();
		infoItems._items.items[1].deselect(infoItems._items.items[1].selected.items[0]);
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
		// console.log(index.data.listItem);
		// Here is where we set the specific data using case statements to see which list item was chosen
		// and what data needs to be displayed on the specifics page

		// load the story store with the correct data for the selected item
		var StoryStore = Ext.getStore('Story');
		console.log(StoryStore.data.items[0].data);

		switch(index.data.listItem){
			case "Preparation":
				// Make an api call for the stories/1/preparing 
				// use tpl to print out the prepataion text/data
				break;
			case "Season":
				break;
			case "Price":
				break;
			case "History":
				// Now we want to make an api call for the stories/1/images
				console.log("History api call made");
				// Ext.Ajax.request({
					
				// 	url: 'http://seagrant-staging-api.osuosl.org/1/stories/1',
				// 	// extraPrams: {
				// 	// 	model: 'SeaGrant_Proto.model.Stories',
				// 	// 	reader: {
				// 	// 		type: 'json'
				// 	// 		// rootProperty: 'vendors'
				// 	// 	}
				// 	// },
					
					
				// 	// params:{
				// 	// 	id: 1
				// 	// },
				// 	success: function(response){
				// 		SeaGrant_Proto.text = response.responseText;
				// 		console.log(SeaGrant_Proto.text);
					
				// 	}
				// });
					var specificView = this.getSpecificView();
					// var hist = "http://seagrant-staging-api.osuosl.org/1/stories/1";
					// console.log(hist);
					// Then we show the image
					console.log("Now you see the image");
					// Use link to obtain the image, then display the image
					//"hist.images.link"
					// var image = {
					// 	// im: StoryStore.data.items[0].data.images[1].link
					// 	im: 'https://images.search.yahoo.com/images/view;_ylt=AwrTcXHtp4BURvQAPEmJzbkF;_ylu=X3oDMTIyZXY4ZmNzBHNlYwNzcgRzbGsDaW1nBG9pZAM0Yjc2ZGMzMjgwYzhmZTY3NGQyMjA4ZjcwMzU1NTcwYQRncG9zAzcEaXQDYmluZw--?.origin=&back=https%3A%2F%2Fimages.search.yahoo.com%2Fyhs%2Fsearch%3F_adv_prop%3Dimage%26va%3Dsmile%26fr%3Dyhs-mozilla-001%26hsimp%3Dyhs-001%26hspart%3Dmozilla%26tab%3Dorganic%26ri%3D7&w=693&h=693&imgurl=www.technodabble.com%2Fcssimg%2Fsmile.jpg&rurl=http%3A%2F%2Fwww.technodabble.com%2Fcssimg%2F&size=170.1KB&name=img+alt+%3Cb%3Esmile%3C%2Fb%3E+src+%3Cb%3Esmile%3C%2Fb%3E+jpg&p=smile&oid=4b76dc3280c8fe674d2208f70355570a&fr2=&fr=yhs-mozilla-001&tt=img+alt+%3Cb%3Esmile%3C%2Fb%3E+src+%3Cb%3Esmile%3C%2Fb%3E+jpg&b=0&ni=21&no=7&ts=&tab=organic&sigr=113d9msfq&sigb=144360p2c&sigi=115a15n4g&sigt=119pja3gl&sign=119pja3gl&.crumb=tfiwMKLaaGq&fr=yhs-mozilla-001&hsimp=yhs-001&hspart=mozilla'
					// };
					// console.log(image);
					// var SVimage = specificView.getComponent('image1');
					// SVimage.setData(image);
					// Finally we print the caption under the image
					console.log("Caption is included");
					// USE TPL
					// console.log(SeaGrant_Proto.text.images);
					var caption = {
						cap: StoryStore.data.items[0].data.images[1].caption
					};
					console.log(caption);
					
					var SVnow = specificView.getComponent('caption'); // gets our display item in from the specific page
					SVnow.setData(caption);
				break;
			case "Videos":
				break;

		}
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
		// var LocStore = Ext.getStore('Location');
		// LocStore.insert(1, [
		// 	{
		// 		city: 'Please choose a location',
		// 		id: 1
		// 	}
		// ]);
		console.log("launch");
	},
	init: function(){
		this.callParent(arguments);
		
		console.log("init");
	}
});