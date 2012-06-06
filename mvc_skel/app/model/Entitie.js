

Ext.define('App.model.Entitie', {
    alias:'Entitie',
    extend:'Ext.ib.Model',
    idProperty:'id',

    titleField:'name',

    ibOptions:{
        names:{
            basic:'model.entities.entitie',
            addTitle:'model.entities.Add_entitie'
        }
    },

    fields:[
        {name:'id', type:'integer'
        },
        {name:'name', type:'string', ibOptions:{
            label:'model.entities.Name',
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
            name:'groupId',
            persist:false,

            //mapping:'group.id',
            ////
            //If this field changes the belongsTo associations will be automaticly updated
            ////
            belongsTo:'group.id',

            ////
            //If belongsTo record will be autoLoaded if not in found in store
            ////
            belongsToLoad:true,

            ibOptions:{
                label:'model.entities.Group',
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        return   record.getGroup().get('name');;
                    }
                },
                form:{
                    xtype:'FieldComboBox',

                    name:'groupId',

                    store:'Groups',
                    displayField:'name',
                    valueField:'id'
                },
                filter:{


                }
            }
        },

        {
            name:'rights',
            persist:false,
            ibOptions:{
                label:'model.entities.Rights',
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        var total = "";
                        Ext.each(value,function(item,key,index){
                            if(total !== "")
                                total +=", ";
                            total +=item.type;
                        });
                        return total;
                    }
                }
                //,
                /*
                form:{
                    xtype:'FieldComboBox',

                    name:'rightId',

                    store:'Rights',
                    displayField:'type',
                    valueField:'id'

                }*/
            }
        }
    ],

    associations:[
        {
            store:'Rights',

            type:'hasMany',

            model:'App.model.Right',

            name:'right',
            primarykey:'rights.id',
            foreignkey:'id',

            filterProperty:'id',

            associationKey:'rights' //The group for nested json, CANNOT be the same as name
        },


        {
            type:'belongsTo',

            //////
            //Correct name instead of getApp.model.Artist, prev call: AlbumRec['getApp.model.Artist'](0) new call: AlbumRec.getArtist()
            //////
            getterName:"getGroup",
            setterName:"setGroup",
            name:'group',

            store:'Groups',
            model:'App.model.Group',
            associationKey:'group',
            primaryKey:'group.id',
            foreignKey:'id'
        }
    ],

    proxy:{
        type:'ajax',
        url:Ib.config.dataUrl + 'entities.json'
    }
});