Ext.define('MyApp.store.StateStore', {
    extend: 'Ext.data.Store',
    alias: 'store.statestore',
 
    config: {
 
        data: [
            {
                id: 1,
                countryid: 1,
                name: 'Tamil Nadu'
            },
            {
                id: 2,
                countryid: 1,
                name: 'Mumbai'
            },
            {
                id: 3,
                countryid: 1,
                name: 'Delhi'
            },
            {
                id: 4,
                countryid: 2,
                name: 'Los Angles'
            },
            {
                id: 5,
                countryid: 2,
                name: 'San francisco'
            },
            {
                id: 6,
                countryid: 2,
                name: 'California'
            },
            {
                id: 7,
                countryid: 3,
                name: 'London'
            },
            {
                id: 8,
                countryid: 3,
                name: 'New York'
            }
        ],
 
        storeId: 'States',
 
        fields: [
            {
                name: 'id'
            },
            {
                name: 'countryid'
            },
            {
                name: 'name'
            }
        ]
    }
});