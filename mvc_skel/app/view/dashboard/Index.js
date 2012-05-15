Ext.define('App.view.dashboard.Index', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboard.Index',
    title:'Dashboard',
    html:'Dashboard items',

    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    text:'Add',
                    handler:function () {
                        //Ext.dispatch('artists/add');
                    }
                }
            ]
        }
    ]
});