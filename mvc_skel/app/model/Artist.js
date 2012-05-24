Ext.define('App.model.Artist', {
    alias:'Artist',
    extend:'Ext.ib.Model',
    idProperty:'id',
    fields:[
        {name:'id', type:'integer'
        },
        {name:'name', type:'string', ibOptions:{
            grid:{
                show:true
            },
            form:{
            },
            filter:{

            }
        }}
    ],
    /*
     hasMany:{
     model:'App.model.Album',
     name:'albums',
     primarykey:'albums.id',
     foreignkey:'id'
     },
     */
    proxy:{
        type:'IbRest',
        url:Ib.config.restUrl + 'Artist/'
    }
});