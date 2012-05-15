Ext.define('App.view.albums.Index', {
    extend:'Ext.panel.Panel',
    alias:'widget.albums.Index',
    title:'Albums Grid',
    layout:{
        type:'hbox',
        align:'stretch'
    },
    initComponent:function () {
        var me = this;
        me.items = [
        {
            store:'Albums',
            title:'Albums',                
            xtype:'AutoGrid',
            onSelectionChange:function (model, records) {
                var form = this.next("panel").down('form');
                if (records[0]) {
                    form.setDisabled(false);
                    form.loadRecord(records[0]);
                }
            }
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
                    flex:1,

                    remove:true,
                    disabled:true,
                    title:"Album",
                    xtype:'AutoForm',
                    store:'Albums'
                },
                {
                    deleteItems:true,
                    editItems:true,
                    addItems:true,
                    test:"TESTING",
                    xtype:'AutoGrid',
                    store:'Tracks'
                }
            ]
        }
        ];
        me.callParent(arguments);
    },

    closable:true,

    dockedItems:[
    {
        xtype:'toolbar',
        dock:'top',
        items:[
        {
            text:'Add',
            handler:function () {
                Ext.History.add('albums/add', true);
            }
        }
        ]
    }
    ]
});