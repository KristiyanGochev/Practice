Ext.define('NavTest.view.authentication.LockScreen', {
    extend: 'NavTest.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'NavTest.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    title: 'Screen locked',
    maximized: true,
    id:'lockScreen-window',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well
    bodyStyle: {
        background: 'center/cover no-repeat url(resources/images/backGroundImg/work-desk-background-9.jpg) !important'
    },
    items: [
        {
            xtype: 'authdialog',
            reference: 'authDialog',
            defaultButton: 'loginButton',
            autoComplete: false,
            width: 455,
            defaultFocus: 'textfield[inputType=password]',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [
                {
                    xtype: 'container',
                    height: 120,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'image',
                            height: 100,
                            margin: 20,
                            width: 100,
                            src: 'resources/images/user-profile/kris.png',
                            alt: 'lockscreen-image',
                            style: {
                                borderRadius: '40px'
                            }
                        },
                        {
                            xtype: 'container',
                            layout:'vbox',
                            items: [{
                                                        
                                    xtype: 'displayfield',
                                    ui: 'logInDisplayField',
                                    value: '<div class=\'user-name-text\'> Kristiyan Gochev </div>'
                                
                            }, {
                                                            
                                    xtype: 'displayfield',
                                    ui: 'logInDisplayField',
                                    value: '<div class=\'user-post-text\'> Project manager </div>'
                                
                                }]
                        }
                    ]
                },

                {
                    xtype: 'container',
                    padding: '0 20',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '10 0'
                    },

                    items: [
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            labelSeparator: '',
                            ui: 'logInTextFields',
                            fieldLabel: 'Please enter your password to resume',
                            emptyText: 'Password',
                            inputType: 'password',
                            allowBlank: false,
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',

                            ui: 'logInBtns',
                            scale: 'large',
                            iconAlign: 'right',
                            text: 'Login',
                            formBind: true,
                            listeners: {
                                click: 'onLoginAsButton'
                            }
                        },
                        {
                            xtype: 'button',
                            reference: 'logOutBtn',
                            ui: 'logInBtns',
                            scale: 'large',
                            iconAlign: 'right',
                            text: 'Logout',
                            disabled: false,
                            listeners: {
                                click: 'onLogoutFromLockScreenBtn'
                            }
                        },
                        {
                            xtype: 'component',
                            html: '<div style="text-align:right">' +
                                '<a href="#loginAudit"' +
                                'or, sign in using other credentials</a>' +
                                '</div>'
                        }
                    ]
                }
            ]
        }
    ]
});
