Ext.define('App.view.tracks.Create', {
	extend: 'Ext.form.Panel',
	alias: 'widget.tracks.Create',
	title: 'Create Song',
	bodyStyle: 'padding: 10px',
	items: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Name'
	}]
});