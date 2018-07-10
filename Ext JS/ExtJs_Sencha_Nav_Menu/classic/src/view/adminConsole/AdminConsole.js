Ext.define('PureAudit.view.adminConsole.AdminConsole', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-console',
    controller: 'admin-console',

    title: 'Panel with toolbar with diverse contents',
    frame: true,
    width: 700,
    height: 700,
    viewModel: {
        stores: {
            companies: {
                type: 'companies',
                autoLoad: true
            },
            personnel: {
                type: 'personnel',
                autoLoad: true
            }
        }
    },
    tbar: {
        overflowHandler: 'menu',
        items: [{
            text: 'Button w/ Menu',
            menu: {
                id: 'mainMenu',
                showSeparator: true,
                items: [{
                    xtype: 'combobox',
                    id:'combobox_main',
                    store: {},
                    bind: {
                        store: '{companies}'
                    },
                    displayField: 'name',
                    typeAhead: true,
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText: 'Select a state...',
                    selectOnFocus: true,
                    width: 135,
                    indent: true
                }, {
                    text: 'I like Ext',
                    checked: true,       // when checked has a boolean value, it is assumed to be a CheckItem
                    checkHandler: 'onItemCheck'
                }, '-', {
                    text: 'Radio Options',
                    menu: {
                        items: [
                            // stick any markup in a menu
                            '<b class="menu-title">Choose a Theme</b>',
                            {
                                text: 'Aero Glass',
                                checked: true,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }, {
                                text: 'Vista Black',
                                checked: false,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }, {
                                text: 'Gray Theme',
                                checked: false,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }, {
                                text: 'Default Theme',
                                checked: false,
                                group: 'theme',
                                checkHandler: 'onItemCheck'
                            }
                        ]
                    }
                }, {
                    text: 'Choose a Date',
                    iconCls: 'x-fa fa-calendar',
                    menu: {
                        xtype: 'datemenu',
                        handler: 'onDateSelect'
                    }
                }, {
                    text: 'Choose a Color',
                    menu: {
                        xtype: 'colormenu',
                        handler: 'onColorSelect'
                    }
                }, {
                    text: 'Disabled Item',
                    disabled: true
                }]
            }
        }, {
            text: 'Users',
            iconCls: 'x-fa fa-users',
            menu: {
                xtype: 'menu',
                plain: true,
                items: {
                    xtype: 'buttongroup',
                    title: 'User options',
                    columns: 2,
                    defaults: {
                        xtype: 'button',
                        scale: 'large',
                        iconAlign: 'left',
                        handler: 'onButtonClick'
                    },
                    items: [{
                        text: 'User<br/>manager',
                        iconCls: 'x-fa fa-user-md',
                        displayText: 'User manager',
                        height: '4em'
                    }, {
                        iconCls: 'x-fa fa-user-plus',
                        tooltip: 'Add user',
                        width: 40,
                        displayText: 'Add user',
                        height: '4em'
                    }, {
                        colspan: 2,
                        width: '100%',
                        text: 'Import',
                        scale: 'small'
                    }, {
                        colspan: 2,
                        width: '100%',
                        text: 'Who is online?',
                        scale: 'small'
                    }]
                }
            }
        }, {
            xtype: 'splitbutton',
            text: 'Split Button',
            handler: 'onButtonClick',
            tooltip: {
                text: 'This is a an example QuickTip for a toolbar item',
                title: 'Tip Title'
            },
            iconCls: 'x-fa fa-th-list',
            menu: {
                items: [{
                    text: '<b>Bold</b>', handler: 'onItemClick'
                }, {
                    text: '<i>Italic</i>', handler: 'onItemClick'
                }, {
                    text: '<u>Underline</u>', handler: 'onItemClick'
                }, '-', {
                    text: 'Pick a Color',
                    handler: 'onItemClick',
                    menu: {
                        showSeparator: false,
                        items: [{
                            xtype: 'colorpicker',
                            listeners: {
                                select: 'onColorSelect'
                            }
                        }, '-', {
                            text: 'More Colors...',
                            handler: 'onItemClick'
                        }]
                    }
                }, {
                    text: 'Extellent!',
                    handler: 'onItemClick'
                }]
            }
        }, '-', {
            text: 'Toggle Me',
            enableToggle: true,
            toggleHandler: 'onItemToggle',
            pressed: true
        }, {
            xtype: 'combobox',
            store: {},
            bind: {
                store: '{companies}'
            },
            displayField: 'industry',
            typeAhead: true,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Select a state...',
            selectOnFocus: true,
            width: 135,
            indent: true
        }]
    },
    items: [{
        xtype: 'panel',
        border: true,
        items: [{
            html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }, {
            title: 'Title',
                html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }, {
            title: 'Collapsible',
            collapsible: true,
                html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }, {
            title: 'Light UI',
            collapsible: true,
            ui: 'light',
            hidden: false,
                html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }, {
            title: 'Built in Tools',
            colspan: 4,
            collapsed: true,
            collapsible: true,
            width: 860,
                html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            tools: [
                { type: 'pin' },
                { type: 'refresh' },
                { type: 'search' },
                { type: 'save' }
            ]
        }, {
            title: 'Built in Tools in Light UI',
            colspan: 4,
            collapsed: true,
            collapsible: true,
            ui: 'light',
            width: 860,
                html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            hidden: false,
            tools: [
                { type: 'pin' },
                { type: 'refresh' },
                { type: 'search' },
                { type: 'save' }
            ]
        }]

    }]
});