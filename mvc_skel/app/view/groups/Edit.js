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
                        closable:false,
                        xtype:'entities.Index',
                        hasEditPopupForm:true,

                        mainFilters:[{
                            property:"group",
                            value:me.itemId
                        }]

                    },
                    {
                        closable:false,
                        xtype:'users.Index',
                        hasEditPopupForm:true,

                        mainFilters:[{
                            property:"group",
                            value:me.itemId
                        }]

                    }
                ]
            }
        ];

        me.callParent(arguments);
    }
});