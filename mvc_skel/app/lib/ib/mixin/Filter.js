

Ext.define('Ext.ib.mixin.Filter', {

    store:'',

    filters:[],

    enableFilter:function()
    {
        var storeFilters= [];
        Ext.each(this.filters,function(filter){
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