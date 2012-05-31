

Ext.define('Ext.ib.mixin.Filter', {

    store:'',


    mainFilters:[],

    filters:[],


    saveFilters:[],


    /**
     * Resets the filter to m
     */
    resetFilter:function()
    {
        this.clearFilter(false);

        var storeFilters= [];

        Ext.each(this.mainFilters,function(filter){
            var newFilter =Ext.create('Ext.util.Filter', filter);
            storeFilters.push(newFilter);
        },this);

        var store = Ext.getStore(this.store);

        if(storeFilters.length > 0){
            store.filter(storeFilters);
        }else
        {
            this.clearFilter(true);
        }
    },

    saveToMain:function()
    {
        var store = Ext.getStore(this.store);
        this.mainFilters = [];
        for(var i in store.filters.items)
        {
            this.mainFilters.push({
                property: store.filters.items[i].property,
                value: store.filters.items[i].value
            });

        }
    },

    enableFilter:function()
    {
        var storeFilters= [];

        Ext.each(this.filters,function(filter){
            var newFilter =Ext.create('Ext.util.Filter', filter);
            storeFilters.push(newFilter);
        },this);

        Ext.each(this.mainFilters,function(filter){
            var newFilter =Ext.create('Ext.util.Filter', filter);
            storeFilters.push(newFilter);
        },this);

        var store = Ext.getStore(this.store);

        if(storeFilters.length > 0){
            store.filter(storeFilters);
        }else
        {
            this.clearFilter(true);
        }
    },

    clearFilter:function (reload) {
        var store = Ext.getStore(this.store);
        if(Ext.isDefined(store) && store != null)
        {
            if (reload && store.filters.length != 0) {
                store.clearFilter();
            } else {
                store.filters.clear();
            }
        }
    }

});