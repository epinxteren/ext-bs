/**
 * Logo field
 */
Ext.define('Ext.ib.form.field.Logo', {
    extend:'Ext.form.field.Base',
    mixins:{
        labelable:'Ext.form.Labelable',
        field:'Ext.form.field.Field'
    },
    alias:'widget.logofield',
    /**
     * @cfg {String} [buttonText=upload] Text for the upload button
     */
    buttonText:'Upload',

    /**
     * @private
     * @cfg {Boolean} [makeEmpty=false] decides of we are emptying the field
     */
    makeEmpty:false,

    listeners : {
        change:{
            fn:function(object, newValue, oldValue,eOpts){this.afterChange(object, newValue, oldValue,eOpts)}
        }
    },

    /**
     * After Change set 2 timeouts that will update the layout one ofter halve a second and one
     * after a second just in case the file loaded slow
     * @param object
     * @param event
     */
    afterChange: function(object, newValue, oldValue,eOpts) {
        var t=setTimeout(function(){  object.up('panel').doLayout();},500);
        var t2=setTimeout(function(){  object.up('panel').doLayout();},1000);
    },

    fieldSubTpl:[ // note: {id} here is really {inputId}, but {cmpId} is available
        '<img id="{id}_image_container" src="{value}" style="max-height:200;max-width:200"><br/>',
        '<input id="{id}_delete" type="checkbox" ',
        '<tpl if="name">name="{name}delete" </tpl>/><label for="{id}_delete">Verwijder huidige logo</label><br/>',
        '<input id="{id}" type="hidden" ',
        '<tpl if="name">name="{name}" </tpl>',
        '<tpl if="size">size="{size}" </tpl>',
        '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
        'class="{fieldCls} {typeCls}" autocomplete="off" /><br/>',
        {
            compiled:true,
            disableFormats:true
        }
    ],

    setRawValue:function (value) {
        var me = this;
        value = Ext.value(value, '');
        me.rawValue = value;
        var imgEl = Ext.get(this.inputId + '_image_container');
        // Some Field subclasses may not render an inputEl
        if (me.inputEl) {
            me.inputEl.dom.value = value;
        }
        if (imgEl) {
            imgEl.dom.src = value;
        }
        return value;
    },

    // private
    onRender:function () {
        var me = this,
            fieldStyle = me.fieldStyle;

        me.onLabelableRender();

        /**
         * @property {Ext.Element} inputEl
         * The input Element for this Field. Only available after the field has been rendered.
         */
        me.addChildEls({ name:'inputEl', id:me.getInputId() });

        me.callParent(arguments);

        // Make the stored rawValue get set as the input element's value
        me.setRawValue(me.rawValue);

        if (me.readOnly) {
            me.setReadOnly(true);
        }
        if (me.disabled) {
            me.disable();
        }
        if (fieldStyle) {
            me.setFieldStyle(fieldStyle);
        }


        me.createButton();
        me.renderActiveError();
    },

    onDeleted:function (e, object) {
        this.makeEmpty = object.checked;
    },

    /**
     * @private
     * Creates the custom trigger Button component. The fileInput will be inserted into this.
     */
    createButton:function () {
        var me = this;
        me.button = Ext.widget('button', Ext.apply({
            ui:me.ui,
            action:'logouploadbutton',
            renderTo:me.bodyEl,
            text:me.buttonText,
            cls:Ext.baseCSSPrefix + 'form-file-btn',
            preventDefault:false,
            style:me.buttonOnly ? '' : 'margin-left:' + me.buttonMargin + 'px',
            handler:this.buttonClickHandler
        }, me.buttonConfig));
    },

    initEvents:function () {
        var me = this;
        var chkEl = Ext.get(this.inputId + '_delete');
        me.mon(chkEl, 'change', me.onDeleted, me);
        me.callParent();
    },

    buttonClickHandler:function (a, b) {

    },

    getRawValue:function () {
        var me = this;
        if (this.makeEmpty) {
            return null;
        }
        return me.callParent();
    }
});