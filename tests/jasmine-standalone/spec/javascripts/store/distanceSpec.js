describe('SeaGrant_Proto.store.Distance',function() {

    // Ext.require('SeaGrant_Proto.store.Distance');

    var store;
 
    beforeEach(function() {
	jasmine.Ajax.install();
	store = Ext.create('SeaGrant_Proto.store.Distance');
    });

    afterEach(function() {
	jasmine.Ajax.uninstall();
        store = null;
    });

    it('exists', function() {
        expect(store.$className).toEqual('SeaGrant_Proto.store.Distance');
    });

    it('Is populated with distance data', function(){
        expect(store.data.items[0].data.val).toEqual(200);
    });
});
