Ext.define('PureAudit.store.BaseTemplate', {
    extend: 'Ext.data.Store',
    storeId: 'baseTemplate',
    alias: 'store.baseTemplate',
    model: 'PureAudit.model.BaseTemplateModel',

    proxy: {
        type: 'ajax',
        url: 'app/testData/Templates.json',
        reader: {
            type: 'json',
            rootProperty: 'templates'
        }
    }

});