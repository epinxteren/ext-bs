Ext.define('App.view.dashboard.Index', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboard.Index',


    locales : {
        title : 'view.dashboard.index.title'
    },

    requires:['App.view.dashboard.portlets.Browser',
              'App.view.dashboard.portlets.TrackPieChart',
              'App.view.dashboard.portlets.Welcome'],



    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'portlet.Browser',
                    attachTo:'panel'
                },
                {
                    xtype:'portlet.TrackPieChart',
                    attachTo:'panel'
                },
                {
                    xtype:'portlet.Welcome',
                    attachTo:'panel',
                    autoAttach:true
                }
            ]
        }
    ]
});