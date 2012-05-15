

Ext.define('Ext.ib.component.autoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.autoGrid',
    
    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator'  
    },
    /**
     * @cfg {String} Name of grid
     */   
    title: '',
    
    /**
     * @cfg {Boolean} paging enabled
     */   
    paging: true,
        
    /**
     * @cfg {String} String of Ext.data.Store name
     */              
    store:'',


    flex:1,

    sortable:true,
    
    initComponent:function () {
        
        var me = this;
        
        var columns = [];
       
        me.modelForEach(function(field,index){
                        
            var grid =  field.ibOptions.grid;    
            var collom ={
                flex:Ext.isDefined(grid.flex) ? grid.flex : 1 ,
                text:Ext.isDefined(grid.text) ? grid.text : field.name,
                dataIndex:field.name,
                sortable:Ext.isDefined(grid.sortable)? grid.sortable : false
            };
            if(Ext.isDefined(grid.renderer))
                collom.renderer = grid.renderer;

            columns.push(collom);

        },{//pass filter, only show colloms
            ibOptions:{
                grid:{
                    
                }
            }
        });
                  
        this.columns = columns;

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store:me.store,
            displayInfo:true,
            displayMsg:'Displaying topics {0} - {1} of {2}',
            emptyMsg:"No topics to display",
            items:[]
        });   
        
        me.callParent(arguments);
    }


});