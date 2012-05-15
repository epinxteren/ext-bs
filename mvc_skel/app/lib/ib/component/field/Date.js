/**
 * Date field with the formats set
 *
 */
Ext.define('Ext.verz.form.field.Date', {
        extend:'Ext.form.field.Date',
        alias:'widget.vzsdatefield',
        format:Vzs.config.dateFormat,
        altFormats:Vzs.config.altDateFormat
    }
);