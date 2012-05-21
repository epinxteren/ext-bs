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

                hasDeleteItems:true,
                hasEditItems:true,


                dispatch:"albums/",

                store:'Albums',
                title:'Albums',
                xtype:'AutoGrid'
            }
            /*
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
             hasDeleteItems:true,
             hasEditItems:true,
             hasAddItems:true,
             test:"TESTING",
             xtype:'AutoGrid',
             store:'Tracks'
             }
             ]
             }*/
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
                },
                {
                    text:'Edit',
                    handler:function () {

                        //debugger;
                        //var grid  = this.down("AutoGrid");

                        //grid.AutoGrid(grid.performEdit);

                        //Ext.History.add('albums/edit', true);
                    }
                }
            ]
        }
    ]
});