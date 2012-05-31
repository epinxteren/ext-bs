
Ext.define('Ext.ib.PopUp', {

    editPopup:function (type, store, rowIndex) {
        var record;
        var store = Ext.getStore(store);

        var obj = {
            xtype:'AutoForm'
        };

        switch(type)
        {
            case 'edit':
                record = store.getAt(rowIndex);//editing is only one record so get the first record
                obj.editForm = true;
                break;
            case 'detail':
                record = store.getAt(rowIndex);//editing is only one record so get the first record
                break;
            case 'add':
                record = Ext.create(this.store.model.prototype.modelName);
                obj.addForm = true;
                break;
        }

    }

});