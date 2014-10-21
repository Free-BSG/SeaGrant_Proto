var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title       : 'Awesome Test Suite',

    preload     : [
        // NOTE: THESE FILES "MUST BE IN ORDER OF HOW THEY LOAD"
        // IF THEY ARE NOT IN THE CORRECT ORDER, THEY WON'T LOAD 
        // CORRECTLY AND YOUR TESTS WILL NOT WORK
        '../../touch/resources/css/sencha-touch.css',
        '../../resources/css/app.css',


        
        '../../touch/sencha-touch-all-debug.js',
        'http://maps.google.com/maps/api/js?sensor=true',
// Geolocation includes
        // '../touch/src/device/connection/Abstract.js',
        // '../touch/src/device/connection/Cordova.js',
        // '../touch/src/device/connection/Sencha.js',
        // '../touch/src/device/connection/Simulator.js',
        // '../touch/src/device/Connection.js',
        // Controller
        '../../app/controller/List.js',
        '../../touch/src/device/geolocation/Abstract.js',
        '../../touch/src/device/geolocation/Cordova.js',
        '../../touch/src/device/geolocation/Sencha.js',
        '../../touch/src/device/geolocation/Simulator.js',
        
        '../../touch/src/device/communicator/Android.js',
        '../../touch/src/device/communicator/Default.js',
        '../../touch/src/device/Communicator.js',
        '../../touch/src/device/Geolocation.js',
        // Views
        '../../app/view/Location.js',
        '../../app/view/Map.js',
        '../../app/view/ListView.js',
        '../../app/view/Info.js',
        '../../app/view/Specific.js',
        '../../app/view/Home.js',
        '../../app/view/Detail.js',
        '../../app/view/TestView.js',        
        // Stores
        '../../app/store/Info.js',
        '../../app/store/Location.js',
        '../../app/store/Product.js',
        '../../app/store/Vendor.js',
        '../../app/store/CountryStore.js',
        '../../app/store/VendorInventory.js',
        '../../app/store/Education.js',
        '../../app/store/Distance.js',
        '../../app/store/ProductList.js',
        // Models
        '../../app/model/Vendors.js',
        '../../app/model/Locations.js',
        '../../app/model/Products.js',
        '../../app/model/Test.js',
        '../../app/model/VendorInventories.js',
        '../../app/model/ProductLists.js',
        '../../app.js'
        // json files
        // '../newVendors.json',
        // '../newProducts.json',
        // '../newLocations.json',

    ]
});

Harness.start(
    {
        group : 'Sanity checks',
        autoCheckGlobals : false,
        items : [
            'sanity_tests/sane.t.js',
            'sanity_tests/010_sanity.t.js',
            'sanity_tests/HelloWorld.t.js',
            'sanity_tests/simple.t.js'
        ]
    },
    {
        group : 'UI checks',
        autoCheckGlobals : false,
        items : [
            'ui_tests/home_test.t.js',
            'ui_tests/detail_test.t.js',
            'ui_tests/list_test.t.js',
            'ui_tests/info_test.t.js',
            'ui_tests/specific_test.t.js'
        ]
    }
);
