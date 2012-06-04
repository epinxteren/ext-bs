Ext.define('App.view.groups.Edit', {
    alias:'widget.groups.Edit',
    extend:'Ext.panel.Panel',
    flex:1,
    layout:{
        type:'hbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;
        me.items = [
            {
                loadItemId:me.itemId,
                flex:1,
                editForm:true,
                xtype:'AutoForm',
                store:'Groups'
            }
        ];
        me.callParent(arguments);
    }
});