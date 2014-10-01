describe('SeaGrant_Proto.store.Product',function() {

    var store;

    beforeEach(function() {
        //Set up globals
         console.log('in before each function');
		jasmine.Ajax.install();
		console.log('Ajax is installed');
		store = Ext.create('SeaGrant_Proto.store.Product');
		console.log('store created');
        console.log(store);
    });

    afterEach(function() {
        //Take down globals

        //This looks like it should be leaky, check the sencha API for
        //something like the model.destroy() function.
		jasmine.Ajax.uninstall();
        store = null;
        console.log('store removed');
    });


    it('exists', function() {
    	 console.log('In exists function');
        console.log(store);
        expect(store.$className).toEqual('SeaGrant_Proto.store.Product');
    });

	it('calls out to the proper url', function() {
		store.load();
		var request = jasmine.Ajax.requests.mostRecent();
		expect(request.url).toEqual('/newProducts.json');
	});

	it('loads data from an api', function(){
		store.load();
		var mockedRequest = jasmine.Ajax.requests.mostRecent();
		mockedRequest.response({
			status: 200,
			responseText:[
			{
			origin: 'TEST',
            available: false,
            description: 'This product is merely conceptual in nature and cannot be purchased.',
            variety: 'testing',
            season: 'year-round',
            image: null,
            created: 'at testing time',
            modified: 'never',
            market_price: 0,
            link: null,
            alt_name: 'Pretend Product, Elaborate Ruse',
            story_id: null,
            name: 'Test Product Instance'
			}
		]
        });
		expect(store.getCount()).toEqual(1);
		expect(store.getAt(0).get('origin')).toEqual('TEST');
		expect(store.getAt(0).get('available')).toEqual(false);
		expect(store.getAt(0).get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
		expect(store.getAt(0).get('variety')).toEqual('testing');
		expect(store.getAt(0).get('season')).toEqual('year-round');
		expect(store.getAt(0).get('image')).toEqual(null);
		expect(store.getAt(0).get('created')).toEqual('at testing time');
		expect(store.getAt(0).get('modified')).toEqual('never');
		expect(store.getAt(0).get('market_price')).toEqual(0);
		expect(store.getAt(0).get('link')).toEqual(null);
		expect(store.getAt(0).get('name')).toEqual('Test Product Instance');
    });

	it('loads multiple datas from an api', function(){
		store.load();
		var mockedRequest = jasmine.Ajax.requests.mostRecent();
		mockedRequest.response({
			status: 200,
			responseText:[
			{
			origin: 'TEST',
            available: false,
            description: 'This product is merely conceptual in nature and cannot be purchased.',
            variety: 'testing',
            season: 'year-round',
            image: null,
            created: 'at testing time',
            modified: 'never',
            market_price: 0,
            link: null,
            alt_name: 'Pretend Product, Elaborate Ruse',
            story_id: null,
            name: 'Test Product Instance'
			},
			{
			origin: 'TEST',
            available: false,
            description: 'This product is merely conceptual in nature and cannot be purchased.',
            variety: 'testing',
            season: 'year-round',
            image: null,
            created: 'at testing time',
            modified: 'never',
            market_price: 0,
            link: null,
            alt_name: 'Pretend Product, Elaborate Ruse',
            story_id: null,
            name: 'Test Product Instance'
			}
		]
        });
		expect(store.getCount()).toEqual(2);
		expect(store.getAt(0).get('origin')).toEqual('TEST');
		expect(store.getAt(0).get('available')).toEqual(false);
		expect(store.getAt(0).get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
		expect(store.getAt(0).get('variety')).toEqual('testing');
		expect(store.getAt(0).get('season')).toEqual('year-round');
		expect(store.getAt(0).get('image')).toEqual(null);
		expect(store.getAt(0).get('created')).toEqual('at testing time');
		expect(store.getAt(0).get('modified')).toEqual('never');
		expect(store.getAt(0).get('market_price')).toEqual(0);
		expect(store.getAt(0).get('link')).toEqual(null);
		expect(store.getAt(0).get('name')).toEqual('Test Product Instance');
		//data store 2
		expect(store.getAt(1).get('origin')).toEqual('TEST');
		expect(store.getAt(1).get('available')).toEqual(false);
		expect(store.getAt(1).get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
		expect(store.getAt(1).get('variety')).toEqual('testing');
		expect(store.getAt(1).get('season')).toEqual('year-round');
		expect(store.getAt(1).get('image')).toEqual(null);
		expect(store.getAt(1).get('created')).toEqual('at testing time');
		expect(store.getAt(1).get('modified')).toEqual('never');
		expect(store.getAt(1).get('market_price')).toEqual(0);
		expect(store.getAt(1).get('link')).toEqual(null);
		expect(store.getAt(1).get('name')).toEqual('Test Product Instance');
    });

	//Currently not a feature, waiting on getting an api set up. Keeping test
	//as failure for a reminder.
    it('automatically populates itself with API data', function() {
        store = Ext.create('SeaGrant_Proto.store.Product');
        //Let's test this with sample data.
        expect(store.data.length).toBeGreaterThan(0);
    });
});
