Ext.define('App.model.Album', {
    extend:'Ext.ib.Model',


    idProperty:'id',
    fields:[
    //Verplichte velden:
    {
        name:'id', 
        type:'integer'
    },

    {
        name:'title', 
        type:'string',
        ibOptions:{
            grid:{    
                show:true
            },
            form:
            {
                
            }
        }
    },
    {
        name:'ArtistId', 
        type:'integer', 
        mapping:"artist.id"
    },
    //Optionele velden:
    {
        name:'artist', 
        persist:false,
        ibOptions:{
            grid:{    
                show:true,
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    return value.name;
                }
            },
            form:{
                    xtype:'FieldComboBox',

                    fieldLabel:'artist',
                    name:'ArtistId',

                    store:'Artists',
                    displayField:'name',
                    valueField:'id'


                /*
                    forceSelection:true,
                    multiSelect:false,
                    anchor:'100%',
                    pageSize:10,
                    allowBlank:true
                */
            }
        },
        fields:[
        {
            name:'id', 
            type:'integer'
        },

        {            
            name:'name', 
            type:'string'
        }
        ]
    }
    ],

    proxy:{
        type:'IbRest',
        url:Ib.config.restUrl + 'Album/'
    }
/*
     hasMany:{
     model:'App.model.Track',
     name:'Tracks',
     primarykey:'id',
     foreignkey:'album.id',
     associationKey:'tracks'
     },

     associations:[
     {
     //Correct name instead of getApp.model.Artist, prev call: AlbumRec['getApp.model.Artist'](0) new call: AlbumRec.getArtist()

     //Set correct name
     getterName:"getArtist",
     setterName:"setArtist",
     name:'Artist',

     type:'belongsTo',

     //Connect
     model:'App.model.Artist',
     associationKey:'artist',//The group for nested json
     primaryKey:'artist.id',
     foreignKey:'id',

     //Options
     autoLoad:true
     }
     ]
     */
});
