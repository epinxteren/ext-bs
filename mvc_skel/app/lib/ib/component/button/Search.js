/**
 * search button
 *
 */
Ext.define('Ext.ib.button.Search', {
    extend:'Ext.ib.button.Base',
    alias:'widget.searchbutton',
    text:'search',
    action:'search',
    locales : {
        text : 'buttons.search'
    },
    formBind:true
});