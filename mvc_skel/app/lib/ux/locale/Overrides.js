Ext.define('Ux.locale.Overrides', {});//No error by require

Ext.require([
    'Ux.locale.Manager',
    'Ux.locale.override.extjs.Button',
    'Ux.locale.override.extjs.Panel',
    'Ux.locale.override.extjs.Text',
    'Ux.locale.override.extjs.Component',
    'Ux.locale.override.extjs.FieldContainer',
    'Ux.locale.override.extjs.MenuItem',
    'Ux.locale.override.extjs.Window',
    'Ux.locale.override.extjs.Label',
    'Ux.locale.override.grid.GridColumn',
    'Ux.locale.override.ux.RoutedController'
], function() {
    Ux.locale.Manager.setConfig({
        ajaxConfig : {
            method : 'GET'
        },
        language   : Ib.config.language,
        tpl        : 'locales/{locale}.json',
        type       : 'ajax'
    });
});