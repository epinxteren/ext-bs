/**
 * Verz combobox to implement some standard settings and add custom functionality for seaching
 *
 */
Ext.define('Ext.ib.component.field.FieldComboBox', {
    extend:'Ext.form.field.ComboBox',
    alias:'widget.FieldComboBox',

    /**
     * @cfg the field we want to use in the query if not set name will be used
     */
    queryFilterField:undefined,
    queryParam:'filter',
    typeAhead:true,
    forceSelection:true,
    pageSize:25,
    queryMode:'remote',
    minChars:2,
    valueNotFoundText:"not_found",//translate("not_found"),

    /**
     * Will create the search query for this combobox.
     * this is an overwrite of combobox so the query can behave the same as normal filters
     *
     * @param queryString
     * @return {Object}
     */
    getParams:function (queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = {};
            params[param][param] = {};
            params[param][param][this.queryFilterField] = queryString;
        }
        return params;
    },

    initComponent:function () {
        var me = this;

        if(Ext.isEmpty(me.queryFilterField)) {
            me.queryFilterField = me.name;
        }
        me.callParent(arguments);
    }
});