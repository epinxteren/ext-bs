/**
 * Base controller all controllers will extend this controller it will implement and handle some functions that
 * all controllers will need
 *
 */
Ext.define('Ext.ib.controller.Base', {

    extend:'Ext.ux.app.RoutedController',

    /*
     * @cfg {String[]} main stores, auto filter clear for index page
     */
    baseStores:[],


    index: function(request) {
        this.render("workspace", this["get" + this.id + "IndexView"]());
        this.clearBaseStores();
    },

    add: function(request) {
        this.render("workspace", this["get" + this.id + "CreateView"]());
    },

    edit: function(request) {
        this.render("workspace", this["get" + this.id + "EditView"](),{itemId:+request.id});
    },

    clearBaseStores:function(){
        Ext.each(this.baseStores,function(storeName){
            this.clearFilters(true,storeName);
        },this);
    },

    /**
     * Will clear filters on stores
     *
     * @param {Boolean} reload if this is set to true the stores clearFilters will be called and a call to the server will be done else it will just remove filters without any call to the server
     * @param {String} {storeName=null} Optional if filters need to be cleared for just one store
     */
    clearFilters:function (reload, storeName) {
        var store = this.getStore(storeName);
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