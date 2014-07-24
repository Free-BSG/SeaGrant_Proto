Ext.define('SeaGrant_Proto.view.Map', {
    extend: 'Ext.Container',
    requires: ['Ext.Map'],
    xtype: 'SeaGrantMap',
 
    config: {
        title: 'PlaygroundMap',
        layout: 'fit',
         mapOptions: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: new google.maps.LatLng(44, -121),
                    zoom: 14
                },
        items: [
            {
                xtype: 'map',
               
            }
        ]
    },
 
    initialize: function(){
        this.callParent(arguments);
        this.initMap();
    },
 
    initMap: function(){
 
        var mapPanel = this.down('map');
        var gMap = mapPanel.getMap();
 
        // var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
        // panoramioLayer.setMap(gMap);
 
        var marker = new google.maps.Marker({
            map: gMap,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(44, -121)
        });
 
    }
});