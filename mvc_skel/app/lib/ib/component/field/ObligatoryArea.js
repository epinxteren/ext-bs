/**
 * Obligatory textarea
 *
 */
Ext.define('Ext.ib.form.field.ObligatoryArea', {
        extend:'Ext.form.field.TextArea',
        alias:'widget.obligatoryarea',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);