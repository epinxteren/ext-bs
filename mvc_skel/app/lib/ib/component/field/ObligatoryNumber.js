/**
 * Obligatory number
 *
 */
Ext.define('Ext.ib.form.field.ObligatoryNumber', {
        extend:'Ext.ib.form.field.Number',
        alias:'widget.obligatorynumber',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);