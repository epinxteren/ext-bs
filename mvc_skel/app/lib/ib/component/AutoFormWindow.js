/**
 * Form window will create an editable form for adding/saving data
 */
Ext.define('Ext.ib.component.AutoFormWindow', {
    extend:'Ext.window.Window',

    mixins:{
        AutoName:'Ext.ib.mixin.ComponentAutoName'
    },

    onEsc:function () {
        var me = this;
        me.close();
    },

    autoWidth:true,
    autoHeight:true,
    alias:'widget.AutoFormWindow',
    modal:true,
    layout:{
        type:'fit'
    },

    useAutoFill:true,

    /**
     * @cfg loadItemId {Number=undefined} Automatic load this record when {editForm} is enabled and the record will be loaded into the form.
     */
    loadItemId:undefined,

    /**
     * @cfg {Boolean} If this forum is a form that add's records to it's store
     */
    addForm:false,

    /**
     * @cfg {Boolean} If this form edit's a excisting model, decleard with {loadItemId}
     */
    editForm:false,

    /**
     * @cfg {Boolean=true} hasAutoTitle If this get's it's title form it's model
     */
    hasAutoTitle:true,


    getForm:function()
    {
        return this.down('AutoForm');
    },

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    loadItemId:me.loadItemId,
                    xtype:'AutoForm',
                    store:me.store,
                    editForm:me.editForm,
                    addForm:me.addForm,
                    hasAutoTitle:false,
                    listeners:{
                        boxready:function (me) {
                            Ux.locale.Manager.applyLocales();
                        }
                    },
                    buttons:[
                        {
                            xtype:'cancelbutton',
                            scope:this,
                            handler:function () {
                                this.close();
                            }
                        }
                    ]
                }
            ]
        });

        if(me.hasAutoTitle){

            if(this.editForm)
                this.initAutoLocal('edit','title');
            if(this.addForm)
                this.initAutoLocal('add','title');
        }



        me.callParent(arguments);
    }
});