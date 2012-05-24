/**
 * Send button
 *
 * Butten with default text send(translated) and the action send by using .vzs-button-icon-send in your css you can set the icon
 */
Ext.define('Ext.ib.button.Send', {
    /**
     * @cfg {String} [iconCls=vzs-button-icon-send] standard icon class
     */
    extend:'Ext.ib.button.Base',
    alias:'widget.sendbutton',
    text:'send',
    action:'send',
    formBind:true
});