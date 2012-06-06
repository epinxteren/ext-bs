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

    extend:'Ext.ib.Model',

    idProperty:'id',
    titleField:'name',

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
            basic:'view.tracks.track', //Basic label

            /****
             * You can specify a specific label to each component
             ***/
            addTitle:'view.tracks.addTrack'
            //detailTitle:'',
            //editTitle:'model.album.artistName',
            //gridTitle:'view.albums.index.title'
        }
    },

    fields:[
        {
            name:'id',
            type:'integer'
        },
        {
            name:'name',
            type:'string',
            ibOptions:{
                label:'model.track.name',
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
                label:'model.track.duration',
                grid:{
                    inGridEditing:false,
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        var d = new Date(value);
                        return Ext.Date.format(d, "i:s");
                    }
                },
                form:{
                    hint:"1u 5m 60s"
                },
                filter:{
                    inBetween:true,
                    onFilter:function (field, value, filter) {
                        var mp = 1;
                        var lower = value.toLowerCase();
                        if (lower.indexOf('u') > 0) {
                            mp = 60 * 60 * 100;
                        } else if (lower.indexOf('m') > 0) {
                            mp = 60 * 100;
                        } else if (lower.indexOf('s') > 0) {
                            mp = 100;
                        }
                        lower = +lower.replace(/[A-Za-z$-]/g, "");
                        filter.value = "" + (lower * mp);
                        return filter;
                    }
                }
            }
        },
        {
            name:'bytes',
            type:'integer',
            ibOptions:{
                label:'model.track.bytes',
                form:{

                },
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        var kb = (record.data.bytes / 1024);
                        var mb = kb / 1024;
                        kb = Ext.util.Format.round(kb, 0);
                        mb = Ext.util.Format.round(mb, 3);
                        return bytesTemplate.apply({kb:kb, mb:mb});
                    }
                },
                filter:{

                }
            }
        },
        {
            name:'unitprice',
            type:'double',
            ibOptions:{
                label:'model.track.unit_price',
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
            type:'Object',
            defaultValue:{id:1},
            name:'mediatype',
            fields:['id']
        },
        {
            type:'Object',
            defaultValue:{id:1},
            name:'genre',
            fields:['id']
        },
        {
            name:'composer',
            type:'string'
        },
        {
            name:'albumId',
            mapping:"album.id",
            persist:false,
            /**
             *If this field changes the belongsTo associations will be automaticly updated
             */
            belongsTo:'album.id',
            /**
             *If belongsTo record will be autoLoaded if not in found in store
             */
            belongsToLoad:true,

            ibOptions:{
                label:'model.track.albumTitle',
                grid:{
                    inGridEditing:true,
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                        return record.getAlbum().get('title');
                    }
                },
                form:{
                    xtype:'FieldComboBox',

                    name:'albumId',

                    store:'Albums',
                    displayField:'title',

                    valueField:'id'
                },
                filter:{}
            }
        }
    ],

    associations:[
        {
            type:'belongsTo',

            //Set correct name
            getterName:"getAlbum",
            setterName:"setAlbum",
            name:'album',

            //Connect
            model:'App.model.Album',
            associationKey:'album', //The group for nested json
            primaryKey:'album.id',
            foreignKey:'id',

            store:'Albums',

            //Options
            autoLoad:false
        }

    ],
    proxy:{
        type:'IbRest',
        url:Ib.config.restUrl + 'track/'
    }
});
