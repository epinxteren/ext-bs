Ext.define('App.view.artists.Create', {
    extend:'Ext.panel.Panel',
    alias:'widget.artists.Create',
    flex:1,
    layout:{
        type:'hbox',
        align:'stretch'
    },
    items:[
        {
            flex:1,
            addForm:true,
            xtype:'AutoForm',
            store:'Artists',
            titleField:'name'
        }
    ]
});