Ext.define("Ext.ib.Model", {
    /*
     * @cfg {Object} fields will hold the fields for this model
     */
    extend:"Ext.data.Model",
    //override : 'Ext.data.Model',

    autoLoad:false,

    initComponent : function() {
        var me = this;


        debugger;


        me.callOverridden(arguments);
    },

    getAssociationField:function (fieldName) {
        var me = this;
        for (var i in me.fields.items) {
            var field = me.fields.items[i];
            if (Ext.isDefined(field.belongsTo) && fieldName === field.name) {
                return field;
            }
        }
        return null;
    },

    getAssociationByField:function (field) {
        var associationName = field.belongsTo.split(".").splice(0, 1)[0];
        for (var a  in this.associations.items) {
            var association = this.associations.items[a];
            if (association.name === associationName) {
               return association;
            }
        }
        return null;
    },

    setAssociation:function (fieldName, newValue) {
        var me = this;
        var field = this.getAssociationField(fieldName);
        if (field != null) {

            var association  = this.getAssociationByField(field);

            if(association === null)
            {
                Ext.error("association not found:"+field.belongsTo);
                return;
            }


            if (newValue === null) {
                //

            } else {

                var store = Ext.isDefined(association.store) ? Ext.getStore(association.store) : Ext.create("Ext.ib.Store", {
                    model:association.model
                });
                if(store === null)
                {
                    Ext.error("Store not found "+ association.store);
                }
                var record  = store.getById(newValue);

                if(record != null)
                {
                    var getterName = association.getterName ? association.getterName : "get"+association.associatedName;
                    var setterName = association.setterName ? association.setterName : "set"+association.associatedName;

                    //this[setterName](newValue);//This will update this record,

                    var currentAssociation = me[getterName]();

                    for(var d  in record.data)
                    {
                        currentAssociation.set(d,record.data[d]);
                    }
                    currentAssociation.setId(newValue);


                }
            }
        }
    },

    set:function (fieldName, newValue) {
        var me = this;
        if (Ext.isObject(fieldName)) {
            for (var k in fieldName) {
                this.setAssociation(k, fieldName[k]);
            }
        } else {
            this.setAssociation(fieldName, newValue);
        }
        me.callOverridden(arguments);
    }


});