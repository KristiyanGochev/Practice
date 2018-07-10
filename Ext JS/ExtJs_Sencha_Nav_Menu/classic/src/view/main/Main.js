Ext.define('PureAudit.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'PureAudit.view.main.MainController',
        'PureAudit.view.main.MainModel',
        'PureAudit.view.main.List'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    plugins: 'viewport',

    viewModel: {
        type: 'main'
    },
    controller: 'main',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    items: [{
        xtype: 'toolbar',
        height: 64,
        ui: 'auToolbar',
        itemId: 'headerBar',

        items: [{
            xtype: 'component',
            reference: 'senchaLogo',
            html: '<div class="main-logo"><img src="resources/images/KaAudit.png" style ="width: 244px; height: 50px;" padding: 6px;></div>',
            width: 200
        }, '->', {
            iconCls: 'x-fa fa-search',
            href: '#searchresults',
            ui: 'auBtn',
            hrefTarget: '_self',
            tooltip: 'See latest search'
        }, {
            iconCls: 'x-fa fa-envelope',
            href: '#email',
            ui: 'auBtn',
            hrefTarget: '_self',
            tooltip: 'Check your email'
        }, {
            iconCls: 'x-fa fa-question',
            href: '#faq',
            ui: 'auBtn',
            hrefTarget: '_self',
            tooltip: 'Help / FAQ\'s'
            }, {
                xtype: 'button',
                menu: [{
                    text: 'Log out',
                    handler: 'onLogOut'
                }, {
                    text: 'Screen lock',
                    handler: 'onLockScreen'
                }],
            iconCls: 'x-fa fa-user-circle-o',
            ui:'auBtn',
            hrefTarget: '_self',
            tooltip: 'See your profile'
        }, {
            xtype: 'tbtext',
            text: 'Kristiyan Gochev',
            cls: 'top-user-name'
        }, {
            xtype: 'image',
            height: 35,
            width: 35,
            alt: 'current user image',
            src: 'resources/images/user-profile/kris.png'
        }]
    }, {
        xtype: 'maincontainerWrap',
            id: 'maincontainer-wrap',
     //   layout:'hbox',
        scrollable: true,
        margin: 0,
        padding: 0,
        reference: 'treelistContainer',
        items: [{
            xtype: 'container',
            scrollable: true,
            layout: 'vbox',
            width: 250,
            items: [{
                xtype: 'panel',
                reference: 'navToolbar',
                scrollable: true,
                height: 36,
                buttonAlign: 'center',
                width: 250,
                dockedItems: [{
                    xtype: 'toolbar',
                    ui:'navToolbar',
                    buttonAlign: 'center',
                    reference: 'dockedItems',
                    dock: 'top',
                    items: [{
                        xtype: 'tbfill'
                    }, {
                        reference: 'microBtn',
                        pressed: true,
                        ui:'auBtn',
                        enableToggle: true,
                        textAlign: 'right',
                        iconCls: 'x-fa fa-close',
                        toggleHandler: 'changeNavSize'
                    }, {
                        xtype: 'tbfill',
                        reference: 'tbfillToolbar',
                        hidden:true
                    }]
                }]
            }, {
                xtype: 'treelist',
                ui: ' navTreelist',
                scrollable:'y',
                highlightPath: true,
                reference: 'treelist',
                id: 'treelist',
                width: 250,
                expanderFirst: false,
                expanderOnly: false,
                bind: '{navItems}',
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange'
                }
            }]
        }, {
            xtype: 'container',
            flex: 1,
            reference: 'mainCardPanel',
            itemId: 'contentPanel',
            scrollable: true,
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }],
        listeners: {
            //afterrender: 'getNavCls'
        }
    }]
});