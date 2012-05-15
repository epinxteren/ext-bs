/**
 * Obligatory textarea
 *
 */
Ext.define('Ext.verz.form.field.ObligatoryComboBox', {
        extend:'Ext.form.field.ComboBox',
        alias:'widget.obligatorycombobox',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);