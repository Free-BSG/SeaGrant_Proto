describe('SeaGrant_Proto.store.Vendor',function() {

    var store;
 
    beforeEach(function() {
        //Set up globals
		jasmine.Ajax.install();
		store = Ext.create('SeaGrant_Proto.store.Vendor');
    });

    afterEach(function() {
        //Take down globals

        //This looks like it should be leaky, check the sencha API for
        //something like the model.destroy() function.
		jasmine.Ajax.uninstall();
        store = null;
    });


    it('exists', function() {
        expect(store.$className).toEqual('SeaGrant_Proto.store.Vendor');
    });

	it('calls out to the proper url', function() {
		store.load();
		var request = jasmine.Ajax.requests.mostRecent();
		expect(request.url).toEqual('/newVendors.json');
	});

	it('loads data from an api', function(){
		store.load();
		var mockedRequest = jasmine.Ajax.requests.mostRecent();
		mockedRequest.response({
			status: 200,
			responseText:[
			{
			city: 'Newport',
			updated: true,
			description: 'a place with stuff',
			zip: '97523',
			created: true,
			ext: false,
			location_description: 'its a place with a thing',
			lng: '45',
			lat: '45',
			email: 'user@email.com',
			website: 'site.com',
			phone: '555-555-5555',
			state: 'OR',
			street: 'corner street',
			products: ['fish', 'shellfish', 'more fish'],
			contact_name: 'John Doe',
			story: 'see other side',
			name: 'fish place'
			}
		]
        });
		expect(store.getCount()).toEqual(1);
		expect(model.getAt(0).get('city')).toEqual('Newport');
		expect(model.getAt(0).get('updated')).toEqual(true);
		expect(model.getAt(0).get('description')).toEqual('a place with stuff');
		expect(model.getAt(0).get('zip')).toEqual('97523');
		expect(model.getAt(0).get('created')).toEqual(true);
		expect(model.getAt(0).get('ext')).toEqual(false);
		expect(model.getAt(0).get('location_description')).toEqual('its a place with a thing');
		expect(model.getAt(0).get('lng')).toEqual('45');
		expect(model.getAt(0).get('lat')).toEqual('45');
		expect(model.getAt(0).get('email')).toEqual('user@email.com');
		expect(model.getAt(0).get('website')).toEqual('site.com');
		expect(model.getAt(0).get('phone')).toEqual('555-555-5555');
		expect(model.getAt(0).get('state')).toEqual('OR');
		expect(model.getAt(0).get('street')).toEqual('corner street');
		expect(model.getAt(0).get('products')).toEqual(['fish', 'shellfish', 'more fish']);
		expect(model.getAt(0).get('contact_name')).toEqual('John Doe');
		expect(model.getAt(0).get('story')).toEqual('see other side');
		expect(model.getAt(0).get('name')).toEqual('fish place');
    });

	it('loads multiple datas from an api', function(){
		store.load();
		var mockedRequest = jasmine.Ajax.requests.mostRecent();
		mockedRequest.response({
			status: 200,
			responseText:[
			{
			city: 'Newport',
			updated: true,
			description: 'a place with stuff',
			zip: '97523',
			created: true,
			ext: false,
			location_description: 'its a place with a thing',
			lng: '45',
			lat: '45',
			email: 'user@email.com',
			website: 'site.com',
			phone: '555-555-5555',
			state: 'OR',
			street: 'corner street',
			products: ['fish', 'shellfish', 'more fish'],
			contact_name: 'John Doe',
			story: 'see other side',
			name: 'fish place'
			},
			{
			city: 'Newport',
			updated: true,
			description: 'a place with stuff',
			zip: '97523',
			created: true,
			ext: false,
			location_description: 'its a place with a thing',
			lng: '45',
			lat: '45',
			email: 'user@email.com',
			website: 'site.com',
			phone: '555-555-5555',
			state: 'OR',
			street: 'corner street',
			products: ['fish', 'shellfish', 'more fish'],
			contact_name: 'John Doe',
			story: 'see other side',
			name: 'fish place'
			}
		]
        });
		expect(store.getCount()).toEqual(2);
		expect(model.getAt(0).get('city')).toEqual('Newport');
		expect(model.getAt(0).get('updated')).toEqual(true);
		expect(model.getAt(0).get('description')).toEqual('a place with stuff');
		expect(model.getAt(0).get('zip')).toEqual('97523');
		expect(model.getAt(0).get('created')).toEqual(true);
		expect(model.getAt(0).get('ext')).toEqual(false);
		expect(model.getAt(0).get('location_description')).toEqual('its a place with a thing');
		expect(model.getAt(0).get('lng')).toEqual('45');
		expect(model.getAt(0).get('lat')).toEqual('45');
		expect(model.getAt(0).get('email')).toEqual('user@email.com');
		expect(model.getAt(0).get('website')).toEqual('site.com');
		expect(model.getAt(0).get('phone')).toEqual('555-555-5555');
		expect(model.getAt(0).get('state')).toEqual('OR');
		expect(model.getAt(0).get('street')).toEqual('corner street');
		expect(model.getAt(0).get('products')).toEqual(['fish', 'shellfish', 'more fish']);
		expect(model.getAt(0).get('contact_name')).toEqual('John Doe');
		expect(model.getAt(0).get('story')).toEqual('see other side');
		expect(model.getAt(0).get('name')).toEqual('fish place');
		//data store 2
		expect(model.getAt(1).get('city')).toEqual('Newport');
		expect(model.getAt(1).get('updated')).toEqual(true);
		expect(model.getAt(1).get('description')).toEqual('a place with stuff');
		expect(model.getAt(1).get('zip')).toEqual('97523');
		expect(model.getAt(1).get('created')).toEqual(true);
		expect(model.getAt(1).get('ext')).toEqual(false);
		expect(model.getAt(1).get('location_description')).toEqual('its a place with a thing');
		expect(model.getAt(1).get('lng')).toEqual('45');
		expect(model.getAt(1).get('lat')).toEqual('45');
		expect(model.getAt(1).get('email')).toEqual('user@email.com');
		expect(model.getAt(1).get('website')).toEqual('site.com');
		expect(model.getAt(1).get('phone')).toEqual('555-555-5555');
		expect(model.getAt(1).get('state')).toEqual('OR');
		expect(model.getAt(1).get('street')).toEqual('corner street');
		expect(model.getAt(1).get('products')).toEqual(['fish', 'shellfish', 'more fish']);
		expect(model.getAt(1).get('contact_name')).toEqual('John Doe');
		expect(model.getAt(1).get('story')).toEqual('see other side');
		expect(model.getAt(1).get('name')).toEqual('fish place');
    });

	//Currently not a feature, waiting on getting an api set up. Keeping test
	//as failure for a reminder.
    it('automatically populates itself with API data', function() {
        store = Ext.create('SeaGrant_Proto.store.Product');
        //Let's test this with sample data.
        expect(store.data.length).toBeGreaterThan(0);
    });
});
