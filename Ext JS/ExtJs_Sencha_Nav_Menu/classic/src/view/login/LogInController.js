Ext.define('PureAudit.view.login.LogInController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function () {

        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        //localStorage.setItem("TutorialLoggedIn", true);

        var self = this,
            view = self.getView(),
            form = self.lookupReference('form'),
            token = Ext.create('PureAudit.model.Token', {
                grant_type: 'password'
            });

        form.updateRecord(token);

        token.save({ // will make a POST request
            success: function (response) {

                if (Ext.isEmpty(response)) {
                    // print error
                    return;
                }
                self.applyAuthHeaders(response.access_token)
                // Remove Login Window
                view.destroy();
                // Add the main view to the viewport
                Ext.create({
                    xtype: 'app-main'
                });
            },
            failure: function () {
                // print error
            }
        });

    },

    applyAuthHeaders: function (accessToken) {

        var headers = Ext.apply(Ext.Ajax.getDefaultHeaders(), {
            'Authorization': 'Bearer ' + accessToken
        });

        $.ajaxSetup({
            headers: headers
        });

        Ext.Ajax.setDefaultHeaders(headers);

    }
});