Ext.define('App.model.User', {
    alias:'User',
    extend:'Ext.ib.Model',
    idProperty:'id',

    titleField:'name',

    requires:[
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],


    ibOptions:{
        names:{
            basic:'model.users.user', //Basic label
            addTitle:'model.users.Add_user'
        }
    },

    fields:[
        {name:'id', type:'integer'
        },
        {name:'name', type:'string', ibOptions:{
            label:'model.users.name',
            grid:{
                inGridEditing:true
            },
            form:{},
            filter:{}
        }},
        {name:'groups', ibOptions:{
            label:'model.users.Groups',
            grid:{
                renderer:function (value, meta, record, rowIndex, colIndex, store, view) {

                    var total = "";
                    var groups = record.getAssociatedData().group;
                    Ext.each(groups, function (item, key, index) {
                        if (total !== "")
                            total += ", ";
                        total += item.name;
                    });

                    return total;
                },
                inGridEditing:true
            }
        }}
        /*
        ,
        {name:'groups2',
            ibOptions:{
            label:'model.users.Groups',
            grid:{
                renderer:function (value, meta, record, rowIndex, colIndex, store, view) {

                    var total = "";
                    var groups = record.getAssociatedData().group;
                    Ext.each(groups, function (item, key, index) {
                        if (total !== "")
                            total += ", ";
                        total += item.name;
                    });

                    return total;
                },
                inGridEditing:true
            }

            ,
            form:{

                xtype:'itemselector',
                name:'itemselector',


                //imagePath:'../ux/images/',
                store:'Groups',
                displayField:'name',
                valueField:'groups',
                allowBlank:false,
                msgTarget:'side'

            }
        }}

        */

    ],

    associations:[
        {
            store:'Groups',

            type:'hasMany',

            model:'App.model.Group',

            name:'group',
            primarykey:'groups.id',
            foreignkey:'id',

            filterProperty:'id',

            associationKey:'groups' //The group for nested json, CANNOT be the same as name
        }
    ],


    proxy:{
        type:'ajax',
        url:Ib.config.dataUrl + 'users.json'
    }
});