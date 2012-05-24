Ext.define('App.controller.Albums', {
	extend: 'Ext.ib.controller.Base',
	views: [
		'albums.Index',
		'albums.Create',
		'albums.Edit'
	],
    stores:['Albums','Artists','Tracks'],
    models:['Album','Artist','Track'],
});

