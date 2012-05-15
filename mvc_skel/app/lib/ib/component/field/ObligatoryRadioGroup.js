/**
 * Obligatory textarea
 *
 */
Ext.define('Ext.verz.form.field.ObligatoryRadioGroup', {
        extend:'Ext.form.RadioGroup',
        alias:'widget.obligatoryradiogroup',
        allowBlank:false,
        afterLabelTextTpl :'<span class=\'x-label-obligatoryField\'></span>'
    }
);