



Ext.define("App.store.Users", {
    extend:'Ext.ib.Store',
    requires: 'App.model.User',
    model:'App.model.User',
    autoLoad:true,
    storeId:'Users'
});

