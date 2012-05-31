
Ext.define('App.view.dashboard.portlets.Welcome', {

    extend:'Ext.ib.portlet.PortletControl',

    alias:'widget.portlet.Welcome',

    popupItems:[],

    frameTitle:"view.dashboard.portlets.welcome",


    portletItems:[{
        flex:1,
        xtype:'panel',
        html:'<div>Welkom!</div>'
    }]

});

