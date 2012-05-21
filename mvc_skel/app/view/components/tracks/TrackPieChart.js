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

    xtype: 'chart',

    animate: true,

    store: 'Tracks',

    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'data1',
        showInLegend: true,
        donut: donut,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                //calculate percentage.
                var total = 0;
                store1.each(function(rec) {
                    total += rec.get('data1');
                });
                this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
            }
        },
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
    }]




});
