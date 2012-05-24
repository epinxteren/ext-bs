Ext.define('App.controller.Tracks', {
    extend: 'Ext.ib.controller.Base',
	views: [
		'tracks.Index',
		'tracks.Create',
		'tracks.Edit'
	],
    stores:['Tracks'],
    models:['Track'],
    baseStores:["Tracks"]
});