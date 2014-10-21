var isPresent;
isPresent = true;


Ext.define('SeaGrant_Proto.controller.List', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.MessageBox', 'Ext.device.Geolocation'],
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
				viewLpageListHighlightCommand: 'onViewLpageListHighlightCommand',
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
		console.log(record);
		if(record._component._value[0] === 1){
			// This updates the user's location and how far from their location they would like to search for vendors/products
			Ext.device.Geolocation.watchPosition({
			    frequency: 3000, // Update every 3 seconds
			    callback: function(position) {
			        console.log('Position updated!', position.coords);
			        // console.log(index._items.items[2]._value.data.val);
					var dist = index._items.items[2]._value.data.val;
			    },
			    failure: function() {
			        console.log('something went wrong!');
			    }
			});
			
		}else{
			Ext.device.Geolocation.clearWatch();
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
		// var loc = this.getHomeView();
		// console.log(record);
		SeaGrant_Proto.location = record._value.data.title;
		var store = Ext.data.StoreManager.lookup('Vendor');
		var pstore = Ext.data.StoreManager.lookup('ProductList');
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
			var view = this.getListView();
			view.down('list').setStore(pstore);
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
			// pstore is populated with items from selected vendor
			var countLen = 0;
			var flag = 0;
			var addVendor;
			var newNum = 0;
			pstore.removeAll();
			for(i = 0; i < store.data.items.length; i++){
				for(j = 0; j < store.data.items[i].data.products.length; j++){
					flag = 0;
					for(k = 0; k < pstore.data.length; k++){
						// check to see if product and prep already exist
						if((store.data.items[i].data.products[j].name === pstore.data.items[k].data.name) && (store.data.items[i].data.products[j].preparation === pstore.data.items[k].data.preparation)){
							addVendor = store.data.items[i].data.name;
							newNum = k;
							flag = 1;
						}					
					}
					// if prod/prep exist, add a new vendor to the vendors list
					if(flag === 1){
						pstore.data.items[newNum].data.vendors = addVendor;
					}
					// if the prod/prep DNE, then creat a new product from the current vendor as long as its name is same as chosen product name
					if((flag === 0) && (store.data.items[i].data.products[j].name === SeaGrant_Proto.product)){
						var newpro = {
							name: store.data.items[i].data.products[j].name, 
							preparation: store.data.items[i].data.products[j].preparation,
							vendors: store.data.items[i].data.name
						};
						pstore.add(newpro);
					}
				}
			}	
		}else{
			// console.log('vendor store set');
			var view = this.getListView();
			view.down('list').setStore(store);
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
		console.log(vendcount);
		var homeView = this.getHomeView();
		var crud = homeView.getComponent('vendnum'); // gets our display item in from the home page
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
		var pstore = Ext.data.StoreManager.lookup('ProductList');
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
		}else{
			
			store.clearFilter();
		}
		if(SeaGrant_Proto.product !== 'Please choose a product'){
			var view = this.getListView();
			view.down('list').setStore(pstore);
			var prodFilter = new Ext.util.Filter({
				filterFn: function(item, record){
					for(b = 0; b < item.data.products.length; b++){ // cycles through the vendor's products// console.log(b+'  '+item.data.products[b].name);
						if(item.data.products[b].name === SeaGrant_Proto.product){ // returns true for vendors with selected product
							return item.data.products[b].name === SeaGrant_Proto.product;
						}
					}				
				},
				root: 'data'
			});
			store.filter(prodFilter);
			// pstore is populated with items from selected vendor
			var countLen = 0;
			var flag = 0;
			var addVendor;
			var newNum = 0;
			pstore.removeAll();
			for(i = 0; i < store.data.items.length; i++){
				for(j = 0; j < store.data.items[i].data.products.length; j++){
					flag = 0;
					for(k = 0; k < pstore.data.length; k++){
						// check to see if product and prep already exist
						if((store.data.items[i].data.products[j].name === pstore.data.items[k].data.name) && (store.data.items[i].data.products[j].preparation === pstore.data.items[k].data.preparation)){
							addVendor = store.data.items[i].data.name;
							newNum = k;
							flag = 1;
						}					
					}
					// if prod/prep exist, add a new vendor to the vendors list
					if(flag === 1){
						pstore.data.items[newNum].data.vendors = addVendor;
					}
					// if the prod/prep DNE, then creat a new product from the current vendor as long as its name is same as chosen product name
					if((flag === 0) && (store.data.items[i].data.products[j].name === SeaGrant_Proto.product)){
						var newpro = {
							name: store.data.items[i].data.products[j].name, 
							preparation: store.data.items[i].data.products[j].preparation,
							vendors: store.data.items[i].data.name
						};
						pstore.add(newpro);
					}
				}
			}	
		}else{
			// console.log('vendor store set');
			var view = this.getListView();
			view.down('list').setStore(store);
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
		console.log('SeaGrant_Proto.tplStore');
		console.log(SeaGrant_Proto.tplStore);
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
			lat = SeaGrant_Proto.Litem[k].lat;
			// console.log(lat);
			lng = SeaGrant_Proto.Litem[k].lng;
			// console.log(lng);
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
	onViewLpageListHighlightCommand: function(record, list, index){
		// THIS LOOP OPENS THE INFO PIN THAT CORESPONDS WITH THE SELETED LIST ITEM
		for(i = 0; i < SeaGrant_Proto.marker.length; i++){
			if(SeaGrant_Proto.marker[i].info.data.id === index.id){
				SeaGrant_Proto.infowindow.setContent(SeaGrant_Proto.marker[i].info.content); // sets the infowindow that coresponds to the selected list
		        SeaGrant_Proto.infowindow.open(SeaGrant_Proto.gMap, SeaGrant_Proto.marker[i]); // this opens the infowindow defined above
		    }
		}
	},		
	onViewLpageListItemCommand: function(record, list, index){
		console.log('In controller(list): Select list item');
		// Ext.Msg.alert(index.data.name, 'This is the selected list item.');
		var detailView = this.getDetailView();
		var lv = this.getListView();
		detailView.getAt(1).setData(index.data);
		Ext.ComponentQuery.query('toolbar[itemId=detailPageToolbar]')[0].setTitle(index.data.name);
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
			if(SeaGrant_Proto.marker[i].info.data.id === index.id){
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
		// console.log("launch");
	},
	init: function(){
		this.callParent(arguments);
		// console.log("init");
	}
});