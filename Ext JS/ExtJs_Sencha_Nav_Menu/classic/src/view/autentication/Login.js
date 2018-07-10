Ext.define('PureAudit.view.authentication.Login', {
    extend: 'PureAudit.view.authentication.LockingWindow',
    xtype: 'loginAudit',

    requires: [
        'PureAudit.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],
    maximized: false,
    title: 'Let\'s Log In',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            defaultButton: 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            header: false,
            width: 415,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults: {
                margin: '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: 'Sign into your account'
                },
                {
                    xtype: 'textfield',
                    name: 'userid',
                    bind: '{userid}',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'User name'

                },
                {
                    xtype: 'textfield',
                    height: 55,
                    hideLabel: true,
                    emptyText: 'Password',
                    inputType: 'password',
                    name: 'password',
                    bind: '{password}',
                    allowBlank: false
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            height: 30,
                            bind: '{persist}',
                            boxLabel: 'Remember me'
                        },
                        {
                            xtype: 'box',
                            html: '<a href="#passwordreset" class="link-forgot-password"> Forgot Password ?</a>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    iconAlign: 'right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                }
                //,
                //{
                //    xtype: 'box',
                //    html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //    margin: '10 0'
                //},
                //{
                //    xtype: 'button',
                //    scale: 'large',
                //    iconAlign: 'right',
                //    text: 'Login with Facebook',
                //    listeners: {
                //        click: 'onFaceBookLogin'
                //    }
                //},
                //{
                //    xtype: 'box',
                //    html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //    margin: '10 0'
                //},
                //{
                //    xtype: 'button',
                //    scale: 'large',
                //    iconAlign: 'right',
                //    text: 'Create Account',
                //    listeners: {
                //        click: 'onNewAccount'
                //    }
                //}
            ]
        }
    ],

    initComponent: function () {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
