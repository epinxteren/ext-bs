/**
 * Obligatory textarea
 *
 */
Ext.define('Ext.ib.form.field.ObligatoryComboBox', {
        extend:'Ext.ib.field.ComboBox',
        alias:'widget.obligatorycombobox',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);