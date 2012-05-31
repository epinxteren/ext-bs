Ext.define('Ux.locale.override.ux.RoutedController', {
    override : 'Ext.ux.app.RoutedController',


    render:function () {
        var me = this;
        me.callOverridden(arguments);
        Ux.locale.Manager.applyLocales();
    }


});
