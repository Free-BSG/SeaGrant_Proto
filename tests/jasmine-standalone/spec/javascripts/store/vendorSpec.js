describe('SeaGrant_Proto.store.Vendor',function() {

    var store;
    
    beforeEach(function() {
	jasmine.Ajax.install();
	store = Ext.create('SeaGrant_Proto.store.Vendor');
    });

    afterEach(function() {
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
	expect(store.getAt(0).get('city')).toEqual('Newport');
	expect(store.getAt(0).get('updated')).toEqual(true);
	expect(store.getAt(0).get('description')).toEqual('a place with stuff');
	expect(store.getAt(0).get('zip')).toEqual('97523');
	expect(store.getAt(0).get('created')).toEqual(true);
	expect(store.getAt(0).get('ext')).toEqual(false);
	expect(store.getAt(0).get('location_description')).toEqual('its a place with a thing');
	expect(store.getAt(0).get('lng')).toEqual('45');
	expect(store.getAt(0).get('lat')).toEqual('45');
	expect(store.getAt(0).get('email')).toEqual('user@email.com');
	expect(store.getAt(0).get('website')).toEqual('site.com');
	expect(store.getAt(0).get('phone')).toEqual('555-555-5555');
	expect(store.getAt(0).get('state')).toEqual('OR');
	expect(store.getAt(0).get('street')).toEqual('corner street');
	expect(store.getAt(0).get('products')).toEqual(['fish', 'shellfish', 'more fish']);
	expect(store.getAt(0).get('contact_name')).toEqual('John Doe');
	expect(store.getAt(0).get('story')).toEqual('see other side');
	expect(store.getAt(0).get('name')).toEqual('fish place');
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
	expect(store.getAt(0).get('city')).toEqual('Newport');
	expect(store.getAt(0).get('updated')).toEqual(true);
	expect(store.getAt(0).get('description')).toEqual('a place with stuff');
	expect(store.getAt(0).get('zip')).toEqual('97523');
	expect(store.getAt(0).get('created')).toEqual(true);
	expect(store.getAt(0).get('ext')).toEqual(false);
	expect(store.getAt(0).get('location_description')).toEqual('its a place with a thing');
	expect(store.getAt(0).get('lng')).toEqual('45');
	expect(store.getAt(0).get('lat')).toEqual('45');
	expect(store.getAt(0).get('email')).toEqual('user@email.com');
	expect(store.getAt(0).get('website')).toEqual('site.com');
	expect(store.getAt(0).get('phone')).toEqual('555-555-5555');
	expect(store.getAt(0).get('state')).toEqual('OR');
	expect(store.getAt(0).get('street')).toEqual('corner street');
	expect(store.getAt(0).get('products')).toEqual(['fish', 'shellfish', 'more fish']);
	expect(store.getAt(0).get('contact_name')).toEqual('John Doe');
	expect(store.getAt(0).get('story')).toEqual('see other side');
	expect(store.getAt(0).get('name')).toEqual('fish place');
	//data store 2
	expect(store.getAt(1).get('city')).toEqual('Newport');
	expect(store.getAt(1).get('updated')).toEqual(true);
	expect(store.getAt(1).get('description')).toEqual('a place with stuff');
	expect(store.getAt(1).get('zip')).toEqual('97523');
	expect(store.getAt(1).get('created')).toEqual(true);
	expect(store.getAt(1).get('ext')).toEqual(false);
	expect(store.getAt(1).get('location_description')).toEqual('its a place with a thing');
	expect(store.getAt(1).get('lng')).toEqual('45');
	expect(store.getAt(1).get('lat')).toEqual('45');
	expect(store.getAt(1).get('email')).toEqual('user@email.com');
	expect(store.getAt(1).get('website')).toEqual('site.com');
	expect(store.getAt(1).get('phone')).toEqual('555-555-5555');
	expect(store.getAt(1).get('state')).toEqual('OR');
	expect(store.getAt(1).get('street')).toEqual('corner street');
	expect(store.getAt(1).get('products')).toEqual(['fish', 'shellfish', 'more fish']);
	expect(store.getAt(1).get('contact_name')).toEqual('John Doe');
	expect(store.getAt(1).get('story')).toEqual('see other side');
	expect(store.getAt(1).get('name')).toEqual('fish place');
    });

    it('automatically populates itself with API data', function() {

        pending(); //Feature not yet implemented.

        store = Ext.create('SeaGrant_Proto.store.Product');
        // This data will need to be stubbed or mocked.
        expect(store.data.length).toBeGreaterThan(0);
    });
});
