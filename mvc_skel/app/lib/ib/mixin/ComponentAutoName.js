Ext.define('Ext.ib.mixin.ComponentAutoName', {

    store:'',

    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator'
    },


    initAutoLocal:function (componentName, nameType) {
        if(!Ext.isDefined(this.locales) || this.locales == null)
        {
            this.locales = {};
        }
        var text =  {
            defaultText : this[nameType],
            key        : this.getAutoName(componentName, nameType, this[nameType])
        };
        this.locales[nameType] = text;
    },

    /*
     *@arg componentName The name of component  (grid/edit/detail etc)
     *@arg nameType      The type of name like label/text
     *@arg Defualt       If not excist, Defualt types
     */
    getAutoName:function (componentName, nameType, Defualt) {
        var totalName = componentName + capitaliseFirstLetter(nameType);
        if (!Ext.isString(Defualt))
            Defualt = totalName;

        function capitaliseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        var model = this.getModel().prototype;
        if (Ext.isDefined(model.ibOptions) && Ext.isDefined(model.ibOptions.names)) {
            var names = model.ibOptions.names;

            if (Ext.isDefined(names[totalName])) {
                return names[totalName];
            } else if (Ext.isDefined(names['basic'])) {
                return  function(translate)
                        {
                            return  translate("components."+componentName,"components."+componentName) + " " + translate(names['basic'],Defualt) ;
                        };
            } else {
                return Defualt;
            }
        } else {
            return Defualt;
        }
    }

});