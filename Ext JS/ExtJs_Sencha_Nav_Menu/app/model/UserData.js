Ext.define('PureAudit.model.UserData', {
    extend: 'Ext.data.Model',

    fields: [
        { name: "userName", type: "auto" },
        { name: "companyName", type: "auto" },
        { name: "address", type: "auto" },
        { name: "email", type: "auto" },
        { name: "age", type: "auto" }
    ]
});