
Ext.define('App.model.Right', {
    alias:'Right',
    extend:'Ext.ib.Model',

    idProperty:'id',

    titleField:'type',

    fields:[
        {name:'id', type:'integer'
        },
        {name:'type', type:'string', ibOptions:{
            label:'model.entities.name',
            grid:{
                inGridEditing:true,
                show:true
            },
            form:{
            },
            filter:{

            }
        }}
    ],

});