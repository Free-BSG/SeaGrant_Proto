Ext.define('SeaGrant_Proto.store.Vendor', {
	extend: 'Ext.data.Store',
	config: {
		model: 'SeaGrant_Proto.model.Vendors',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			// need to use the SeaGrant_Proto.vendURL to set the url that the store uses to
			// load its data, so that when userlocation is enabled, then we can grab data 
			// from that specific api endpoint
			url: 'http://seagrant-staging.osuosl.org/1/vendors',
			reader: {
				type: 'json',
				rootProperty: 'vendors'
			}
		}
	}
});
