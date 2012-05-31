/**
 * Generic login form
 */
Ext.define('App.view.Login', {
    extend:'Ext.window.Window',
    alias:'widget.view.Login',

    id:'loginwindow',
    cls:'form-login-dialog',
    iconCls:'form-login-icon-title',
    width:420,
    height:210,
    resizable:false,
    closable:false,
    draggable:false,
    modal:true,
    closeAction:'hide',
    layout:'border',
    title:'Login',

    locales:{
        title:'login.Login'
    },

    initComponent:function () {



        var items = [
            {
                itemId:'userName',
                xtype:'textfield',
                fieldLabel:'Username',
                name:'userName',
                allowBlank:false,
                anchor:'100%',
                validateOnBlur:false,
                locales:{
                    fieldLabel:'login.username'
                }
            },
            {
                xtype:'textfield',
                fieldLabel:'Password',
                name:'password',
                allowBlank:false,
                inputType:'password',
                anchor:'100%',
                validateOnBlur:false,
                enableKeyEvents:true,
                locales:{
                    fieldLabel:'login.Password'
                },
                listeners:{
                    render:{
                        fn:function (field, eOpts) {
                            field.capsWarningTooltip = Ext.create('Ext.tip.ToolTip', {
                                target:field.bodyEl,
                                anchor:'top',
                                width:305,
                                html:'Caps lock warning'
                            });

                            // disable to tooltip from showing on mouseover
                            field.capsWarningTooltip.disable();
                        },
                        scope:this
                    },

                    keypress:{
                        fn:function (field, e, eOpts) {
                            var charCode = e.getCharCode();
                            if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
                                (!e.shiftKey && charCode >= 65 && charCode <= 90)) {

                                field.capsWarningTooltip.enable();
                                field.capsWarningTooltip.show();
                            }
                            else {
                                if (field.capsWarningTooltip.hidden === false) {
                                    field.capsWarningTooltip.disable();
                                    field.capsWarningTooltip.hide();
                                }
                            }
                        },
                        scope:this
                    },

                    blur:function (field) {
                        if (field.capsWarningTooltip.hidden === false) {
                            field.capsWarningTooltip.hide();
                        }
                    }
                }
            }
        ];

        if (Ib.config.locales.length > 1) {

            items.push({
                    xtype:'form',

                    layout:{
                        type:'hbox',
                        align:'middle'

                    },
                    border:0,
                    anchor:'100%',

                    defaults:{
                        labelWidth:85
                    },
                    items:[
                        {
                            xtype:'combobox',
                            fieldLabel:'&nbsp;',
                            queryMode:'local',
                            displayField:'text',
                            valueField:'abbr',
                            value:Ux.locale.Manager.getLanguage(),
                            flex:1,
                            store:Ux.locale.Manager.getAvailable(false),
                            locales:{
                                fieldLabel:'login.chooselanguage'
                            },
                            listConfig:{
                                getInnerTpl:function () {
                                    // here you place the images in your combo
                                    var tpl = '<div>' +
                                        '<img src="images/flags/png/{abbr}.png" align="left">&nbsp;&nbsp;' +
                                        '{text}</div>';
                                    return tpl;
                                }
                            },
                            listeners:{
                                change:function (cb, value) {
                                    Ux.locale.Manager.updateLocale(value);
                                    this.next('image').setSrc("images/flags/png/"+value+".png");
                                }
                            }
                        },
                        {
                            padding:"0 0 0 5",
                            xtype:'image',
                            src:"images/flags/png/"+Ux.locale.Manager.getLanguage()+".png",
                            height:15
                        }
                    ]
                }
            );
            this.height += 30;
        }

        Ext.apply(this, {
            items:[
                {
                    itemId:'headerPanel',
                    xtype:'panel',
                    cls:'form-login-header',
                    baseCls:'x-plain',
                    //html:'intro',
                    region:'north',
                    height:60,
                    items:[
                        {
                            xtype:'label',
                            locales:{
                                text:'login.intro'
                            }
                        }
                    ]
                },
                {
                    xtype:'form',
                    id:'loginform',
                    bodyPadding:10,
                    header:false,
                    region:'center',
                    border:false,
                    waitMsgTarget:true,
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    defaults:{
                        labelWidth:85
                    },
                    items:items
                }
            ],
            buttons:[
                {
                    id:'loginButton',
                    type:"submit",
                    action:"login",
                    formBind:true,
                    text:'Login',
                    locales:{
                        text:'login.Login'
                    },
                    ref:'../loginAction',
                    iconCls:'form-login-icon-login',
                    scale:'medium',
                    width:90
                }
            ]
        });
        this.callParent(arguments);
    },
    defaultFocus:'userName'
});