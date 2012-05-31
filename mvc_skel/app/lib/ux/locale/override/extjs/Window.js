/**
 * Created with JetBrains PhpStorm.
 * User: epinxteren
 * Date: 24-5-12
 * Time: 16:28
 * To change this template use File | Settings | File Templates.
 */



Ext.define('Ux.locale.override.extjs.Window', {
    override : 'Ext.window.Window',

    requires : [
        'Ux.locale.override.extjs.Component'
    ],


    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales,
            title       = locales.title,
            manager     = me.locale,
            defaultText = '',
            text;

        if (title) {
            if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }

            text = manager.get(title, defaultText);

            if (Ext.isString(text)) {
                me.setTitle(text);
            }
        }

        me.callOverridden(arguments);
    }
});