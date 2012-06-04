

Ext.define('App.model.Entitie', {
    alias:'Entitie',
    extend:'Ext.ib.Model',
    idProperty:'id',

    titleField:'name',

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

    associations:[
        {
            store:'Rights',

            type:'hasMany',

            model:'App.model.Right',

            name:'group',
            primarykey:'groups.id',
            foreignkey:'id',

            filterProperty:'id',

            associationKey:'groups' //The group for nested json, CANNOT be the same as name
        }
    ],

    proxy:{
        type:'json',
        url:Ib.config.dataUrl + 'entities.json'
    }
});