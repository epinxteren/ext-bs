/**
 * Idbutton allows for the adding of ids to the text and link at a later moment
 *
 */
Ext.define('Ext.verz.button.IdButton', {
    extend:'Ext.verz.button.Base',
    alias:'widget.idbutton',
    text:'Default text',
    defaultText:'Default text %s',
    objectId:0,
    defaultLink:'%s',
    link:"",
    setObjectId:function (id) {
        this.objectId = id;

        var regexp = new RegExp('\%s', 'gi');
        var formatted = this.defaultText.replace(regexp, id);
        this.link = this.defaultLink.replace(regexp, id);
        this.setText(formatted);
    },
    listeners:{
        click:{
            fn:function () {
                Ext.History.add(this.link);
            }
        }
    }
});