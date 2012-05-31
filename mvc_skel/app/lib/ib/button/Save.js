/**
 * Save button
 *
 */
Ext.define('Ext.ib.button.Save', {
    extend:'Ext.ib.button.Base',
    alias:'widget.savebutton',
    text:'save',
    action:'save',
    locales : {
        text : 'buttons.save'
    },
    formBind:true
});