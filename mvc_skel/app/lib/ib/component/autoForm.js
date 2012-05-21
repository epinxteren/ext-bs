/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.ib.component.AutoForm', {
    extend:'Ext.form.Panel',
    alias:'widget.AutoForm',

    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator',
        FieldCreator:'Ext.ib.mixin.FieldCreator'
    },

    layout:'anchor',



    hasDeleteItem:false,

    initComponent:function () {

        var me = this;

        var fields = [];

        me.modelForEach(function (field, index) {
            var form = field.ibOptions.form;

            me.createField(field, form);

            if (me.layout === 'anchor') {
                if (!Ext.isDefined(form.anchor))
                    form.anchor = '100%';
            }
            else if (!Ext.isDefined(form.flex))
                form.flex = 1;

            if (!Ext.isDefined(form.fieldLabel))
                form.fieldLabel = field.name;

            if (!Ext.isDefined(form.name))
                form.name = field.name;

            fields.push(form);

        }, {//pass filter, only show colloms
            ibOptions:{
                form:{
                }
            }
        });

        this.items = fields;

        me.initBarOptions();

        me.callParent(arguments);
    },


    initBarOptions:function () {
        var me = this;

        var topBar = [];


        var removeButton = {
            text:'Delete',
            handler:function () {
                var objForm = this.up('form').getForm();
                var record = objForm.getRecord();
                if (Ext.isDefined(record)) {

                    objForm.reset();
                    this.up('form').setDisabled(true);

                    var store = Ext.getStore(me.store);
                    store.remove(record);
                    store.sync();
                }
            }
        };

        if (me.hasDeleteItem)
            topBar = topBar.concat(topBar.length == 0 ? [removeButton] : ['-', removeButton]);

        /* bottom bar */
        ////////////////////////////////////////
        //Buttons
        ////////////////////////////////////////
        var bottomBar = [];


        var saveButton = {
            text:'Save',
            handler:function () {
                var objForm = this.up('form').getForm();
                if (objForm.isValid()) {
                    var record = objForm.getRecord();
                    objForm.updateRecord(record);
                    record.save();
                }
            }
        };

        bottomBar = bottomBar.concat(bottomBar.length == 0 ? [saveButton] : ['-', saveButton]);


        if (topBar.length != 0)
            me.tbar = topBar;

        me.bbar = bottomBar;
    }

});