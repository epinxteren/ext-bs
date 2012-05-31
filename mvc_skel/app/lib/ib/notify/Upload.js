/**
 * save notification screen
 *
 */
Ext.define('Ext.ib.notify.Upload', {
    extend:'Ext.ib.notify.Base',
    alias:'widget.uploadnotify',
    title:'upload',
    fileField:'ref',

    initComponent:function () {
        var me = this;

        if (typeof(me.response.result) != 'undefined') {
            me.html = me.response.result[this.fileField] + this.translate('notify.was_succesfully_uploaded');
        } else {
            me.html = this.translate('notify.file_was_uploaded');
        }

        this.callParent(arguments);
    }
});