/**
 * Special reader that will check if we need to use the set root and total property or the default ones
 */
Ext.define('Ext.ib.data.Reader', {
        extend:'Ext.data.reader.Json',
        alias:'reader.IbReader',

        altTotal:'total',

        /**
         * Overwrite the read records as we need to check the data if the set root is availale if its not use the default
         * root and total property
         *
         * @param {Object[]} data data received from the api
         */
        readRecords:function (data) {
            var me = this;

            if (Ext.isEmpty(data[me.collectionMetaRoot]) || !Ext.isDefined(data[me.collectionMetaRoot][me.collectionTotalProperty])) {
                me.totalProperty =  me.altTotal;
            } else {
                me.totalProperty = me.collectionMetaRoot + '.' + me.collectionTotalProperty;
            }

            if (!Ext.isDefined(data[me.collectionRoot])) {
                me.root = "";
            } else {
                me.root = me.collectionRoot;
            }
            return this.callParent(arguments)
        }
    }
);