/**
 * Special reader that will check if we need to use the set root and total property or the default ones
 */
Ext.define('Ext.ib.data.Writer', {
        extend:'Ext.data.writer.Json',
        alias:'writer.IbWriter',
        /**
         * Formats the data for each record before sending it to the server. This
         * method should be overridden to format the data in a way that differs from the default.
         * @param {Ext.data.Model} record The record that we are writing to the server.
         * @param {Ext.data.Operation} [operation] An operation object.
         * @return {Object} An object literal of name/value keys to be written to the server.
         * By default this method returns the data property on the record.
         */
        getRecordData: function(record, operation) {

            var isPhantom = record.phantom === true,
                writeAll = this.writeAllFields || isPhantom,
                nameProperty = this.nameProperty,
                fields = record.fields,
                fieldItems = fields.items,
                data = {},
                clientIdProperty = record.clientIdProperty,
                changes,
                name,
                names,
                parents,
                field,
                associations = record.associations ?  record.associations : undefined,
                key,
                f, fLen;

            if (writeAll) {
                fLen = fieldItems.length;

                for (f = 0; f < fLen; f++) {
                    field = fieldItems[f];

                    if (field.persist) {
                        name = field[nameProperty] || field.name;
                        if(field.isAssosiation){
                            data[name] = {};
                            data[name][field.foreignKey] = record.get(field.name);
                        } else {
                            data[name] = record.get(field.name);
                        }
                    }
/**
 * For this there is always a field with a associations belongsTo needed
 */
//                   else
//                    if (Ext.isDefined(field.belongsTo))
//                    {
//                        names   =  field.belongsTo.split(".");
//                        var association =  names.splice(0,1);
//                        key     =  names.splice(names.length-1,names.length);
//
//                        if(!Ext.isDefined(data[association]))
//                            data[association] = {};
//
//                        data[association][key] = record.get(field.name);
//                    }
                }
            } else {
                // Only write the changes
                changes = record.getChanges();
                for (key in changes) {
                    if (changes.hasOwnProperty(key)) {
                        field      = fields.get(key);
                        name       = field[nameProperty] || field.name;
                        data[name] = changes[key];
                    }
                }
            }

            /**
             * Add's the assosiation id fields to the data
             */
            if(associations)
            {
                Ext.each(associations.items,function(item){
                    var persist = item.persist ? item.persist : true;
                    if(persist  && item.type === 'belongsTo')
                    {
                        names   =  item.primaryKey.split(".");
                        parents =  names.splice(0,names.length-1);
                        key     =  names.splice(names.length-1,names.length);

                        var reference = data;

                        Ext.each(parents,function(k){
                              if(!Ext.isDefined(reference[k]))
                              reference[k] = {};
                              reference = reference[k];
                        },this);

                        var getterName = item.getterName ? item.getterName : "get"+item.associatedName;

                        var foreignRecord      = record[getterName]();

                        reference[key] =foreignRecord.get(item.foreignKey);
                    }
                },this);
            }

            if(isPhantom) {
                if(clientIdProperty && operation && operation.records.length > 1) {
                    // include clientId for phantom records, if multiple records are being written to the server in one operation.
                    // The server can then return the clientId with each record so the operation can match the server records with the client records
                    data[clientIdProperty] = record.internalId;
                }
            } else {
                // always include the id for non phantoms
                data[record.idProperty] = record.getId();
            }
            return data;
        }

    }
);
