



Ext.define("App.store.Rights", {
    extend:'Ext.ib.Store',
    requires: 'App.model.Right',
    model:'App.model.Right',
    autoLoad:true,
    storeId:'Rights',

    data : [
        {id: 1, type: 'GET'},
        {id: 2, type: 'POST'},
        {id: 3, type: 'DELETE'}
    ]

});

