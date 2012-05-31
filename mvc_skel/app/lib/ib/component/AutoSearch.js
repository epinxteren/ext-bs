Ext.define('Ext.ib.component.AutoSearch', {
    extend:'Ext.form.Panel',
    alias:'widget.AutoSearch',

    locales : {
        title : 'components.autosearch.searching'
    },
    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator',
        FieldCreator:'Ext.ib.mixin.FieldCreator',
        Filter:'Ext.ib.mixin.Filter'
    },

    collapsible : true,
    animCollapse : true,


    /**
     * @cfg {String} String of Ext.data.Store name
     */
    store:'',

    layout:'hbox',

    columns:2,

    initComponent:function () {
        var me = this;

        me.items = [];
        var items = this.createFilterScreen();
        for(var i = 0; i < me.columns ; i++)
        {
           var each = items.length / me.columns;
            me.items.push(
                {
                    border:0,
                    flex:1,
                    items:items.slice(i *me.columns, (i+1) * me.columns  )
                });
        }

        me.callParent(arguments);
    },


    listeners:{
        boxready:function (me) {
            this.saveToMain();
        }
    },

    /**
     * Set the configs depening on the column type
     * @private
     * @param field
     * @param filter
     */
    setXType:function (field, filter) {

        if (Ext.isDefined(filter.radioFields)) {
            filter.xtype = 'radiogroup';
            filter.items = filter.radioFields;
        } else
        if ( Ext.isDefined(filter.checkFields)) {
            filter.xtype = 'checkboxgroup';
            filter(!Ext.isDefined(obj.columns))
            filter.columns = 2;

            filter.items = filter.checkFields;
        } else
        if (Ext.isDefined(filter.combobox)) {
            filter.xtype = 'combobox';
            Ext.Object.merge(obj, filter.combobox);
        }else
        {
            filter.xtype= this.getDefualtXtype(field);
        }
    },

    /**
     *
     * @param {Object[]} obj the current object that the values should be set on
     * @param {Object[]} column  data from the field
     */
    createBetween:function (field, filter) {

        var labelName =  this.getLabelName(field,filter);

        var from = Ext.clone(filter);
        var to   = Ext.clone(filter);

        this.createFilter(field,from);
        from.name       = field.name + '_from' ;
        from.fieldLabel = labelName + '_from';

        from.locales    = {
            fieldLabel : from.fieldLabel
        };

        this.createFilter(field,to);
        to.name = field.name + '_until' ;
        to.fieldLabel = labelName + '_until';
        to.locales    = {
            fieldLabel : to.fieldLabel
        };

        //ssetXType
        return [        {
            xtype:'panel',
            layout:'vbox',
            border:0,
            flex:1,
            items:[from,to]
        }];
    },



    createFilter:function (field,filter) {
        var me = this;

        me.setXType(field,filter);

        filter.name      = field.name;

        filter.fieldLabel= me.getLabelName(field,filter);

        filter.locales    = {
            fieldLabel : filter.fieldLabel
        };

        if(!Ext.isDefined(filter.obligated))
        filter.allowBlank = true;

        if(!Ext.isDefined(filter.wildcard))
        filter.wildcard = true;

        return filter;
    },


    createFilterScreen:function(){
        var me = this;
        var filtersFields = [];

        //Normal filters
        me.modelForEach(function (field, index) {
            var filter =  Ext.clone( field.ibOptions.filter);

            if(Ext.isDefined(filter.inBetween) && filter.inBetween)
            {
                filtersFields = filtersFields.concat(me.createBetween(field,filter,field.ibOptions));
            }else
            {
                filtersFields.push(me.createFilter(field,filter,field.ibOptions));
            }

        }, {//pass filter
            ibOptions:{
                filter:{

                }
            }
        });
        return filtersFields;
    },

    getFields:function()
    {
        var me = this;
        var form = me.getForm();
        var fields = form.getFields().items;
        return fields;
    },

    search:function(){


        var me = this;

        var fields = me.getFields();

        me.filters = [];


        Ext.each(fields,function(field){
            var key = field.name;
            var value = field.getValue();

            if(Ext.isDefined(value) && value != "" && value != null)
            {
                if(Ext.isDefined(field.onFilter))
                {
                    me.filters.push(field.onFilter(field,value,{id:key, property:key, value:value, root:'data'}));
                }else
                {
                    if(field.wildcard)
                    {
                        me.filters.push({id:key, property:key, value:"%"+value+"%", root:'data'});
                    }
                    else
                    {
                        me.filters.push({id:key, property:key, value:value, root:'data'});
                    }
                }
            }
        });
        me.enableFilter();
    },

    buttons:[
        {
            xtype:'resetbutton',
            handler:function (obj) {
                var sp = obj.up('AutoSearch');
                sp.getForm().reset();
                sp.resetFilter();
            }
        },
        {
            xtype:'searchbutton',
            handler:function (obj) {
                var sp = obj.up('AutoSearch');
                sp.search();
            }

        }
    ]

});