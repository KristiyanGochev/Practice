Ext.define('NavTest.view.common.hiddenRowsModal.HiddenRowsDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hiddenRows',



    showSelectedRows: function () {
        var grid = Ext.getCmp('hiddenRowsGrid'),
            selection = grid.getView().getSelectionModel().getSelection(),
            controller = Ext.getCmp('gridPanel').getController();

        controller.showRows(selection);

    },

    showAllRows: function () {
        var grid = Ext.getCmp('hiddenRowsGrid'),
            allRecords = grid.getStore().getRange(),
            controller = Ext.getCmp('gridPanel').getController();

        controller.showRows(allRecords);
    },
    refreshStore: function () {
        var self = this,
            hiddenRowsGrid = Ext.getCmp('hiddenRowsGrid'),
            store = hiddenRowsGrid.getStore();

        store.load();

    },

    closeHiddenRowsDialog: function() {
        var self = this,
            hiddenRowsPanel = Ext.getCmp('hiddenRows-modal');
        if (hiddenRowsPanel) {
            hiddenRowsPanel.close(hiddenRowsPanel.closeAction);
        }
    }
});