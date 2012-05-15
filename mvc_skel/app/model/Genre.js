Ext.define('Genre', {
    extend:'Ext.data.Model',
    idProperty:'GenreId',
    fields:[
        {name:'GenreId', type:'integer'},
        {name:'Name', type:'string'}
    ],
    hasMany:{
        model:'Track',
        name:'tracks',
        primarykey:'GenreId',
        foreignkey:'GenreId'
    },
    proxy:{
        noCache:false,
        type:'ajax',
        url:'app/data/ChinookData.xml',
        reader:{
            record:'Genre',
            type:'xml',
            root:'ChinookDataSet'
        }
    }
});
