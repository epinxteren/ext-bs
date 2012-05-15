/**
 * url field with the format and validator set
 *
 */
Ext.define('Ext.verz.form.field.Url', {
        extend:'Ext.form.field.Text',
        alias:'widget.urlfield',
        vtype:'url',
        type:'url'//set HTML 5 type will fallback to normal field when its not available
    }
);