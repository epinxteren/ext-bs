var bytesTemplate = new Ext.XTemplate(
    '<div align="right" >',
    '{kb}Kb',
    '<br />',
    '{mb}Mb',
    '</div>',
    {
        compiled:true
    }
);




Ext.define('App.model.Track', {
    extend:'Ext.data.Model',
    idProperty:'TrackId',
    fields:[
        {
            name:'id',
            type:'integer'
        },
        {
            name:'name',
            type:'string',
            ibOptions:{
                grid:{
                    inGridEditing:true
                },
                form:{

                },
                filter:{


                }
            }
        },
        {
            name:'milliseconds',
            type:'integer',
            ibOptions:{
                label:'duration',
                grid:{
                    inGridEditing:false,
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        var d = new Date(value);
                        return Ext.Date.format(d,"i:s");
                    }
                },
                form:{

                },
                filter:{
                    inBetween:true
                }
            }
        },
        {
            name:'bytes',
            type:'integer',
            ibOptions:{
                form:{

                },
                filter:{

                }
            }
        },
        {
            name:'unit_price',
            type:'double',
            ibOptions:{
                grid:{
                    inGridEditing:true
                },
                form:{

                },
                filter:{



                }
            }
        },
        {
            name:'Bytes',
            type:'string',

            ibOptions:{
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        var kb = (record.data.bytes / 1024);
                        var mb = kb / 1024;
                        kb =  Ext.util.Format.round(kb, 0);
                        mb =  Ext.util.Format.round(mb, 3);
                        return bytesTemplate.apply({kb:kb,mb:mb});
                    }
                },
                filter:{



                }
            }
        }
    ],

    associations:[
        /*
         {
         type:'belongsTo',

         //Set correct name
         getterName:"getAlbum",
         setterName:"setAlbum",
         name:'Album',

         //Connect
         model:'App.model.Album',
         associationKey:'album',//The group for nested json
         primaryKey:'album.id',
         foreignKey:'id',

         //Options
         autoLoad:false
         }

         {
         type: 'belongsTo',
         model: 'MediaType',
         primaryKey: 'MediaTypeId',
         foreignKey: 'MediaTypeId',
         autoLoad: false,
         associationKey: 'MediaType'
         },
         {
         type: 'belongsTo',
         model: 'Genre',
         primaryKey: 'GenreId',
         foreignKey: 'GenreId',
         autoLoad: false,
         associationKey: 'Genre'
         }*/
    ],
    proxy:{
        type:'IbRest',
        url:Ib.config.restUrl + 'track/'
    }
});
