Ext.define('PureAudit.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin: function () {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function () {
        Ext.ComponentQuery.query('lockingwindow')[0].destroy();
        if (Ext.isEmpty(Ext.ComponentQuery.query('app-main'))) {  
            Ext.create({
                xtype: 'app-main'
            });
        }

        this.redirectTo('faq', true);
    },

    onLoginAsButton: function () {
        this.redirectTo('faq', true);
    },

    onNewAccount: function () {
        this.redirectTo('register', true);
    },

    onSignupClick: function () {
        this.redirectTo('dashboard', true);
    },

    onResetClick: function () {
        this.redirectTo('dashboard', true);
    }
});