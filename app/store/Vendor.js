Ext.define('SeaGrant_Proto.store.Vendor', {
    extend: 'Ext.data.Store',
    config: {
	model: 'SeaGrant_Proto.model.Vendors',
	autoLoad: true,
	proxy: {
	    type: 'ajax',
	    url: 'http://seagrant-staging.osuosl.org/1/vendors',
	    noCache: false,
            pageParam: false,
            limitParam: false,
            startParam: false,
	    reader: {
		type: 'json',
		rootProperty: 'vendors'
	    }
	}
    }
});
