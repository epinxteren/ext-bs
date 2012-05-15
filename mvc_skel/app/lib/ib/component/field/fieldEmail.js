/**
 * Email field with the format and validator set
 *
 */
Ext.define('Ext.verz.form.field.Email', {
        extend:'Ext.form.field.Text',
        alias:'widget.emailfield',
        vtype:'email',
        type:'email'//set HTML 5 type will fallback to normal field when its not available
    }
);