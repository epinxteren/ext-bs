Ext.define('App.view.tracks.Index', {
    extend:'Ext.ib.component.AutoGrid',
    alias:'widget.tracks.Index',

    title:'Tracks Grid',

    hasDeleteItems:true,
    hasEditItems:true,

    dispatch:"tracks/",

    titleField:'name',
    store:'Tracks',

    closable:true,

    dockedItems:[
        {
            xtype:'AutoSearch',
            store:'Tracks'
        },
        {
            xtype:'toolbar',
            dock:'top',
            items:[

                {
                    xtype:'addbutton',
                    handler:function () {
                        Ext.History.add('tracks/add', true);
                    }
                }
            ]
        }
    ]
});