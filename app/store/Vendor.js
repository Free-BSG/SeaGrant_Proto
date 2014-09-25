Ext.define('SeaGrant_Proto.store.Vendor', {
	extend: 'Ext.data.Store',
	config: {
		model: 'SeaGrant_Proto.model.Vendors',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'http://seagrant-staging-api.osuosl.org/vendors',
			reader: {
				type: 'json',
				rootProperty: 'vendors'
			}
		}
	}
});
