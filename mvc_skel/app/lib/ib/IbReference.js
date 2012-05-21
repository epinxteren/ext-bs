
Ext.define('Ext.ib.IbReference', {});//No error by require


Ext.require(
    [
        /* proxy */

        'Ext.ib.proxy.IbRest',
        /* model */

        'Ext.ib.Model',
        
        /* mixins */
        
        'Ext.ib.mixin.ModelIterator',
        'Ext.ib.mixin.FieldCreator',
        //'Ext.verz.data.Field',
        //'Ext.verz.window.FormWindow',

        /* notifications */
        'Ext.ib.notify.Base',
        'Ext.ib.notify.Download',
        'Ext.ib.notify.Error',
        'Ext.ib.notify.Save',
        'Ext.ib.notify.Upload',
        'Ext.ib.notify.Send',
        'Ext.ib.notify.Delete',
        /* components */
        'Ext.ib.component.AutoGrid',//'Ext.verz.Grid',
                       
        /* store */
        'Ext.ib.Store',
        /* buttons */
        //'Ext.verz.button.Base',
        //'Ext.verz.button.Save',
        //'Ext.verz.button.Next',
        //'Ext.verz.button.Previous',
        //'Ext.verz.button.Cancel',
        //'Ext.verz.button.Add',
        //'Ext.verz.button.Delete',
        //'Ext.verz.button.Search',
        //'Ext.verz.button.Reset',
        //'Ext.verz.button.IdButton',
        //'Ext.verz.button.GeneratePassword',
        //'Ext.verz.button.Export',
        //'Ext.verz.button.Send',

        /* form fields */
         'Ext.ib.component.AutoForm',//'Ext.verz.Form',

        //'Ext.verz.form.field.Date',
        //'Ext.verz.form.field.ObligatoryText',
        //'Ext.verz.form.field.ObligatoryNumber',
        //'Ext.verz.form.field.ObligatoryArea',
        //'Ext.verz.form.field.ObligatoryRadioGroup',
        'Ext.ib.component.field.FieldComboBox',//'Ext.verz.form.field.ComboBox',
        //'Ext.verz.form.field.ObligatoryComboBox',
        //'Ext.verz.form.field.Logo',
        //'Ext.verz.form.field.Email',
        //'Ext.verz.form.field.Url',
        //'Ext.verz.form.field.ObligatoryEmail',
        'Ext.ib.component.field.FieldNumber',//'Ext.verz.form.field.Number',
        //'Ext.verz.form.field.CheckBox',
        //'Ext.verz.form.field.RadioText',
        //'Ext.verz.form.field.MultiFileUpload',
        'Ext.ib.component.field.FieldText',
           
           
           
        /* relations */
        //'Ext.verz.form.relations.ManyToOne',

        /* plugins html editor */
        //'Ext.verz.form.tinymce.WindowManager',

        /* error handler */
        //'Ext.verz.util.ErrorHandler',
        //'Ext.verz.panel.Base',
        //'Ext.verz.panel.Search',

        /* Utils */
        'Ext.ib.utils.Utils'
]);


Ext.log("IbReference loaded");