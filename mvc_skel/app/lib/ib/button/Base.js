/**
 * Base button
 *
 * Base button is the base class for custom buttons.
 * Its main function is to translate the button text when a translate function is available
 *
 * Will also add vzs-button-icon- + text to the icon class unless setIconClass is set to false
 */
Ext.define('Ext.ib.button.Base', {
    extend:'Ext.button.Button',
    /**
     * @cfg {String} [text=button]
     */
    text:'button',
    bindForm:true,
    iconCls:'',
    stateful:false,
    locales : {
        text : 'buttons.delete'
    },
    /**
     * @cfg {Boolean} [setIconCls=true] when this is set to false no extra icon class is added
     */
    setIconClass:true,
    initComponent:function () {
        var me = this;

        if (me.setIconClass) {
            me.iconCls = me.iconCls + ' ib-button-icon-' + me.text;
        }

        if (typeof(translate) == 'function') {
            me.text = translate(me.text);
        }

        this.callParent(arguments);
    }

});