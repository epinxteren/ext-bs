


Ext.define('App.controller.Groups', {
    extend: 'Ext.ib.controller.Base',
    views: [
        'groups.Index',
        'groups.Create',
        'groups.Edit'
    ],
    baseStores:["Groups"],
    stores:['Groups','Entities','Users','Rights'],
    models:['Group','Entitie','Users','Right']
});

