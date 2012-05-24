Ext.define('App.view.albums.Edit', {
    alias:'widget.albums.Edit',
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
                title:"Album",
                xtype:'AutoForm',
                store:'Albums'
            },
            {
                flex:1,
                xtype:'panel',
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[
                    {
                        filters:[{
                            property:"album",
                            value:me.itemId
                        }],
                        title:'Albums tracks',
                        xtype:'tracks.Index',
                        flex:1
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});