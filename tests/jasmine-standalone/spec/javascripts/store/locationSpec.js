describe('SeaGrant_Proto.store.Location',function() {

    var store;

    beforeEach(function() {
	jasmine.Ajax.install();
	store = Ext.create('SeaGrant_Proto.store.Location');
    });

    afterEach(function() {
	jasmine.Ajax.uninstall();
        store = null;
    });


    it('exists', function() {
        expect(store.$className).toEqual('SeaGrant_Proto.store.Location');
    });

    it('calls out to the proper url', function() {
	store.load();
	var request = jasmine.Ajax.requests.mostRecent();
	expect(request.url).toEqual('/newLocations.json');
    });

    it('loads data from an api', function(){
	store.load();
	var mockedRequest = jasmine.Ajax.requests.mostRecent();
	mockedRequest.response({
	    status: 200,
	    responseText:[
		{
		    title: 'Test',
		    text: 'New test stuff',
		    value: 1,
		    products: 'test prod',
		    Latlng: null,
		    id: 1,
		    address: 'new test address',
		    desc: 'test description'
		}
	    ]
        });
	expect(store.getCount()).toEqual(1);
	expect(store.getAt(0).get('title')).toEqual('Test');
	expect(store.getAt(0).get('text')).toEqual('New test stuff');
	expect(store.getAt(0).get('value')).toEqual(1);
	expect(store.getAt(0).get('products')).toEqual('test prod');
	expect(store.getAt(0).get('Latlng')).toEqual(null);
	expect(store.getAt(0).get('id')).toEqual(1);
	expect(store.getAt(0).get('address')).toEqual('new test address');
	expect(store.getAt(0).get('desc')).toEqual('test description');
    });

    it('loads multiple datas from an api', function(){
	store.load();
	var mockedRequest = jasmine.Ajax.requests.mostRecent();
	mockedRequest.response({
	    status: 200,
	    responseText:[
		{
		    title: 'Test',
		    text: 'New test stuff',
		    value: 1,
		    products: 'test prod',
		    Latlng: null,
		    id: 1,
		    address: 'new test address',
		    desc: 'test description'
		},
		{
		    title: 'Test',
		    text: 'New test stuff',
		    value: 1,
		    products: 'test prod',
		    Latlng: null,
		    id: 1,
		    address: 'new test address',
		    desc: 'test description'
		}
	    ]
        });
	expect(store.getCount()).toEqual(1);
	expect(store.getAt(0).get('title')).toEqual('Test');
	expect(store.getAt(0).get('text')).toEqual('New test stuff');
	expect(store.getAt(0).get('value')).toEqual(1);
	expect(store.getAt(0).get('products')).toEqual('test prod');
	expect(store.getAt(0).get('Latlng')).toEqual(null);
	expect(store.getAt(0).get('id')).toEqual(1);
	expect(store.getAt(0).get('address')).toEqual('new test address');
	expect(store.getAt(0).get('desc')).toEqual('test description');
	//data store 2
	expect(store.getCount()).toEqual(1);
	expect(store.getAt(0).get('title')).toEqual('Test');
	expect(store.getAt(0).get('text')).toEqual('New test stuff');
	expect(store.getAt(0).get('value')).toEqual(1);
	expect(store.getAt(0).get('products')).toEqual('test prod');
	expect(store.getAt(0).get('Latlng')).toEqual(null);
	expect(store.getAt(0).get('id')).toEqual(1);
	expect(store.getAt(0).get('address')).toEqual('new test address');
	expect(store.getAt(0).get('desc')).toEqual('test description');
    });

    it('automatically populates itself with API data', function() {

        pending(); // Feature not  yet implemented.

        store = Ext.create('SeaGrant_Proto.store.Location');
        //Let's test this with sample data.
        console.log(store);
        expect(store.data.length).toBeGreaterThan(0);
    });
});
