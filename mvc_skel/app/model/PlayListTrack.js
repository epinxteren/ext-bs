Ext.define('PlayListTrack', {
    extend:'Ext.data.Model',
    idProperty:'PlayListId',// TODO: Heeft geen id prop
    fields:[
        {name:'PlayListId', type:'integer'},
        {name:'TrackId', type:'integer'}
    ],
    hasMany:{
        model:'Track',
        name:'tracks',
        primarykey:'TrackId',
        foreignkey:'TrackId'
    },
    proxy:{
        noCache:false,
        type:'ajax',
        url:'app/data/ChinookData.xml',
        reader:{
            record:'PlayListTrack',
            type:'xml',
            root:'ChinookDataSet'
        }
    }
});

