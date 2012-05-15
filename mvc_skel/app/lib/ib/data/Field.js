/**
 * Datafield that holds extra configs
 */
Ext.define('Ext.ib.data.Field', {
    extend:'Ext.data.Field',
    alias:'widget.IbField'
    /**
     * @cfg {Boolean} showInGrid will show this field in the grid when autofill is true
     */

    /**
     * @cfg {Boolean} isSearchable will show this field in the grid when useAutoColumns is true
     */

    /**
     * @cfg {Object} renderOpts object that will hold differnt configs/settings to render the field
     * @cfg {Array} renderOpts.radioFields indicates that this field should be a radiogroup and holds the items as you would give to an Ext.form.RadioGroup
     * @cfg {Array} renderOpts.checkFields indicates that this field should be a checkboxgroup and holds the items as you would give to an Ext.form.CheckboxGroup
     * @cfg {Boolean} renderOpts.isBetween will render the field as a between field it will create 2 fields with the  postfix _from _until the fields will keep their type
     * @cfg {Boolean} renderOpts.isBetweenTomorrowToday will render the field as a between field it will create 2 fields with the  postfix _from _until the fields will keep their type
     * @cfg {Boolean} renderOpts.useTime used for date fields to indicate that it should be rendered inclusive the time
     * @cfg {Boolean} renderOpts.isEmail is used in the grid to make a link of the email
     * @cfg {Object} renderOpts.combobox used when we should show a combobox. use the same configs as for a normal combobox see Ext.form.field.ComboBox
     * keep in mind that the store should be included in the controller that displays the combobox
     */

    /**
     * @cfg {Number} [searchColumn=1] in what column should the item be showed
     */

    /**
     * @cfg {Number} searchPosition at what position should the field come (what order should fields be displayed) default
     * it will be entered at the end. This also makes is possible to manual define search fields in a column and let the
     * autofill add a field in between the excisting fields
     */

    /**
     * @cfg {String} gridLabel default the label for the grid is the (translated) dataindex this allows for a custom label
     */

    /**
     * @cfg {String} searchLabel default the label for the search is the (translated) dataindex this allows for a custom label
     */
});


var st = Ext.data.SortTypes;

Ext.apply(Ext.data.Types,
    {
        EMAIL:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'email'
        },
        TEXT:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'text'
        },
        HTMLFIELD:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'htmlfield'
        },
        TINYMCE:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'tinymce'
        },
        ATTACHMENT:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'attachment'
        },
        LIST:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'list'
        },
        RADIOTEXT:{
            convert:function (v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType:st.asUCString,
            type:'radiotext'
        }
    });