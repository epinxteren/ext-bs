Ext.define('App.view.artists.Index', {
    extend:'Ext.ib.component.AutoGrid',
    alias:'widget.artists.Index',
    title:'Artists Grid',


    hasInGridEditing:true,

    hasDeleteItems:true,
    hasEditItems:true,
    dispatch:"artists/",
    store:'Artists',

    closable:true,

    dockedItems:[
        {
            xtype:'AutoSearch',
            store:'Artists'
        },
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'addbutton',
                    handler:function () {
                        Ext.History.add('artists/add', true);
                    }
                }
            ]
        }
    ]
});