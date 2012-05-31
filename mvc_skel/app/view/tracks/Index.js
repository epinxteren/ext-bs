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

    locales : {
        title : 'view.tracks.index.title'
    },

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

                        this.up("AutoGrid").editPopup('add');

                        //Ext.History.add('tracks/add', true);
                    }
                }
            ]
        }
    ]
});