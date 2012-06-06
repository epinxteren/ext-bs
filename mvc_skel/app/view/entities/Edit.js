Ext.define('App.view.entities.Edit', {
    alias:'widget.entities.Edit',
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
                store:'Entities'
            }
        ];
        me.callParent(arguments);
    }
});