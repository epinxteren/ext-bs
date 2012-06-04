Ext.define('App.view.groups.Index', {
    extend:'Ext.ib.component.AutoGrid',
    alias:'widget.groups.Index',

    hasDeleteItems:true,
    hasEditItems:true,
    hasAddItems:true,

    dispatch:"groups/",

    titleField:'name',
    store:'Groups',

    closable:true,

    locales : {
        title : 'view.groups.index.title'
    },

    dockedItems:[
        {
            xtype:'AutoSearch',
            store:'Groups'
        }
    ]
});