Ext.define('SeaGrant_Proto.model.Locations', {
    extend: 'Ext.data.Model',
    config: {
        fields:[
            'title',
            'text',
            'value',
            'products',
            'Latlng',
            'id',
            'name',
            'address',
            'desc'
        ]
    }
});