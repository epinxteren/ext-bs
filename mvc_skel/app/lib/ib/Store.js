Ext.define("Ext.ib.Store", {
    extend:'Ext.data.Store',
    alias:'widget.IbStore',
    /**
     * @cfg {Number} [Vzs.config.pageLimit] standard pagesize is the config pageLimit
     */
    pageSize:Ib.config.pageLimit,
    /**
     * @cfg {Boolean} [autoLoad=false] standard dont use auto load
     */
    autoLoad:false,
    /**
     * @cfg {Boolean} [remoteFilter=true] when filtering do this on the server
     */
    remoteFilter:true,
    /**
     * @cfg {Boolean} [remoteSort=true] when sorting do this on the server
     */
    remoteSort:false,

    disablePagin:function(){
        this.pageSize= 99999999;
    }
});


