﻿Ext.define('NavTest.view.contextMenu.ContextMenu', {
    extend: 'Ext.menu.Menu',

    xtype: 'contextmenu',

    config: {
        disableMenu: false,
        record: null
    },

    margin: '0 0 20 0',

    floating: true,

    initComponent: function () {

        var self = this;

        Ext.apply(self, {

            items: [{
                text: 'Add row',
                toDo: 'add'

            }, {
                text: 'Delete row',
                toDo: 'delete'
            }],
            listeners: {
                click: function (menu, item, e, eOpts) {
                    var parentGrid = Ext.getCmp('gridPanel'),
                        parentCtrl = parentGrid.getController();
                    (item.toDo === 'add') ? parentCtrl.addRow(self.getRecord()) : parentCtrl.deleteRow(self.getRecord())
                }
            }
        });

        self.callParent(arguments);
    }
});