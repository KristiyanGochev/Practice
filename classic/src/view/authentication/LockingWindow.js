/**
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 */
Ext.define('NavTest.view.authentication.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',
    requires: [
        'NavTest.view.authentication.AuthenticationController',
        'Ext.layout.container.VBox'
    ],
    ui:'auditWindow',
    closable: false,
    resizable: false,
    autoShow: true,
    header: false,
    border:false,
   // titleAlign: 'center',
    maximized: true,
    modal: false,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    controller: 'authentication'
});
