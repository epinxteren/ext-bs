Ext.define('App.view.tracks.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tracks.Index',
    title: 'Tracks',
    dockedItems: [],
    items:[
            
    {
        xtype:'autoGrid',
        store:'Tracks'
    }
            
    ]
});