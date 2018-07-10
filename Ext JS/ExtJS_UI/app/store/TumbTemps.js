Ext.define('NavTest.store.TumbTemps', {
    extend: 'Ext.data.Store',
    model: 'NavTest.model.TumbTemps',
    alias: 'store.tumbTemps',
    storeId: 'tumbTemps',

    proxy: {
        type: 'ajax',
        url: 'app/testData/TumbViewTemplates.json',

        reader: {
            type: 'json',
            rootProperty: 'tumbTpls',
        }
    }
});