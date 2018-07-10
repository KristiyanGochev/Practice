Ext.define('NavTest.view.documents.dialogs.ModalDocumentDialog', {
    extend: 'Ext.panel.Panel',
    xtype: 'modalDocumentDialog',

    modal: true,
    floating: true,
    styleHtmlContent: true,
    shadow: 'side',
    shadowOffset: 10,
    region: 'center',
    ui: 'userInfoPanel',
    layout: 'fit',
});
