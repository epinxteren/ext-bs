/**
 * textbox that will use uncheckedValue and inputValue for saving instead true/false
 *
 */
Ext.define('Ext.verz.form.field.CheckBox', {
        extend:'Ext.form.field.Checkbox',
        alias:'widget.verzcheckbox',
        inputValue:1,
        uncheckedValue:0,
        /**
         * Returns the checked state of the checkbox.
         * @return {Boolean} True if checked, else false
         */
        getRawValue:function () {
            return this.checked;
        },

        /**
         * Returns the checked state of the checkbox.
         * @return {Boolean} True if checked, else false
         */
        getValue:function () {
            return this.getSubmitValue();
        },

        /**
         * Returns the submit value for the checkbox which can be used when submitting forms.
         * @return {Boolean/Object} True if checked; otherwise either the {@link #uncheckedValue} or null.
         */
        getSubmitValue:function () {
            var unchecked = this.uncheckedValue,
                uncheckedVal = Ext.isDefined(unchecked) ? unchecked : null;
            return this.checked ? this.inputValue : uncheckedVal;
        }
    }
);
