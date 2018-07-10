Ext.define('PureAudit.store.TemplatesTreeList', {
    extend: 'Ext.data.TreeStore',

    storeId: 'TemplatesTreeList',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Funds',
                name: 'funds',
                templateId: 1,
                leaf: true
            },
            {
                text: 'Costs',
                name: 'costs',
                templateId: 2,
                leaf: true
            },
            {
                text: 'Extractions',
                name: 'extractions',
                templateId: 3,
                leaf: true
            },
            {
                text: 'Receipts',
                name: 'receipts',
                templateId: 4,
                leaf: true
            },
            {
                text: 'TestGridTemplate',
                name: 'receipts',
                templateId: 5,
                leaf: true
            },
            {
                text: 'Widgets',
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Forms',
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
                leaf: true
            },
            {
                text: 'Charts',
                iconCls: 'x-fa fa-pie-chart',
                viewType: 'charts',
                leaf: true
            }
        ]
    }
});
