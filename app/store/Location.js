Ext.define('SeaGrant_Proto.store.Location', {
	extend: 'Ext.data.Store',
	// requires: 'Ext.data.proxy.LocalStorage',
	// id: 'thisStuff',
	config: {
		model: 'SeaGrant_Proto.model.Locations',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			// url: 'newLocations.json',
			url: 'http://seagrant-staging-api.osuosl.org/1/locations',
			reader: {
				type: 'json',
				rootProperty: 'locations'
			}
		},
		data: [
			{
				name: 'Please choose a location',
				id: 0
			}
		]
	}
});