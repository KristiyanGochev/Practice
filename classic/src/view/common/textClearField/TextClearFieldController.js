Ext.define('NavTest.view.common.textClearField.TextClearFieldController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.textclearfield',

    triggerClick: function () {
        var view = this.getView();
        if (view.hideTrigger) {
            return;
        }
        view.setValue("");
        if (view.callback) {
            Ext.callback(view.callback, view.owner);
        }
    },

});