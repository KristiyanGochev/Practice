Ext.define('NavTest.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',
    id: 'app-main',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    controller: 'main',
    viewModel: 'main',

    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },
    items: [
        {
            xtype: 'toolbar',
            ui: 'auditToolbar',
            height: 60,
            margin: 0,
            padding: 0,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'panel',
                    width: 220,
                    id: 'myLogoPanel',
                    ui: 'auditLogoPanel',
                    reference: 'myLogoPanel',
                    layout:'hbox',
                    height: 60,
                    items: [
                        {
                        xtype: 'image',
                        cls: 'x-img header-right-profile-image x-box-item x-toolbar-item x-img-default',
                        src: 'resources/images/logo-ex-5.png',
                        alt: 'No Image!',
                        height: 60,
                        flex:3,
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa',
                            glyph: 'f0c9@FontAwesome',
                            id: 'main-navigation-btn-in',
                            ui: 'navBtn',
                            flex:1,
                            height: 60,
                            handler: 'onToggleNavigationSize'
                        }, 
                    ]
                },
                {
                    iconCls: 'x-fa',
                    glyph: 'f0c9@FontAwesome',
                    id: 'main-navigation-btn-out',
                    ui: 'navBtn',
                    hidden: true,
                    handler: 'onToggleNavigationSize'
                }, {
                    xtype: 'textclearfield',
                    name: 'search_term',
                    reference: 'searchField',
                    id: 'navigation-search-field',
                    width: 300,
                    listeners: {
                        specialKey: 'onSpecialKey'
                    },
                    owner: self,
                    callback: function () {
                        Ext.getCmp('app-main').getController().onSearchClick();
                    }
                }, {
                    iconCls: 'x-fa fa-search',
                    ui: 'navBtn',
                    tooltip: 'Searching for..',
                    listeners: {
                        click: 'onSearchClick',
                        element: 'el'
                    }
                },'->',{
                    iconCls: 'x-fa fa-envelope',
                    ui: 'navBtn',
                    href: '#email',
                    hrefTarget: '_self',
                    tooltip: 'Check your email'
                },
                {
                    iconCls: 'x-fa fa-question',
                    ui: 'navBtn',
                    href: '#faq',
                    hrefTarget: '_self',
                    tooltip: 'Help / FAQ\'s'
                },
                {
                    iconCls: 'x-fa fa-th-large',
                    ui: 'navBtn',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'tbtext',
                    ui: 'navBtn',
                    text: 'Kristiyan Gochev',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    style: {
                        borderRadius: '20px'
                    },
                    height: 35,
                    width: 35,
                    id:'image-open-modal-user-profile',
                    alt: 'current user image',
                    src: 'resources/images/user-profile/kris.png',
                    listeners: {
                        el: {
                            click: 'onImageClick'
                        }
                    }
                },
                {
                    xtype: 'tbfill',
                    maxWidth: 10
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [{
                xtype: 'treelist',
                reference: 'navigationTreeList',
                id: 'navigationTreeList',
                itemId: 'navigationTreeList',
                ui: 'auditNavigation',
                shadow: 'side',
                shadowOffset: 10,
                store: 'NavigationTree',
                width: 220,
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange'
                }
            },
            {
                xtype: 'container',
                flex: 1,
                border: 3,
                style: {
                    borderColor: '#D9D9D9',
                    borderStyle: 'solid'
                },
                reference: 'mainCardPanel',
                cls: 'sencha-dash-right-main-container',
                itemId: 'contentPanel',
                layout: {
                    type: 'card',
                    anchor: '100%'
                }
            }
            ]
        }
    ]
});
