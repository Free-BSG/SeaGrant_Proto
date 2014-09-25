Ext.define('SeaGrant_Proto.store.Location', {
	extend: 'Ext.data.Store',
	// requires: 'Ext.data.proxy.LocalStorage',
	// id: 'thisStuff',
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