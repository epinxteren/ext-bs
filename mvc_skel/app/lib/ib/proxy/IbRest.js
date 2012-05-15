Ext.apply(Ext.Ajax, {

    filterParam:'filter',
    sortParam:'sort',
    /**
     * Overwrite the normal Ext.ajax.setOptions to be able to generate a normal query string
     *
     * @param {Object} options The initial options
     * @param {Object} scope The scope to execute in
     * @return {Object} The params for the request
     */
    setOptions:function (options, scope) {


        var me = this,
            params = options.params || {},
            extraParams = me.extraParams,
            urlParams = options.urlParams,
            url = options.url || me.url,
            jsonData = options.jsonData,
            method,
            disableCache,
            data;

        // allow params to be a method that returns the params object
        if (Ext.isFunction(params)) {
            params = params.call(scope, options);
        }

        // allow url to be a method that returns the actual url
        if (Ext.isFunction(url)) {
            url = url.call(scope, options);
        }

        url = this.setupUrl(options, url);

        //<debug>
        if (!url) {
            Ext.Error.raise({
                options:options,
                msg:'No URL specified'
            });
        }
        //</debug>

        // check for xml or json data, and make sure json data is encoded
        data = options.rawData || options.xmlData || jsonData || null;
        if (jsonData && !Ext.isPrimitive(jsonData)) {
            data = Ext.encode(data);
        }

        var filterParams = null;
        if (!Ext.isEmpty(params[this.filterParam]) && Ext.isObject(params[this.filterParam])) {
            filterParams = Ext.Object.toQueryString(params[this.filterParam], true);
            delete params[this.filterParam];
        }

        var sorterParams = null;
        if (!Ext.isEmpty(params[this.sortParam]) && Ext.isObject(params[this.sortParam])) {
            sorterParams = Ext.Object.toQueryString(params[this.sortParam], true);
            delete params[this.sortParam];
        }

        if (Ext.isObject(params)) {
            params = Ext.Object.toQueryString(params);
        }

        if (!Ext.isEmpty(filterParams)) {
            params = params + ((filterParams) ? ((params) ? '&' : '') + filterParams : '');
        }
        if (!Ext.isEmpty(sorterParams)) {
            params = params + ((sorterParams) ? ((params) ? '&' : '') + sorterParams : '');
        }

        if (Ext.isObject(extraParams)) {
            extraParams = Ext.Object.toQueryString(extraParams);
        }

        params = params + ((extraParams) ? ((params) ? '&' : '') + extraParams : '');

        urlParams = Ext.isObject(urlParams) ? Ext.Object.toQueryString(urlParams) : urlParams;

        params = this.setupParams(options, params);

        // decide the proper method for this request
        method = (options.method || me.method || ((params || data) ? 'POST' : 'GET')).toUpperCase();
        this.setupMethod(options, method);

        disableCache = options.disableCaching !== false ? (options.disableCaching || me.disableCaching) : false;
        // if the method is get append date to prevent caching
        if (method === 'GET' && disableCache) {
            url = Ext.urlAppend(url, (options.disableCachingParam || me.disableCachingParam) + '=' + (new Date().getTime()));
        }

        // if the method is get or there is json/xml data append the params to the url
        if ((method == 'GET' || data) && params) {
            url = Ext.urlAppend(url, params);
            params = null;
        }

        // allow params to be forced into the url
        if (urlParams) {
            url = Ext.urlAppend(url, urlParams);
        }

        return {
            url:url,
            method:method,
            data:data || params || null
        };
    }
});

/**
 * Rest proxy that will automaticly add the 'accept':'application/vnd.verzekeringssite.api+json' header
 * and makes it possible to add a template baseurl and urlValues
 */
Ext.define("Ext.ib.proxy.IbRest", {
    extend:"Ext.data.proxy.Rest",
    alias:'proxy.IbRest',
    filterParam:'filter',

    /*
     headers:{
     'accept':'application/vnd.verzekeringssite.api+json'
     },
     */


    requires:[
        'Ext.ib.data.Reader',
        'Ext.ib.data.Writer'
    ],

    startParam:'offset',
    reader:{
        lisseners:{
            exception:function( reader, response, error,  eOpts )//exception( Ext.data.reader.Reader reader, XMLHttpRequest response, Ext.data.ResultSet error, Object eOpts )
            {
                    Ext.error("Ext.ib.proxy.IbRest Reader",error);
            }
        },
        type:'IbReader',
        collectionRoot:'items',
        collectionMetaRoot:'meta',
        collectionTotalProperty:"total_number_of_items"
    },

    writer:{
        type:'IbWriter'
    },

    /**
     * @cfg {String} baseUrl Use [[name]] to add a placeholder for an value when this is set the build url will
     * use this config and the urlValues config to construct an url
     */
    baseUrl:null,
    baseDetailUrl:null,
    /**
     * @cfg {Array} urlValues expects an array with key:value where the key is the placeholder in the base url and value is the
     * value you want to add on that place
     */
    urlValues:{},
    appendId:true,
    /**
     * Overwrites builds url to be able to create an url from base url and url values
     * @param request
     */
    buildUrl:function (request) {
        var me = this;

        me.parseBaseUrl(me.baseUrl);
        if (me.baseUrl !== null) {
            this.url = me.parseBaseUrl(me.baseUrl)
        }
        return me.callParent(arguments);
    },

    /**
     * Parses the url and adds the values on the placeholders
     * @param url
     */
    parseBaseUrl:function (url) {
        var parsed = url;
        Ext.iterate(this.urlValues,
            function (key, value) {
                var regexp = new RegExp('\\[\\[' + key + '\\]\\]', 'gi');
                parsed = parsed.replace(regexp, value);
            },
            this
        );
        return parsed;
    },

    /**
     * Overwrite the encode filters function so we can give an Object to the filters that will be converted into a
     * query string in the Ajax request
     *
     * @param filterar
     * @return {*}
     */
    encodeFilters:function (filterar) {
        var filters = null;
        var i = 0;
        var length = filterar.length;
        if (length > 0) {
            filters = {};
            filters[this.filterParam] = {};
        }
        for (; i < length; i++) {
            filters[this.filterParam][filterar[i].property] = filterar[i].value;
        }

        return filters;
    },

    /**
     * Encodes the array of {@link Ext.util.Sorter} objects into a string to be sent in the request url. By default,
     * this simply JSON-encodes the sorter data
     * @param {Ext.util.Sorter[]} sorters The array of {@link Ext.util.Sorter Sorter} objects
     * @return {String} The encoded sorters
     */
    encodeSorters: function(sortersAr) {
        var sorters = null;
        var i = 0;
        var length = sortersAr.length;
        if (length > 0) {
            sorters = {};
            sorters[this.sortParam] = {};
        }
        for (; i < length; i++) {
            sorters[this.sortParam][sortersAr[i].property] = sortersAr[i].direction;
        }

        return sorters;
    }
});
