







Ext.require('Ext.ib.IbReference', function () {
    Ext.onReady(function () {


        Ext.define('Artist', {
            alias:'Artist',
            extend:'Ext.ib.Model',
            idProperty:'id',
            fields:[
                {name:'id', type:'integer'},
                {name:'name', type:'string'}
            ],
            hasMany:{
                model:'Album',
                name:'albums',
                primarykey:'albums.id',
                foreignkey:'id'
            }
            /*
             ,
             proxy:{
             type:'IbRest',
             url:Ib.config.restUrl+'Artist/'
             }*/
        });

        Ext.define('Album', {
            extend:'Ext.ib.Model',
            idProperty:'id',
            fields:[
                //Verplichte velden:
                {name:'id', type:'integer'},
                {name:'title', type:'string'},
                {name:'artistId', type:'string' , mapping:'artist.id'}
            ],

            proxy:{
                type:'IbRest',
                url:Ib.config.restUrl + 'Album/'
            },
            associations:[
                {
                    //Correct name instead of getApp.model.Artist, prev call: AlbumRec['getApp.model.Artist'](0) new call: AlbumRec.getArtist()

                    //Set correct name
                    //getterName:"getArtist",
                    //setterName:"setArtist",
                    //name:'Artist',

                    type:'belongsTo',

                    //Connect
                    model:'Artist',
                    associationKey:'artist', //The group for nested json
                    primaryKey:'artist.id',
                    foreignKey:'id',

                    //Options
                    autoLoad:true
                }
            ]

        });


        //debugger;

        Albums = Ext.create('Ext.ib.Store', {
            autoLoad:true,
            model:'Album',
            remoteFilter: false

        });


        Ext.create('Ext.panel.Panel', {
            renderTo:document.body,
            width:750,
            height:400,
            x:100,
            y:100,
            border:false,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[
                {
                    sortable:true,
                    flex:1,
                    xtype:'gridpanel',
                    store:Albums,
                    title:'Albums',
                    columns:[
                        {

                            text:'Title',
                            flex:1,
                            sortable:true,
                            dataIndex:'title'
                        },
                        {
                            text:'artist',
                            flex:1,
                            sortable:true,
                            dataIndex:'artist',
                            renderer:function(value,metaData ,record,rowIndex,colIndex,store  ,view   )
                            {
                                return record.ArtistBelongsToInstance.get("name");
                            }
                        },
                        {
                            text:'artist dot notation',
                            flex:1,
                            sortable:true,
                            dataIndex:'artist.name'
                        }
                    ],
                    bbar:Ext.create('Ext.PagingToolbar', {
                        store:Albums,
                        displayInfo:true,
                        displayMsg:'Displaying topics {0} - {1} of {2}',
                        emptyMsg:"No topics to display",
                        items:[]
                    })
                }
            ],
            buttons:[
                {
                    text:'Check',
                    handler:function () {
                        var rec0 = Albums.getAt(0);
                        var artist = rec0.getArtist();
                        Ext.log(artist.get("name"));
                    }
                }
            ]
        });
    });


});