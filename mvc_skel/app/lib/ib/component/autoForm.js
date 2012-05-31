
/**
 * A AutoForm class, that can create a form from a model.
 *
 */
Ext.define('Ext.ib.component.AutoForm', {
    extend:'Ext.form.Panel',
    alias:'widget.AutoForm',

    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator',
        FieldCreator:'Ext.ib.mixin.FieldCreator',
        AutoName:'Ext.ib.mixin.ComponentAutoName'
    },

    layout:'anchor',

    /**
     * @cfg {Boolean=true} hasAutoTitle If this get's it's title form it's model
     */
    hasAutoTitle:true,

    /**
     * @cfg {Boolean} If this forum is a form that add's records to it's store
     */
    addForm:false,

    /**
     * @cfg {Boolean} If this form edit's a excisting model, decleard with {loadItemId}
     */
    editForm:false,

    /**
     * @cfg {Number=undefined} Automatic load this record when {editForm} is enabled and the record will be loaded into the form.
     */
    loadItemId:undefined,


    /**
     * @cgf {boolean} [hasDeleteItem=false] Add's a button to delete the record
     */
    hasDeleteItem:false,

    initComponent:function () {

        var me = this;

        var fields = [];

        var store = Ext.getStore(me.store);

        var model = store.model;


        me.modelForEach(function (field, index) {
            var form = field.ibOptions.form;
            var ibOptions = field.ibOptions;
            me.createField(field, form);

            if (me.layout === 'anchor') {
                if (!Ext.isDefined(form.anchor))
                    form.anchor = '100%';
            }
            else if (!Ext.isDefined(form.flex))
                form.flex = 1;

            form.fieldLabel = me.getLabelName(field,form);

            form.locales    = {
                fieldLabel : form.fieldLabel
            };

            if (!Ext.isDefined(form.name))
                form.name = field.name;

            fields.push(form);

        }, {//pass filter, only show colloms
            ibOptions:{
                form:{
                }
            }
        });

        var objModel = Ext.ModelManager.create({ }, store.model);
        fields.push(
            {
                xtype:'hiddenfield',
                name:objModel.idProperty,
                fieldLabel:objModel.idProperty
            });


        this.items = fields;

        me.initBarOptions();

        if(me.hasAutoTitle){

            if(this.editForm)
            this.initAutoLocal('edit','title');
            if(this.addForm)
            this.initAutoLocal('add','title');
        }


        me.initLisseners();

        me.callParent(arguments);
    },


    initLisseners:function () {
        var me = this;

        if (!Ext.isDefined(me.listeners))
        {
            me.listeners = {};
        }

        if (me.editForm) {
            me.listeners.afterrender = {
                fn:function () {
                    var store = Ext.getStore(me.store);
                    var item = store.getById(me.loadItemId);
                    if (Ext.isDefined(item) && item != null) {
                        me.loadRecord(item);
                    }else
                    {
                        //Filter for the id
                        store.addListener('load',function(){
                            var item = store.getById(me.loadItemId);
                            if (Ext.isDefined(item) && item != null)
                            {
                                me.loadRecord(item);
                            }else
                            {
                                Ext.error("Record not found "+me.loadItemId);
                            }
                            store.clearFilter();
                        },this,{single:true});

                        var newFilter =Ext.create('Ext.util.Filter',   {property:me.getModelSettings().idProperty, value:me.loadItemId});
                        store.filter([newFilter ]);
                    }
                },
                scope:me
            };
        }
    },


    initBarOptions:function () {
        var me = this;

        var topBar = [];


        var removeButton = {
            xtype:'deletebutton',
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
        var bottomBar = me.buttons || [];

        if(Ext.isDefined(me.buttons))
        me.buttons = undefined;

        var saveButton = {
            xtype:'savebutton',
            handler:function () {
                var objForm = this.up('form').getForm();
                var store = Ext.getStore(me.store);
                var record = objForm.getRecord();

                if (objForm.isValid()) {

                    if (me.addForm) {
                        var objModel = Ext.ModelManager.create({ }, store.model);
                        objForm.updateRecord(objModel);
                        store.add(objModel);
                        objModel.save({
                            success:function (rec, op) {
                                Ext.create('widget.savenotify', {response:op, titleField:me.getModelSettings().titleField, idField:me.getModelSettings().idProperty}).show();
                            },
                            failure:function (rec, op) {
                                Ext.create('widget.errornotify', {response:op}).show();
                            }
                        });
                    }
                    if (me.editForm) {
                        var objModel = Ext.ModelManager.create({ }, store.model);
                        objForm.updateRecord(record);
                        //record = store.getById(objModel.get(me.getModelSettings().idProperty));
                        //objForm.updateRecord(record);
                        record.save({
                            success:function (rec, op) {
                                Ext.create('widget.savenotify', {response:op,  titleField:me.getModelSettings().titleField, idField:me.getModelSettings().idProperty }).show();
                            },
                            failure:function (rec, op) {
                                Ext.create('widget.errornotify', {response:op}).show();
                            }
                        });
                    }
                }
            }
        };

        bottomBar = bottomBar.concat(bottomBar.length == 0 ? [saveButton] : ['-', saveButton]);

        if (topBar.length != 0)
            me.tbar = topBar;

        me.bbar = bottomBar;
    }

});