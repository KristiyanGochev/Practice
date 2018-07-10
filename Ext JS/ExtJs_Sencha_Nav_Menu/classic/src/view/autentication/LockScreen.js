Ext.define('PureAudit.view.authentication.LockScreen', {
    extend: 'PureAudit.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'PureAudit.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    title: 'Session Expired',

    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

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
                            height: 80,
                            margin: 20,
                            width: 80,
                            src: 'resources/images/profile-icon.png',
                            alt: 'lockscreen-image'
                        },
                        {
                            xtype: 'box',
                            html: '<div class=\'user-name-text\'> Kristiyan Gochev </div><div class=\'user-post-text\'> Project manager </div>'
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
                            fieldLabel: 'It\'s been a while. please enter your password to resume',
                            emptyText: 'Password',
                            inputType: 'password',
                            allowBlank: false,
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            iconAlign: 'right',
                            text: 'Login',
                            formBind: true,
                            listeners: {
                                click: 'onLoginAsButton'
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
