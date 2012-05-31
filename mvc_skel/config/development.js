


Ext.log = function () {
    if(Ext.isDefined(console))
    {
        if(Ext.isDefined(console.log.apply))
        console.log.apply(console, arguments);
        else if(arguments.length == 1)
        console.log(arguments[0]);
        else
        console.log(arguments);
    }
};

Ext.error = function () {
    if(Ext.isDefined(console.log.error))
        console.error.apply(console, arguments);
    else if(arguments.length == 1)
        console.error(arguments[0]);
    else
        console.error(arguments);
};


Ext.warning = function () {
    if(Ext.isDefined(console.log.warning))
        console.warning.apply(console, arguments);
    else if(arguments.length == 1)
        console.warning(arguments[0]);
    else
        console.warning(arguments);
};


