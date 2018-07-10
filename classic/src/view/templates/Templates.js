Ext.define('NavTest.view.templates.Templates', {
    xtype: 'templates',
    extend: 'Ext.panel.Panel',
    requires: [
        'NavTest.view.templates.TemplatesController',
        'NavTest.store.BaseTemplate'
    ],
    controller: 'temp',
    scrollable: 'y',
    layout: 'fit',
    viewModel: {
        stores: {
            templates: {
                type: 'baseTemplate',
                autoLoad: true,
            }
        }
    },
    items: [{
        xtype: 'container',
        id: 'containerKris',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            title: 'Templates',
            width: 150,
            layout:'vbox',
            collapsible: true,
            collapseDirection:'left',
            listeners: {
                afterrender: function (panel) {
                    var header = panel.header;
                    header.setHeight(35);
                }
            },
            items: [{
                xtype: 'combobox',
                id: 'combobox_main',
                    //store: 'TemplatesTreeList',
                store: [],
                bind: {
                    store: '{templates}'
                },
                displayField: 'id',
                typeAhead: true,
                triggerAction: 'all',
                emptyText: 'Select Template',
                width: 150,
                listeners: {
                    select: 'loadBaseTemplate'
                }
                
            }, {
                    xtype: 'splitbutton',
                    text: 'Menu Button',
                    iconCls: null,
                    menu: [{
                        text: 'Menu Button 1'
                    }]
                }, {
                    xtype: 'splitbutton',
                    text: 'Cut',
                    iconCls: null,
                    menu: [{
                        text: 'Cut Menu Item'
                    }]
                }, {
                    xtype:'button',
                    iconCls: null,
                    text: 'Copy'
                }, {
                    xtype: 'button',
                    text: 'Paste',
                    iconCls: null,
                    menu: [{
                        text: 'Paste Menu Item'
                    }]
                }, {
                    xtype: 'button',
                    iconCls: null,
                    text: 'Format'
                }]
        }, {
                xtype: 'panel',
                id: 'templatePanel',
                flex: 1,
                border: true,
                tpl: Ext.create('Ext.XTemplate')
            }]
    }]
});
