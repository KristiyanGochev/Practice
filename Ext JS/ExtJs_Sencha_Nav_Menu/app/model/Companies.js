Ext.define('PureAudit.model.Companies', {
    extend: 'PureAudit.model.Base',
    fields: [
        { name: 'name' },
        { name: 'phone', type: 'auto' },
        { name: 'price', type: 'auto' },
        { name: 'priceChange', type: 'auto' },
        { name: 'priceChangePct', type: 'auto' },
        { name: 'priceLastChange', type: 'auto' },
        { name: 'id', type: 'auto' },
        { name: 'industry', type: 'auto' },
        { name: 'desk', type: 'auto' }
    ]
});
