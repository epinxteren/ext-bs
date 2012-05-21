
Ext.define('Ext.ib.utils.Utils', {});//No error by require

Ext.ibDispatch  = function(url, parems){
    if(Ext.isDefined(parems))
    {
        parems = Ext.JSON.encode(parems);
        Ext.dispatch(url+"/"+parems);
    }
    else
    {
        Ext.dispatch(url);
    }
};




