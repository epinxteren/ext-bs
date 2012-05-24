/**
 * Generate password button
 *
 */
Ext.define('Ext.ib.button.GeneratePassword', {
    extend:'Ext.ib.button.Base',
    alias:'widget.generatepasswordbutton',
    text:'generate_password',
    action:'generatepasswords',
    passWordLenght:12,
    margin:'0 0 0 20',
    /**
     * The handler will create a passord when the button is pushed
     */
    handler:function () {
        var field = this.up('container').down('textfield');
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var pass = "";
        for (var x = 0; x < this.passWordLenght; x++) {
            var i = Math.floor(Math.random() * 62);
            pass += chars.charAt(i);
        }

        //make sure there is at least one number in the password
        if (!(/\d/.test(pass) && /[A-Za-z]/.test(pass))) {
            var pos = Math.floor(Math.random() * (this.passWordLenght - 1));
            pass = pass.substr(0, pos) + Math.floor(Math.random() * 10) + pass.substr(pos + 1)
        }
        field.setValue(pass);
        /**
         * show password so it can be copied
         */
        field.inputEl.set({type:'text'});
    }
});