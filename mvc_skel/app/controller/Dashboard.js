Ext.define('App.controller.Dashboard', {
    extend: 'Ext.ib.controller.Base',
    views:[
        'dashboard.Index'
    ],
    stores:['Albums','Artists','Tracks'],
    models:['Album','Artist','Track'],
    baseStores:["Albums"],

    /**
     * Everybody that is logged in shoul see he dashboard so return true for has rights
     */
    hasRights: function() {
        return true;
    }
});