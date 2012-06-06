Ext.define('App.view.users.Edit', {
    alias:'widget.users.Edit',
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
                store:'Users'
            },

            {
                closable:false,
                xtype:'groups.Index',
                hasEditPopupForm:true,

                mainFilters:[{
                    property:"id",
                    value:me.itemId
                }]
            }



        ];
        me.callParent(arguments);
    }
});