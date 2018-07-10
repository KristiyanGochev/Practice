Ext.define('PureAudit.model.Token', {
    extend: 'PureAudit.model.Base',

    requires: [
        'PureAudit.model.Base'
    ],

    fields: [{
        name: 'username',
        type: 'auto'
    }, {
        name: 'password',
        type: 'auto'
    }, {
        name: 'grant_type',
        type: 'auto'
    }]
});