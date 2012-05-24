/**
 * Cancel button
 *
 */
Ext.define('Ext.ib.button.Cancel', {
    extend:'Ext.ib.button.Base',
    alias:'widget.cancelbutton',
    text:'cancel',
    addDefaultHandler:true,
    initComponent:function () {
        var me = this;

        if (me.addDefaultHandler && typeof(me.handler) == 'undefined') {
            me.handler = function () {
                Ext.History.back();
            }
        }

        this.callParent();
    },
    action:'cancel'
});