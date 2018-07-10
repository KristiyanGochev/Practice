Ext.define('PureAudit.store.UserData', {
    extend: 'Ext.data.Store',
    storeId: 'userDataStore',
    model: 'PureAudit.model.UserData',

    proxy: {
        type: 'ajax',
        url: 'app/testData/UserData.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});