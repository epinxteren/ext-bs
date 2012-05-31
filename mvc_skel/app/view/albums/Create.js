Ext.define('App.view.albums.Create', {
    extend:'Ext.panel.Panel',
    alias:'widget.albums.Create',
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
            store:'Albums'
        }
     ]
});
