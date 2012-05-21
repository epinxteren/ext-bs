Ext.define('App.controller.Albums', {
	extend: 'App.controller.Base',
	views: [
		'albums.Index',
		'albums.Create',
		'albums.Edit'
	],
    stores:['Albums','Artists','Tracks'],
    models:['Album','Artist','Track'],
    onLoaded:function(){
        //Albums = Ext.getStore('Albums');
        //Tracks = Ext.getStore('Tracks');
        //Artists = Ext.getStore('Artists');
    }
});

