Ext.define('PureAudit.model.Base', {
    extend: 'Ext.data.Model',

    schema: {
        namespace: 'PureAudit.model',
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
