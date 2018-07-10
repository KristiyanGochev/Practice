Ext.define('NavTest.store.BaseTemplate', {
    extend: 'Ext.data.Store',
    storeId: 'baseTemplate',
    alias: 'store.baseTemplate',
    model: 'NavTest.model.BaseTemplateModel',

    proxy: {
        type: 'ajax',
        url: 'app/testData/Templates.json',
        reader: {
            type: 'json',
            rootProperty: 'templates'
        }
    }

});