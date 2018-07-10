Ext.define('NavTest.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin: function () {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function () {
        debugger;
        // If this is initial logIn the we just destroy login window,
        // create app-main and redirect to desire page.
        if (Ext.isEmpty(Ext.ComponentQuery.query('app-main'))) {
            Ext.ComponentQuery.query('lockingwindow')[0].destroy();
            if (Ext.isEmpty(Ext.ComponentQuery.query('app-main'))) {
                Ext.create({
                    xtype: 'app-main'
                });
            }

            this.redirectTo('faq', true);
        } else {
            // Keep in mind that we will hit this point because 
            // on logout we did not destroy the viewPort( in our case app-main),
            // we just remove all the chidrens and add LogIn Window.
            // Here now we could destroy the app-main and create the new one with all the childrens include!
            var isViewPortExist = !Ext.isEmpty(Ext.ComponentQuery.query('app-main'));
            if (isViewPortExist) {
                Ext.ComponentQuery.query('app-main')[0].destroy();

                Ext.create({
                    xtype: 'app-main'
                });
                this.redirectTo('faq', true);
            }
        }
    },

    onLoginAsButton: function () {
        debugger;
        var mainApp = Ext.getCmp('app-main'),
            mainAppController = mainApp.getController();

        mainAppController.onUnlockScreen();
    },

    onLogoutFromLockScreenBtn: function (me,e,eopt) {
        debugger;
        var mainApp = Ext.getCmp('app-main'),
            lockWindow = Ext.getCmp('lockScreen-window');

        if (lockWindow) { 
            lockWindow.destroy();
        }
            mainAppController = mainApp.getController();

        mainAppController.onLogOut();
    },

    onSignupClick: function () {
        this.redirectTo('dashboard', true);
    },

    onResetClick: function () {
        this.redirectTo('dashboard', true);
    },
    onFooterIconClick: function (me, event, opts) {
        debugger;
        var self = this,
            to = me.id;
        switch (to) {
            case 'facebook':
                window.open('https://www.facebook.com/');
                break;
            case 'twitter':
                window.open('https://twitter.com/');
                break;
            case 'kaaudit':
                window.open('http://www.kaaudit.bg/');
                break;
            default:
                return;
        }
    }
});