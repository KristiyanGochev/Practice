﻿Ext.define('PureAudit.view.pages.ErrorBase', {
    extend: 'Ext.window.Window',

    requires: [
        // 'Admin.view.authentication.AuthenticationController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer'
    ],

    controller: 'authentication',
    autoShow: true,
    cls: 'error-page-container',
    closable: false,
    title: 'KA Audit',
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});
