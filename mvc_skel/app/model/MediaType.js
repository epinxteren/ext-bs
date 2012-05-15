Ext.define('MediaType', {
    extend:'Ext.data.Model',
    idProperty:'MediaTypeId',
    fields:[
        {name:'MediaTypeId', type:'integer'},
        {name:'Name', type:'string'}
    ],
    hasMany:{
        model:'Track',
        name:'tracks',
        primarykey:'MediaTypeId',
        foreignkey:'MediaTypeId'
    },
    proxy:{
        noCache:false,
        type:'ajax',
        url:'app/data/ChinookData.xml',
        reader:{
            record:'MediaType',
            type:'xml',
            root:'ChinookDataSet'
        }
    }
});
