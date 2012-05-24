Ext.define('App.view.tracks.Create', {
    extend:'Ext.panel.Panel',
    alias:'widget.tracks.Create',
    flex:1,
    layout:{
        type:'hbox',
        align:'stretch'
    },
    items:[
        {
            titleField:'name',
            flex:1,
            addForm:true,
            xtype:'AutoForm',
            store:'Tracks'
        }
    ]
});