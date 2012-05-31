/**
 * @cfg Automaticly create's a popup and add's the portlet to a owner
 */
Ext.define('Ext.ib.portlet.PortletControl', {

    extend:'Ext.button.Button',

    alias:'widget.PortletControl',

    /**
     * @cfg {String) Portlet name
     */
    text:'',

    /**
     * @cfg {Object[]) Items that are needed to create a portlet
     */
    popupItems:[],

    /**
     * @cfg {Object[]) The items that needs to be in the portlet
     */
    portletItems:[],

    /**
     * @cfg {String/function/object} attachTo where the portlet will be added to
     */
    attachTo:undefined,

    /**
     * @event
     * onAttachPortlet triggers when the portlet needs to be attach owner
     */
    onAttachPortlet:undefined,


    /**
     * autoAttach When create the portlet will automaticly add to it's parent
     */
    autoAttach:false,

    initComponent:function () {
        var me = this;

        me.locales = {
            name:me.frameTitle,
            text:me.frameTitle,
            fieldLabel:me.frameTitle
        };

        me.callParent(arguments);

    },

    listeners:{
        boxready:function (me) {

           var owner = me.getAttachOwner();
           if (me.autoAttach)
           me.attachPortlet();
        }
    },

    /**
     * Button handler
     */
    handler:function () {
        var me = this;

        me.locales = {
            text:me.text
        };

        me.createPopup();
    },

    /**
     * createPopup for asking the client for any settings for the portlet, the items for the popup will be in {popupItems}
     */
    createPopup:function () {
        var me = this;

        if (this.popupItems.length != 0) {
            var popup = Ext.create("Ext.window.Window", {
                title:me.text,
                modal:true,
                closable:true,
                items:[
                    {
                        xtype:'form',
                        items:me.popupItems
                    }
                ],
                layout:'fit',
                buttons:[
                    {
                        formBind:true,
                        text:'ok',
                        handler:function () {
                            me.attachPortlet();
                        }
                    },
                    {
                        xtype:'cancelbutton',
                        handler:function () {
                            popup.close();
                        }
                    }
                ]
            });

            popup.show();

            this.popup = popup;

        } else {
            this.attachPortlet();
        }
    },

    /**
     * getAttachOwner get's the owner where to portlet will be attach to
     */
    getAttachOwner:function () {
        var me = this;

        if (Ext.isDefined(me.attachTo)) {
            if (Ext.isFunction(me.attachTo)) {
                return me.attachTo();
            } else if (Ext.isString(me.attachTo)) {
                return me.up(me.attachTo);
            } else {
                return me.attachTo;
            }
        }
    },

    attachPortlet:function () {
        var me = this;

        var window = this.up('window');

        var owner = me.getAttachOwner();
        if (Ext.isDefined(owner) || owner != null) {

            var portlet = owner.add({
                xtype:'Portlet',
                title:me.label,
                html:'',
                width:400,
                height:400,
                items:me.portletItems,
                locales:{
                    title:me.frameTitle
                }
            });

            portlet.setLocale(Ux.locale.Manager.getLanguage());

            if (Ext.isDefined(me.onAttachPortlet)) {
                var result = me.onAttachPortlet(this.popup, portlet, portlet.items.items);
                if (!Ext.isDefined(result) || result) {
                    portlet.show();
                } else {
                    return;
                }
            } else {
                portlet.show();
            }
        } else {
            Ext.error("Ext.ib.portlet.PortletControl, no attachTo is given");
        }

        if (Ext.isDefined(this.popup) && this.popup != null) {
            this.popup.close();
            this.popup = undefined;
        }
    }



});