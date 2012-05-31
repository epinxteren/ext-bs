
Ext.define('App.view.dashboard.portlets.TrackPieChart', {

    requires:['App.view.components.tracks.TrackPieChart'],

    extend:'Ext.ib.portlet.PortletControl',

    alias:'widget.portlet.TrackPieChart',

    frameTitle:"view.dashboard.portlets.TrackPieChart",

    popupItems:[{
        width:500,
        xtype:'FieldComboBox',
        //flex:1,
        store:'Albums',
        displayField:'title',
        valueField:'id'
    }],

    portletItems:[{
        flex:1,
        xtype:'components.TrackPieChart'
    }],

    onAttachPortlet:function(pupup, portlet,items){
        portlet.setWidth(600);

        var box = pupup.down('FieldComboBox');
        var valueId = box.getValue();
        if(!isNaN(valueId))
        {
            var pie = items[0];
            pie.setAlbumId(valueId);
        }else
        {
            return false;
        }
    }

});

