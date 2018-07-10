Ext.define('NavTest.view.common.textClearField.TextClearField', {
    extend: 'Ext.form.field.Text',
    xtype: 'textclearfield',

    requires: [
        'NavTest.view.common.textClearField.TextClearFieldController'
    ],

    controller: 'textclearfield',

    ui: 'searchTextField',

    onRender: function () {
        var self = this,
            el;
        self.callParent(arguments);
        el = self.triggerEl.first();
        el.hide();
    },

    triggers: {
        trigger: {
            cls: '	x-fa fa-times',
            handler: function () {
                this.getController().triggerClick();
            }
        }
    },

    listeners: {
        change: function (field) {
            var self = this,
                el = self.triggerEl.first();
            if (field.value.length) {
                el.show();
            } else {
                el.hide();
            }
        }
    },

});