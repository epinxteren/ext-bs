Ext.define('App.view.entities.Index', {
    extend:'Ext.ib.component.AutoGrid',
    alias:'widget.entities.Index',

    hasDeleteItems:true,
    hasEditItems:true,
    hasAddItems:true,

    dispatch:"entities/",

    titleField:'name',
    store:'Entities',

    closable:true,

    locales : {
        title : 'view.groups.index.title'
    },

    dockedItems:[
        {
            collapsed:true,
            xtype:'AutoSearch',
            store:'Entities'
        }
    ]
});