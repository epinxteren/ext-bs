/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.ib.component.autoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.autoForm',
    
    mixins:{
        ModelIterator:'Ext.ib.mixin.ModelIterator'  
    },
        


    layout:'anchor',
    
    remove:false,    
                
    getDefualtXType:function(field){
        
        switch(field.type){
            case 'integer':
                return "FieldNumber";
            case 'string':
                return "FieldText";
            default:
                return "FieldText";

        }      
    }, 
        
    initComponent:function () {
        
        var me = this;
        
        var fields = [];
               
        me.modelForEach(function(field,index){                        
            var form =  field.ibOptions.form;    

            if(!Ext.isDefined(form.xtype))
                form.xtype = me.getDefualtXType(field);

            if(me.layout === 'anchor')
            {
                if(!Ext.isDefined(form.anchor))
                    form.anchor = '100%';
            }
            else if(!Ext.isDefined(form.flex))
                form.flex = 1;

            if(!Ext.isDefined(form.fieldLabel))
                form.fieldLabel = field.name;

            if(!Ext.isDefined(form.name))
                form.name = field.name;

            fields.push(form);

        },{//pass filter, only show colloms
            ibOptions:{
                form:{
            }
            }
        });               

        this.items = fields;
        
        ////////////////////////////////////////
        //Buttons     
        ////////////////////////////////////////            
        if(!Ext.isDefined(  me.buttons))
            me.buttons = [];             
    
        if(Ext.isDefined(me.remove)  && me.remove)
        {
            me.buttons.push({
                text:'Delete',
                handler:function () {
                    var objForm = this.up('form').getForm();
                    var record = objForm.getRecord();
                    if (Ext.isDefined(record)) {

                        objForm.reset();
                        this.up('form').setDisabled(true);

                        var store = Ext.getStore(me.store);
                        store.remove(record);
                        store.sync();
                    }
                }
            });
        }

        me.buttons.push({
            text:'Save',
            handler:function () {
                var objForm = this.up('form').getForm();
                if (objForm.isValid()) {
                    var record = objForm.getRecord();
                    objForm.updateRecord(record);
                    record.save();
                }
            }
        });    
        
        me.callParent(arguments);                
    }
    
    
});