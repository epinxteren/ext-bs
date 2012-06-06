Ext.define('App.view.users.Create', {
    extend:'Ext.panel.Panel',
    alias:'widget.users.Create',
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
            store:'Users'
        }
     ]
});
