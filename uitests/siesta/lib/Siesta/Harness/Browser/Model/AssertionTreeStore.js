/*

Siesta 2.0.8
Copyright(c) 2009-2014 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.Model.AssertionTreeStore', {
    extend          : 'Ext.data.TreeStore',

    model   : 'Siesta.Harness.Browser.Model.Assertion',

    mixins          : [
        'Sch.data.mixin.FilterableTreeStore'
    ],

    constructor     : function () {
        this.callParent(arguments)
        
        this.initTreeFiltering()
        
        this.nodeStore.setNode(this.getRootNode())
    },
    
    
    removeAll : function () {
//        slow
//        this.getRootNode().removeAll()
        
        var newRoot = this.setRootNode({
            id              : '__ROOT__',
            expanded        : true,
            loaded          : true
        })
        
        this.nodeStore.setNode(newRoot)
    },
    
    
    add : function (record) {
        this.getRootNode().appendChild(record)
    }
})