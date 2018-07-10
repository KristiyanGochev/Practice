Ext.define('PureAudit.model.BaseTemplateModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: "html", type: "auto" },
        { name: "id", type: "auto" },
        { name: "name", type: "auto" },
        { name: "components", type: "auto" }
    ]
});