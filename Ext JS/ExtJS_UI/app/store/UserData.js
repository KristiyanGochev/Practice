Ext.define('NavTest.store.UserData', {
    extend: 'Ext.data.Store',
    storeId: 'userDataStore',
    model: 'NavTest.model.UserData',

    proxy: {
        type: 'ajax',
        url: 'app/testData/UserData.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});