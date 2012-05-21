
Ext.define('Ext.ib.mixin.ModelIterator', {
    
    store:'',
       
    /*
     *Check if the obj is accepted by the pasfilter
     *
     *pasfilter example:
     *
     *{
     *  name:undifined,//obj.name must excist, but can have any value
     *  values:{//values property must excist
     *      show:true //obj.values.show must have the same value, For this example: 'true'
     *  }
     *}
     *
     **/
    acceptFilter:function(obj,pasfilter){        
        if(Ext.isDefined(pasfilter)){         
            for(var key in pasfilter){                
                if(Ext.isDefined(obj[key]))
                {
                    if(Ext.isDefined(pasfilter[key]))
                    {
                        if(Ext.isObject(pasfilter[key]))
                        {
                            if(!this.acceptFilter(obj[key],pasfilter[key]))
                            {
                                return false;                                
                            }
                        }else if(obj[key] !== pasfilter[key])
                        {
                           return false;   
                        }                        
                    }
                }else
                {
                    return false;
                }                
            }                            
        }   
        return true;    
    },
    
   
    modelForEach:function(func,pasFilter /* Object */)
    {
        var me = this;        
        var store  = Ext.getStore(me.store);           
        var fields = store.model.getFields();     
        for(var i = 0; i < fields.length;i++)
        {
            if(this.acceptFilter(fields[i],pasFilter)){                
                func(fields[i],i);
            }                        
        }                             
    }

});