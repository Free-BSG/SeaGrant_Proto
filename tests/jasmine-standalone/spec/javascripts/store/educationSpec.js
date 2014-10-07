describe('SeaGrant_Proto.store.Education',function() {

    // Ext.require('SeaGrant_Proto.store.Distance');

    var store;
 
    beforeEach(function() {
	jasmine.Ajax.install();
	store = Ext.create('SeaGrant_Proto.store.Education');
    });

    afterEach(function() {
	jasmine.Ajax.uninstall();
        store = null;
    });

    it('exists', function() {
        expect(store.$className).toEqual('SeaGrant_Proto.store.Education');
    });

    it('Is populated with education data', function(){
        expect(store.data.items[0].data.text).toEqual('Ed item 1');
    });
});
