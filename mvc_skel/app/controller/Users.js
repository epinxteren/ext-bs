


Ext.define('App.controller.Users', {
    extend: 'Ext.ib.controller.Base',
    views: [
        'users.Index',
        'users.Create',
        'users.Edit'
    ],
    baseStores:["Users"],
    stores:['Groups','Entities','Users','Rights'],
    models:['Group','Entitie','User','Right']
});

