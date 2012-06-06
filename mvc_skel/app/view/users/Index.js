Ext.define('App.view.users.Index', {
    extend:'Ext.ib.component.AutoGrid',
    alias:'widget.users.Index',

    hasDeleteItems:true,
    hasEditItems:true,
    hasAddItems:true,

    dispatch:"users/",

    titleField:'name',
    store:'Users',

    closable:true,

    locales : {
        title : 'view.users.index.title'
    },

    dockedItems:[
        {
            collapsed:true,
            xtype:'AutoSearch',
            store:'Users'
        }
    ]
});