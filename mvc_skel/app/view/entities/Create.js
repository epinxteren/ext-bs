Ext.define('App.view.entities.Create', {
    extend:'Ext.panel.Panel',
    alias:'widget.entities.Create',
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
            store:'Entities'
        }
     ]
});
