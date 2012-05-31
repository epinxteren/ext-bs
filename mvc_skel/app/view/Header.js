/**
 * Header
 */
Ext.define('App.view.Header', {
    extend:'Ext.panel.Panel',
    alias:'widget.view.Header',
    layout:'column',
    id:'header',
    items:[
        {
            xtype:'container',
            columnWidth:.80,
            html:'<image src="./images/logo.gif">',
            border:'none'
        },
        {
            xtype:'container',
            columnWidth:.20,
            items:[
                {
                    xtype:'container',
                    items:[{
                      xtype:'label',
                        locales : {
                            text : 'login.Log_in_as'
                        }
                    }],
                    border:'none',
                    id:'loggedin'
                },
                {
                        flex:1,
                        id:'logoutButton',
                        xtype:'button',
                        iconAlign:'right',
                        iconCls:'logout',
                        text:'Logout',
                        locales : {
                            text : 'login.Logout'
                        },
                        margin:'5 0 0 0',
                        action:'logout'
                 }

            ],
            border:'none'
        }
    ]
});