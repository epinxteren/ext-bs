Ext.define('App.view.albums.Index', {
    extend:'Ext.ib.component.AutoGrid',
    alias:'widget.albums.Index',


    hasInGridEditing:true,

    hasDeleteItems:true,
    hasEditItems:true,

    dispatch:"albums/",

    store:'Albums',



    closable:true,

    dockedItems:[
        {
            xtype:'AutoSearch',
            store:'Albums'
        },
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'addbutton',
                    handler:function () {
                        Ext.History.add('albums/add', true);
                    }
                }
            ]
        }
    ]
});