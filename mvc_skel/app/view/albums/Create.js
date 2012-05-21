Ext.define('App.view.albums.Create', {
    extend:'Ext.form.Panel',
    alias:'widget.albums.Create',
    title:'Create Album',
    height:300, // <-- when rendered on a window, sets the window dims
    width:400,
    bodyStyle:'padding: 10px',
    defaultType:'textfield',
    items:[
        {
            flex:1,
            remove:true,
            title:"Album",
            xtype:'AutoForm',
            store:'Albums'
        }
        /*
        {
            xtype:'form',
            store:'Albums',
            layout:'anchor',
            defaultType:'textfield',
            items:[
                {
                    flex:1,
                    hideTrigger:true,
                    fieldLabel:'Title',
                    name:'title'
                },
                {
                    xtype:'combo',

                    fieldLabel:'artist',
                    name:'ArtistId',

                    store:'Artists',
                    displayField:'name',
                    valueField:'id',

                    forceSelection:true,
                    multiSelect:false,
                    anchor:'100%',
                    pageSize:10,
                    allowBlank:true
                }
            ]
        }*/
    ],
    buttons:[
        {
            text:'Save',
            handler:function () {

                debugger;
                var Albums = Ext.getStore("Albums");

                var objForm = this.up('panel').down('form').getForm();
                var objModel =  Ext.ModelManager.create({ },'App.model.Album');
                objForm.updateRecord(objModel);
                objModel.set('AlbumId',0);
                if (objForm.isValid())
                {
                    Albums.add(objModel);
                    objForm.reset();
                    Albums.sync();
                }
            }
        }
    ]
});
