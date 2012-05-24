Ext.define('App.view.artists.Edit', {
    alias: 'widget.artists.Edit',
    title: 'Edit artist',
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
                store:'Artists',
                titleField:'name'
            }
        ];
        me.callParent(arguments);
    }
});