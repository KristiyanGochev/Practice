Ext.define('NavTest.model.Base', {
    extend: 'Ext.data.Model',

    schema: {
        namespace: 'NavTest.model',
        urlPrefix: 'api/v1',
        proxy: {
            type: 'rest',
            url: '{prefix}/{entityName:uncapitalize}',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    }
});
