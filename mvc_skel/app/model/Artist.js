Ext.define('App.model.Artist', {

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
            basic:'model.artists.artist', //Basic label

            /****
             * You can specify a specific label to each component
             ***/
            addTitle:'model.artists.add'
            //detailTitle:'',
            //editTitle:'model.album.artistName',
            //gridTitle:'view.albums.index.title'
        }
    },


    alias:'Artist',
    extend:'Ext.ib.Model',
    idProperty:'id',

    titleField:'name',

    fields:[
        {name:'id', type:'integer'
        },
        {name:'name', type:'string', ibOptions:{
            label:'model.artist.name',
            grid:{
                inGridEditing:true,
                show:true
            },
            form:{
            },
            filter:{

            }
        }},

    /****
     *The association has many cannot be used to get the
     **/
        {
            name:'albums',
            fields:['id','title'],
            persist:false,
            ibOptions:{
                label:'model.artist.albums',
                grid:{
                    renderer:function (value, meta, record, rowIndex, colIndex, store, view) {
                            return value.length
                    }
                }
            }
        }
    ],


    associations:[
        {
            store:'Albums',

            type:'hasMany',

            model:'App.model.Album',

            name:'albums',
            primarykey:'albums.id',
            foreignkey:'id',

            filterProperty:'id',

            associationKey:'album' //The group for nested json, CANNOT be the same as name
        }
    ],


    proxy:{
        type:'IbRest',
        url:Ib.config.restUrl + 'Artist/'
    }
});