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
                edit:true
            },
            form:{
                
            }
        }        
    },
    {
        name:'milliseconds', 
        type:'integer',
        ibOptions:{
            grid:{
                edit:false
            },
            form:{
                
            }            
        }        
    },
    {
        name:'bytes', 
        type:'integer',
        ibOptions:{
            grid:{
                edit:true
            },
            form:{

            }
        }
    },
    {
        name:'unit_price', 
        type:'double',
        ibOptions:{
            grid:{
                edit:true
            },
            form:{

            }
        }
    }
        /*,
        {
            name:'AlbumId'
        }*/
    ],

    associations: [
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
