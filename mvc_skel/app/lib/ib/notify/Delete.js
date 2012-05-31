/**
 * error notification screen
 *
 */
Ext.define('Ext.ib.notify.Delete', {
    extend:'Ext.ib.notify.Base',
    alias:'widget.deletenotify',
    title:'Delete',
    message:'fail',
    /**
     * @cfg {Number} [autoHideDelay=5000] delay in miliseconds
     */
    autoHideDelay:5000,
    initComponent:function () {
        var me = this;

        var msg = '';
        if (Ext.isEmpty(me.html)) {

            msg =  this.translate('notify.was_deleted');
            me.html = msg;
        }

        this.callParent(arguments);
    }
});

