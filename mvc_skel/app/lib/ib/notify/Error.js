/**
 * error notification screen
 *
 */
Ext.define('Ext.ib.notify.Error', {
    extend:'Ext.ib.notify.Base',
    alias:'widget.errornotify',
    title:'error',
    message:'fail',
    /**
     * @cfg {Number} [autoHideDelay=5000] delay in miliseconds
     */
    autoHideDelay:5000,
    initComponent:function () {
        var me = this;

        var msg = translate(me.message) + '<br><b>' + translate('with_error') + ':</b><br>';
        if (me.response != null) {
            if (typeof(me.response.error) != 'undefined') {
                msg = msg + me.response.error.status + ': ' + me.response.error.statusText;
            } else if (typeof(me.response.request) != 'undefined') {
                msg = msg + me.response.request.scope.reader.jsonData["message"];
            } else {
                msg = msg + me.response.response.status + ': ' + me.response.response.statusText;
            }
        } else {
            msg = msg + ' ' + translate('unknown');
        }

        me.html = msg;

        this.callParent(arguments);
    }
});

