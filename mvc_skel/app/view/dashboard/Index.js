Ext.define('App.view.dashboard.Index', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboard.Index',
    title:'Dashboard',
    requires:['App.view.dashboard.portlets.Browser',
              'App.view.dashboard.portlets.TrackPieChart'],
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
                }
            ]
        }
    ]
});