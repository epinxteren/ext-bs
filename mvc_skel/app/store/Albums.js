
Ext.define("App.store.Albums", {
    extend:'Ext.ib.Store',
    requires: 'App.model.Album',
    model:'App.model.Album',
    autoLoad:true,
    storeId:'Albums'
});

