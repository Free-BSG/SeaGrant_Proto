Ext.define('SeaGrant_Proto.store.Product', {
	extend: 'Ext.data.Store',
	// requires: 'Ext.data.proxy.LocalStorage',
	// id: 'thisStuff',
	config: {
		model: 'SeaGrant_Proto.model.Products',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'http://seagrant-staging.osuosl.org/products',
			reader: {
				type: 'json',
				rootProperty: 'products'
			}
		}
	}
});
