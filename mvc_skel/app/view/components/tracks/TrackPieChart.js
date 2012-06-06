/**
 * Created with JetBrains PhpStorm.
 * User: epinxteren
 * Date: 16-5-12
 * Time: 16:13
 * To change this template use File | Settings | File Templates.
 */

Ext.define('App.view.components.tracks.TrackPieChart', {
    extend:'Ext.chart.Chart',
    alias:'widget.components.TrackPieChart',
    mixins:{
        Filter:'Ext.ib.mixin.Filter'
    },



    animate: true,

    itemId:undefined,

    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'milliseconds',
        showInLegend: true,
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }],

    setAlbumId:function(id)
    {
        this.itemId = id;
        this.createFilter();
    },

    createFilter:function()
    {
        var me = this;
        if(Ext.isDefined(me.itemId))
        {
            me.filters =[{
                property:"album",
                value:me.itemId
            }];
            me.enableFilter();
        }else
        {
            me.filters = [];
        }
    },

    initComponent:function () {
        var me = this;

        me.store = Ext.create('App.store.Tracks',{storeId:undefined,buffered:false});
        me.store.disablePagin();

        this.createFilter();
        this.callParent(arguments);
    }

});
