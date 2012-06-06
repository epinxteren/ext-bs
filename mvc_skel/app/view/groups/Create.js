Ext.define('App.view.groups.Create', {
    extend:'Ext.panel.Panel',
    alias:'widget.groups.Create',
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
            store:'Groups'
        }
     ]
});
