Ext.define('App.view.tracks.Edit', {
    alias: 'widget.tracks.Edit',
    title: 'Edit track',
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
                store:'Tracks',
                titleField:'name'
            }
        ];
        me.callParent(arguments);
    }
});