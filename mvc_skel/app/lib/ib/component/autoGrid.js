

/*
 * Is a {Ext.grid.Panel} that can create a grid from a store model fields
 */
Ext.define('Ext.ib.component.AutoGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.AutoGrid',

    requires:["Ext.ux.grid.FiltersFeature"],

    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator',
        FieldCreator:'Ext.ib.mixin.FieldCreator',
        Filter:'Ext.ib.mixin.Filter'
    },


    /**
     * @cfg {String} Basic dispatch name
     */
    dispatch:'',


    idField:'id',

    /**
     * @cfg {String} Name of grid
     */
    title:undefined,

    /**
     * @cfg {Boolean} paging enabled
     */
    paging:true,

    /**
     * @cfg {String} String of Ext.data.Store name
     */
    store:'',

    /**
     * @cfg {Boolean} standard filtering on colloms
     */
    hasStdFilter:false,

    /**
     * @cfg {Boolean} delete items inSide grid
     */
    hasDeleteItems:false,

    /**
     * @cfg {Boolean} has delete button inside top bar
     */
    hasDeleteButton:false,


    /**
     * @cfg {Boolean} addItem inside the grid
     */
    hasAddItems:false,

    /**
     * @cfg {Boolean:true} if a item is changed inside the grid the value wil be saved with the store
     */
    hasAutoSyncItems:true,

    /**
     * @cfg {Boolean} editing colloms inside the grid
     */
    hasEditItems:false,

    /**
     * @cfg {String} the dispatch name for editing  dispatch + editDispatch
     */
    editDispatch:'edit',

    /**
     * @cfg {Boolean} If the grid has some ingrid editing
     */
    hasInGridEditing:true,

    /**
     * @cfg {Boolean} Detail edit option
     */
    hasDetailItems:false,

    /**
     * @cfg {String} The dispatch name for detail  dispatch + detailDispatch
     */
    detailDispatch:'detail/',


    hasEditPopupForm:false,//TODO:Create edit popup

    flex:1,

    /**
     * @cfg {Boolean}  Enable collom sortable for all fields
     */
    sortable:false,

    /**
     * @event
     * Enable collom sortable for all fields
     */
    onSelectionChange:undefined,


    refresh:function()
    {
        var me = this;
        var store = Ext.getStore(me.store);
        var current = store.currentPage;
        store.loadPage(current);
    },

    initComponent:function () {
        var me = this;

        me.plugins = Ext.isDefined(me.plugins) ? me.plugins : [];
        me.features = Ext.isDefined(me.features) ? me.features : [];

        me.addBasicCollomns();

        me.addActionColumn();

        me.initBarOptions();

        me.enableFilter();

        /* Lisseners */
        me.listeners = {
            selectionchange:function (sm, selections) {

                if (me.deleteItems)
                    me.down('#removeButton').setDisabled(selections.length == 0);

                if (Ext.isDefined(me.onSelectionChange)) {
                    me.onSelectionChange.apply(me, arguments);
                }
            }
        };
        me.callParent(arguments);
    },

    /**
     * Redirects the edit action to the edit screen
     * @param grid
     * @param rowIndex
     */
    showEditAction:function (grid, rowIndex) {
        var store = grid.getStore();
        if (this.hasEditPopupForm) {
            this.editPopup('edit', store, rowIndex);
        } else {
            var rec = store.getAt(rowIndex);
            var id = rec.get(this.idField);


           // Ext.ibDispatch(this.dispatch+this.editDispatch,{id:id});

            Ext.History.add(this.dispatch+this.editDispatch+"/" + id, true);
           // Ext.dispatch(this.dispatch+this.editDispatch+"/"+id);
        }
    },

    /**
     * Redirects the detail action to the detail screen
     * @param grid
     * @param rowIndex
     */
    showDetailAction:function (grid, rowIndex) {
        var store = grid.getStore();
        if (this.hasEditPopupForm) {
            this.editPopup('detail', store, rowIndex);
        } else {

            var rec = store.getAt(rowIndex);
            var id = rec.get(this.idField);

            //Ext.dispatch(this.dispatch+this.detailDispatch + id);
            Ext.History.add(this.dispatch+this.detailDispatch + id, true);

        }
    },

    /**
     * Add basic grid colloms from {Ext.ib.component.IbOptions}
     */
    addBasicCollomns:function () {

        var me = this;
        var columns = [];

        me.modelForEach(function (field, index) {

            var grid = field.ibOptions.grid;
            var editable = Ext.isDefined(field.ibOptions.form);
            var ibOptions = field.ibOptions;

            var column = Ext.create('Ext.ib.component.ibOptions.Grid',grid);


            column.flex = Ext.isDefined(grid.flex) ? grid.flex : 1;

            column.text =  me.getLabelName(field,grid);

            column.dataIndex = field.name;
            column.sortable  = Ext.isDefined(grid.sortable) ? grid.sortable : false;

            if (Ext.isDefined(grid.renderer))
                column.renderer = grid.renderer;

            if (me.hasStdFilter || Ext.isDefined(grid.filter)) {
                if (Ext.isDefined(grid.filter))
                    column.filter = grid.filter;
                else
                    column.filterable = true;
            }

            if (me.hasEditItems && editable && (Ext.isDefined(grid.inGridEditing) && grid.inGridEditing)) {
                var form = field.ibOptions.form;
                column.field = me.createField(field, form);
            }
            columns.push(column);

        }, {//pass filter, only show colloms
            ibOptions:{
                grid:{

                }
            }
        });

        if (me.hasEditItems) {
            me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing',{listeners:{edit:function(editor,e){
                    //debugger;
                    if(me.hasAutoSyncItems)
                    {
                        e.record.save({
                            success:function (rec, op) {
                                Ext.create('widget.savenotify', {response:op, titleField:me.titleField, idField:me.idField }).show();
                            },
                            failure:function (rec, op) {
                                Ext.create('widget.errornotify', {response:op}).show();
                            }
                        });
                    }else
                    {
                        me.down('#updateButton').setDisabled(false);
                    }
            }},autoCancel: false, clicksToEdit:2});

            me.plugins.push(me.rowEditing);
        }

        var filters = {
            ftype:'filters',
            encode:false,
            local:true,
            filters:[]
        };

        me.features.push(filters);

        me.columns = columns;
    },





    addActionColumn:function () {
        var me =  this;

        var items = this.gridActionColumnItems || [];

        if (this.hasDetailItems) {
            items.push(
                {
                    iconCls:'ib-actioncolumn ib-actioncolumn-detail',
                    tooltip:translate('show_detail'),
                    handler:function (grid, rowIndex, colIndex) {
                        this.showDetailAction(grid, rowIndex, colIndex);
                    },
                    scope:this
                });
        }

        if (this.hasEditItems) {
            items.push(
                {
                    iconCls:'ib-actioncolumn ib-actioncolumn-edit',
                    tooltip:translate('edit'),
                    handler:function (grid, rowIndex, colIndex) {
                        this.showEditAction(grid, rowIndex, colIndex);
                    },
                    scope:this
                });
        }
        if (this.hasDeleteItems) {
            items.push({
                iconCls:'ib-actioncolumn ib-actioncolumn-delete',
                tooltip:translate('delete'),
                handler:function (grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    me.requistDeleteRecord(rec,me.getStore());
                }
            })
        }
        //number of items times icon width plus padding
        var width = items.length * (16 + 6);

        if(items.length != 0){
            this.actionColumns = {xtype:"actioncolumn", items:items, width:width};
            this.columns.push(this.actionColumns);
            //debugger;
        }
    },

    initBarOptions:function () {
        var me = this;

        var addButton = {
            text:'Add',
            tooltip:'Add a new row',
            iconCls:'add',
            listeners:{
                click:function(){
                    if(me.rowEditing.editing)
                        return false;

                    var store = me.getStore();
                    var model = Ext.ModelManager.create({ },store.model);
                    store.add(model);
                    me.rowEditing.startEdit(model, 0);
                }
            }
        };

        var removeButton = {
            itemId:"removeButton",
            text:'Remove',
            tooltip:'Remove the selected item',
            iconCls:'remove',
            disabled:true,
            listeners:{
                click:function () {
                    var store = me.getStore();
                    var selection = me.getSelectionModel().getSelection();
                    if(selection.length == 1)
                    me.requistDeleteRecord(selection[0],store);

                }
            }
        };

        var updateButton = {
            itemId:"updateButton",
            text:'Update',
            tooltip:'Update edited items',
            iconCls:'update',
            disabled:true,
            listeners:{
                click:function () {
                    var store = me.getStore();

                    store.commitChanges();
                    store.sync();
                    me.down('#updateButton').setDisabled(true);
                    me.refresh();
                }
            }
        };

        var topBar = [];
        if (me.hasAddItems)
            topBar = topBar.concat(topBar.length == 0 ? [addButton] : ['-', addButton]);

        if (me.hasDeleteItems && me.hasDeleteButton)
            topBar = topBar.concat(topBar.length == 0 ? [removeButton] : ['-', removeButton]);

        if (me.hasEditItems && !me.hasAutoSyncItems)
            topBar = topBar.concat(topBar.length == 0 ? [updateButton] : ['-', updateButton]);

        /* bottom bar */
        var bottomBar = Ext.create('Ext.PagingToolbar', {
            store:me.store,
            displayInfo:true,
            displayMsg:'Displaying topics {0} - {1} of {2}',
            emptyMsg:"No topics to display",
            items:[]
        });

        //debugger;
        if (topBar.length != 0)
            me.tbar = topBar;

        me.bbar = bottomBar;
    }


});