Ext.define('Ux.locale.override.grid.GridColumn', {
    override : 'Ext.grid.column.Column',

    requires : [
        'Ux.locale.override.extjs.Component',
    ],

    initComponent:function () {
        var me = this;

        me.callOverridden(arguments);
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales,
            text        = locales.text,
            manager     = me.locale,
            defaultText = '';

        if (text) {
            if (Ext.isObject(text)) {
                defaultText = text.defaultText;
                text        = text.key;
            }

            if(defaultText === '')
                defaultText = text+" NOT_FOUND";


            text = manager.get(text, defaultText);

            if (Ext.isString(text)) {
                me.setFieldLabel(text);
            }
        }
        me.callOverridden(arguments);
    },

    setFieldLabel : function(text) {
       this.setText(text);

        return this;
    }
});
