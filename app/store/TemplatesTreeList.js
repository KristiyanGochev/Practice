Ext.define('NavTest.store.TemplatesTreeList', {
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
                text: 'BetterGrid',
                name: 'receipts',
                templateId: 5,
                leaf: true
            }
        ]
    }
});
