Ext.define('PlayList', {
    extend:'Ext.data.Model',
    idProperty:'PlayListId',
    fields:[
        {name:'PlayListId', type:'integer'},
        {name:'Name', type:'string'}
    ],
    hasMany:{
        model:'PlayListTrack',
        name:'PlayListTracks',
        primarykey:'PlayListId',
        foreignkey:'PlayListId'
    },
    proxy:{
        noCache:false,
        type:'ajax',
        url:'app/data/ChinookData.xml',
        reader:{
            record:'PlayList',
            type:'xml',
            root:'ChinookDataSet'
        }
    }
});

