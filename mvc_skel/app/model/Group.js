Ext.define('App.model.Group', {
    alias:'Group',
    extend:'Ext.ib.Model',

    idProperty:'id',
    titleField:'name',

    ibOptions:{
        names:{
            basic:'model.groups.group',
            addTitle:'model.groups.Add_group'
        }
    },

    fields:[
        {name:'id', type:'integer'
        },
        {name:'name', type:'string', ibOptions:{
            label:'model.groups.name',
            grid:{
                inGridEditing:true,
                show:true
            },
            form:{

            },
            filter:{

            }
        }},
        {
            name:'users',
            persist:false,
            ibOptions:{
                label:'model.groups.users',
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {

                        var total = "";
                        var users = record.getAssociatedData().users;
                        Ext.each(users, function (item, key, index) {
                            if (total !== "")
                                total += ", ";
                            total += item.name;
                        });

                        return total;
                    }
                }
            }
        },
        {
            name:'entities',
            persist:false,
            ibOptions:{
                label:'model.groups.Entities',
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {

                        var total = "";
                        var entities = record.getAssociatedData().entitie;
                        Ext.each(entities, function (item, key, index) {
                            if (total !== "")
                                total += ", ";
                            total += item.name;
                        });

                        return total;
                    }
                }
            }
        }

    ],


    associations:[
        {
            store:'Users',

            type:'hasMany',

            model:'App.model.User',

            name:'users',
            primarykey:'users.id',
            foreignkey:'id',

            filterProperty:'id',

            associationKey:'users' //The group for nested json, CANNOT be the same as name
        }
        ,
        {
            store:'Entities',

            type:'hasMany',

            model:'App.model.Entitie',

            name:'entitie',
            primarykey:'entities.id',
            foreignkey:'id',

            filterProperty:'id',

            associationKey:'entities' //The group for nested json, CANNOT be the same as name
        }

    ],


    proxy:{
        type:'ajax',
        url:Ib.config.dataUrl + 'groups.json'
    }
});