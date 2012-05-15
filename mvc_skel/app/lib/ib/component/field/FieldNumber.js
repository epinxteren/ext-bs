/**
 * Numberfield that sets min value as 0 type as number and allowDecimals to false
 *
 */
Ext.define('Ext.ib.component.field.FieldNumber', {
    extend:'Ext.form.field.Number',
    alias:'widget.FieldNumber',
    minValue:0,
    allowDecimals:false,
    type:'number'
});