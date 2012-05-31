/**
 * download notification screen
 *
 */
Ext.define('Ext.ib.notify.Download', {
    extend:'Ext.ib.notify.Base',
    alias:'widget.downloadnotify',
    title:'download',
    autoHide:false,
    linkText:'notify.download_link',

    initComponent:function () {
        var me = this;

        me.linkText = me.translate(me.linkText);

        me.html = "<a href='" + me.response.result.data.file + "'>" + me.linkText + "</a>";

        this.callParent(arguments);
    }
});

