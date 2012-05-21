



Ext.define('Ext.ib.mixin.FieldCreator', {


    /**
     * Will create a form field from a model field
     *
     * @param (Ext.data.Field) field
     *
     */
    getDefualtXtype:function(field){

        switch(field.type){
            case 'integer':
                return "FieldNumber";
            case 'string':
                return "FieldText";
            default:
                return "FieldText";
        }
    },



    /**
     * Will create a form field from a model field
     *
     * @param (Ext.data.Field) field
     * @param (Object)         form  The field object in the forum
     *
     */
    createField:function(field,form){
        if(!Ext.isDefined(form.xtype))
            form.xtype = this.getDefualtXtype(field);

        return form;
    },

    /**
     * Will show a confirm screen if yes is clicked it will remove the record
     *
     * @param record
     * @param store
     */
    requistDeleteRecord:function(record,store){
        Ext.MessageBox.buttonText.yes = translate('yes');
        Ext.MessageBox.buttonText.no = translate('no');
        Ext.MessageBox.show({
            title:translate('confirm_delete'),
            msg:translate('do_you_want_to_remove_this_record'),
            buttons:Ext.MessageBox.YESNO,
            /**
             * Ask a confirmation for deleting the record
             * @param buttonId
             */
            fn:function (buttonId) {
                switch (buttonId) {
                    case 'no':
                        break;
                    case 'yes':
                        record.destroy(
                        /* TODO: create working callback
                        {callback :{
                            success:function (rec, op) {
                                Ext.create('widget.deletenotify', {response:op }).show();
                            },
                            failure:function (rec, op) {

                                Ext.create('widget.errornotify', {response:op}).show();
                            }
                        }}
                        */
                        );
                        store.load();
                        break;
                }
            }
        });
    }


});