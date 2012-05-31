/**
 * notification screen
 *
 */
Ext.define('Ext.ib.notify.Base', {
    requires:[
        'Ext.ux.window.Notification'
    ],
    extend:'Ext.ux.window.Notification',
    title:'information',
    position:'br',
    manager:'fullscreen',
    alias:'widget.basenotify',
    cls:'ux-notification-light',
    width:250,
    height:115,
    /**
     * @cfg {Boolean} [setIconClass:true] Should an automatic icon class be added
     */
    setIconClass:true,

    /**
     * @cfg {Boolean} [autoHide:true] Should the noteify hide itself
     */
    autoHide:true,
    /**
     * @cfg {Number} [autoHideDelay=3000] delay in miliseconds
     */
    autoHideDelay:3000,
    /**
     * @cfg {Object} [response=null] te be used when message need to show anything depedning on a request result
     */
    response:null,

    /**
     * Translates text if the translate function is available
     *
     * @param {String} text
     * @return (String} translated text or orginal text
     */
    translate:function (text) {
        return Ux.locale.Manager.get(text,text);
    },

    initComponent:function () {
        var me = this;

        if (me.setIconClass) {
            me.iconCls = me.iconCls + ' ux-notification-icon-' + me.title;
        }

        me.title = this.translate(me.title);

        this.callParent(arguments);
    }
});

