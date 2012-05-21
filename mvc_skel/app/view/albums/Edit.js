Ext.define('App.view.albums.Edit', {
	extend: 'App.view.albums.Create',
	alias: 'widget.albums.Edit',
	title: 'Edit Album',

    initComponent:function () {
        var me = this;
        me.callParent(arguments);
    },
    listeners:{
        afterrender:{
            fn:function()
            {
                var me = this;
                var form =  me.down("form").getForm();
                var store = Ext.getStore(form.store);
                var item = store.getById(me.itemId);
                if(Ext.isDefined(item) && item != null)
                {
                   form.loadRecord(item);
                }
            }
        }
    },
    buttons:[
        {
            text:'Save',
            handler:function () {
                debugger;
                var panel =  this.up('panel');
                var form = panel.down('form').getForm();
                //var form = this.up('form').getForm();
                var store = Ext.getStore(form.store);
                var record = store.getById(panel.itemId);
                form.updateRecord(record);
                if (record.isValid())
                {
                    record.save({
                        success:function (rec, op) {
                            Ext.create('widget.savenotify', {response:op, titleField:panel.titleField, idField:panel.idField }).show();
                        },
                        failure:function (rec, op) {
                            Ext.create('widget.errornotify', {response:op}).show();
                        }
                    });
                }
            }
        }
    ]
});