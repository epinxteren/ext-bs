/**
 * save notification screen
 *
 */
Ext.define('Ext.ib.notify.Send', {
    extend:'Ext.ib.notify.Base',
    alias:'widget.sendnotify',
    title:'send',

    initComponent:function () {
        var me = this;

        me.html = me.msg;

        this.callParent(arguments);
    }
});