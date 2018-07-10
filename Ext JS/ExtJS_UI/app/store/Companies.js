Ext.define('NavTest.store.Companies', {
    extend: 'Ext.data.Store',
    model: 'NavTest.model.Companies',
    alias: 'store.companies',
    storeId: 'companies',

    proxy: {
        type: 'ajax',
        url: 'app/testData/Companies.json',

        reader: {
            type: 'json',
            rootProperty: 'data',

            // Do not attempt to load orders inline.
            // They are loaded through the proxy
        }
    }
});