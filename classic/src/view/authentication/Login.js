Ext.define('NavTest.view.authentication.Login', {
    extend: 'NavTest.view.authentication.LockingWindow',
    xtype: 'loginAudit',

    requires: [
        'NavTest.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],
    title: 'Let\'s Log In',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
    maximized: true,
    bodyStyle: {
        background: 'center/cover no-repeat url(resources/images/backGroundImg/ble.jpg) !important'
    },
    dockedItems: [{
        xtype: 'toolbar',
        height: 50,
        padding: 0,
        margin:0,
        dock: 'bottom',
        ui: 'logInToolbar',
        style: {
         //   background: 'linear-gradient(to right, #009ad9, #0081c8, #0069b5, #0050a0, #00388a)'
        },
        items: [{
            xtype: 'tbspacer',
            width:50
        },{
                xtype: 'image',
                cls: 'x-img header-right-profile-image x-box-item x-toolbar-item x-img-default',
                src: 'resources/images/snickers.png',
                alt: 'No Image!',
                height: 50,
                width: 150
        }, '->', {
                xtype: 'displayfield',
                value: 'Found us : ',
            }, {
                iconCls: 'x-fa',
                glyph: 'f082@FontAwesome',
                id:'facebook',
                ui: 'navBtn',
                handler: 'onFooterIconClick'
            }, {
                iconCls: 'x-fa',
                glyph: 'f099@FontAwesome',
                id: 'twitter',
                ui: 'navBtn',
                handler: 'onFooterIconClick'
            }, {
                iconCls: 'x-fa',
                glyph: 'f29e@FontAwesome',
                id: 'kaaudit',
                ui: 'navBtn',
                handler:'onFooterIconClick'
            }, {
                xtype: 'tbspacer',
                width: 20
            },]
    }],
    items: [
        {
            xtype: 'authdialog',
            defaultButton: 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            header: false,
            width: 450,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults: {
                margin: '5 0'
            },

            items: [
                {
                    xtype: 'displayfield',
                    ui: 'logInDisplayField',
                    value: 'Log in to your account'
                },
                {
                    xtype: 'textfield',
                    ui: 'logInTextFields',
                    name: 'userid',
                    bind: '{userid}',
                    height: 40,
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'User name'

                },
                {
                    xtype: 'textfield',
                    height: 40,
                    ui: 'logInTextFields',
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
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'logInBtns',
                    iconAlign: 'right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                },
                {
                    xtype: 'button',
                    ui:'logInBtns',
                    reference: 'forgetPassword',
                    scale: 'large',
                    iconAlign: 'right',
                    text: 'Forget Password',
                    listeners: {
                        click: 'onForgetPassword'
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
