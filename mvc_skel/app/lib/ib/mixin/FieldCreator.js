



Ext.define('Ext.ib.mixin.FieldCreator', {

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
    createField:function(field,form){
        if(!Ext.isDefined(form.xtype))
            form.xtype = this.getDefualtXtype(field);

        return form;
    }
});