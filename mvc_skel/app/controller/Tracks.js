Ext.define('App.controller.Tracks', {
	extend: 'App.controller.Base',
	views: [
		'tracks.Index',
		'tracks.Create',
		'tracks.Edit'
	],
    stores:['Tracks'],
    models:['Track']
});