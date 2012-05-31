/**
 * Obligatory text
 *
 */
Ext.define('Ext.ib.form.field.ObligatoryEmail', {
        extend:'Ext.ib.form.field.Email',
        alias:'widget.obligatoryemail',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);