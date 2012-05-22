

Ext.define('Ext.ib.utils.Filter', {



    enableFilter:function()
    {


        Ext.create('Ext.util.Filter', {property: "email", value: /\.com$/, root: 'data'})



    }


});