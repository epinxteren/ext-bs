
Ext.define('App.view.dashboard.portlets.Browser', {
    extend:'Ext.ib.portlet.PortletControl',
    alias:'widget.portlet.Browser',
    text:translate('Browser'),

    popupItems:[{
        xtype:'FieldText',
        anchor:'100%',
        value:'http://www.ibuildings.nl',
        fieldLabel: 'Url'
    }],

    portletItems:[],

    onAttachPortlet:function(pupup, portlet){
        var FieldText =  pupup.down('FieldText');

        var portletHtml = Ext.String.format('<iframe src="{0}" style="width:100%; height: 100%;" frameborder="no"></iframe>', FieldText.value);

        portlet.html = portletHtml;

    }

});

