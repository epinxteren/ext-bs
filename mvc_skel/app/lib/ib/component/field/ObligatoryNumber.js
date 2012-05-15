/**
 * Obligatory number
 *
 */
Ext.define('Ext.verz.form.field.ObligatoryNumber', {
        extend:'Ext.verz.form.field.Number',
        alias:'widget.obligatorynumber',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);