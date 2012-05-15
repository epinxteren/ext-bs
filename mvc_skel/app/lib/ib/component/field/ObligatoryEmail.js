/**
 * Obligatory text
 *
 */
Ext.define('Ext.verz.form.field.ObligatoryEmail', {
        extend:'Ext.verz.form.field.Email',
        alias:'widget.obligatoryemail',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);