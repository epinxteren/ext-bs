Ext.define('App.model.Album', {

    ibOptions:{
        /**
         * Automatic translation labels names for all type of components
         */
        names:{
            /****
             * Basic label for each component, The title for each would be:
             * -Add    {basic}
             * -Edit   {basic}
             * -Detail {basic}
             * -Grid   {basic}
             ****/
            basic:'view.albums.album', //Basic label

            /****
             * You can specify a specific label to each component
             ***/
            addTitle:'view.albums.addAlbum'
            //detailTitle:'',
            //editTitle:'model.album.artistName',
            //gridTitle:'view.albums.index.title'
        }
    },

    extend:'Ext.ib.Model',

    idProperty:'id',

    titleField:'title',

    fields:[

        /*
        {
            name:'id',
            type:'integer',
            ibOptions:{
                label:'model.album.id',
                grid:{
                },
                form:{}, //Auto form,
                filter:{}
            }
        },
        */
        {
            name:'title',
            type:'string',
            ibOptions:{
                label:'model.album.title',
                grid:{
                    inGridEditing:true
                },
                form:{}, //Auto form,
                filter:{}
            }
        },

        //Optional values:
        {
            name:'artistId',
            mapping:'artist.id',
            persist:false,

            /**
             *If this field changes the belongsTo associations will be automaticly updated
             */
            belongsTo:'artist.id',

            /**
             *If belongsTo record will be autoLoaded if not in found in store
             */
            belongsToLoad:true,

            ibOptions:{
                label:'model.album.artistName',
                grid:{
                    inGridEditing:true,
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {

                        return record.getArtist().get('name');

                    }
                },
                form:{
                    xtype:'FieldComboBox',

                    fieldLabel:'artist',
                    name:'artistId',

                    store:'Artists',
                    displayField:'name',
                    valueField:'id'
                },
                filter:{

                }
            }
        }
        ,

        {
            name:'Other albums',
            persist:false,
            type:'integer',
            ibOptions:{
                label:'model.album.otherAlbums',
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        var record =  record.getArtist();
                        var count = record.get('albums').length;
                        return isNaN(count) ? 0 : count;
                    }
                }
            }
        }
    ],

    proxy:{
        type:'IbRest',
        url:Ib.config.restUrl + 'Album/'
    },

    associations:[

        {
            type:'hasMany',

            model:'App.model.Track',
            name:'track',
            primarykey:'id',
            foreignkey:'album.id',

            associationKey:'tracks' //The group for nested json
        }
         ,
        {
            type:'belongsTo',

            //////
            //Correct name instead of getApp.model.Artist, prev call: AlbumRec['getApp.model.Artist'](0) new call: AlbumRec.getArtist()
            //////
            getterName:"getArtist",
            setterName:"setArtist",
            name:'artist',

            store:'Artists',
            model:'App.model.Artist',
            associationKey:'artist',
            primaryKey:'artist.id',
            foreignKey:'id'

        }
    ]

});
