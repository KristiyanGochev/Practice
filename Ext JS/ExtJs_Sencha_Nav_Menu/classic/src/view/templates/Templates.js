Ext.define('PureAudit.view.templates.Templates', {
    xtype: 'templates',
    extend: 'Ext.panel.Panel',
    requires: [
        'PureAudit.view.templates.TemplatesController',
        'PureAudit.store.BaseTemplate'
    ],
    controller: 'temp',
    scrollable: 'y',
    layout: {
        type: 'hbox'
    },
    viewModel: {
        stores: {
            templates: {
                type: 'baseTemplate',
                autoLoad: true,
            }
        }
    },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Funds',
                name: 'funds',
                handler: 'loadBaseTemplate',
                templateId: 1
            }, {
                text: 'Costs',
                name: 'costs',
                handler: 'loadBaseTemplate',
                templateId: 2
            }, {
                text: 'Extractions',
                name: 'extractions',
                handler: 'loadBaseTemplate',
                templateId: 3
            }, {
                text: 'Receipts',
                name: 'receipts',
                handler: 'loadBaseTemplate',
                templateId: 4
            }, {
                text: 'TestGridTemplate',
                name: 'receipts',
                handler: 'loadBaseTemplate',
                templateId: 5
            }]
    }],
    items: [{
        xtype: 'panel',
        id: 'templatePanel',
        flex: 1,
        tpl: Ext.create('Ext.XTemplate')
    }]
});
