

Ext.define('App.controller.Entities', {
    extend: 'Ext.ib.controller.Base',
    views: [
        'entities.Index',
        'entities.Create',
        'entities.Edit'
    ],
    baseStores:["Entities"],
    stores:['Groups','Entities','Users','Rights'],
    models:['Group','Entitie','User','Right']
});

