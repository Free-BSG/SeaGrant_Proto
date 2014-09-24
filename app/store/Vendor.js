Ext.define('SeaGrant_Proto.store.Vendor', {
	extend: 'Ext.data.Store',
	// requires: 'Ext.data.proxy.LocalStorage',
	// id: 'thisStuff',
	// storId: 'Vendor',
	config: {
		model: 'SeaGrant_Proto.model.Vendors',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'http://seagrant-staging.osuosl.org/vendors',
			reader: {
				type: 'json',
				rootProperty: 'vendors'
			}
		}
	}
});
