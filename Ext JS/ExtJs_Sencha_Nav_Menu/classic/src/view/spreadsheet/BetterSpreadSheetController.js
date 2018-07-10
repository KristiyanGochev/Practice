Ext.define('PureAudit.view.spreadsheet.BetterSpreadsheetController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.betterspreadsheet',

    formatDays: function (value) {
        return (value === 1) ? '1 day' : (value + ' days');
    },

    getSelectionModel: function () {
        var grid = this.getView();
        return grid.getSelectionModel();
    },

    onRefresh: function () {
        var grid = this.getView();
        grid.store.reload();
    },

    onSelectionChange: function (grid, selection) {
        var status = this.lookupReference('status'),
            message = '??',
            firstRowIndex,
            firstColumnIndex,
            lastRowIndex,
            lastColumnIndex;


        if (!selection) {
            message = 'No selection';
        }
        else if (selection.isCells) {
            firstRowIndex = selection.getFirstRowIndex();
            firstColumnIndex = selection.getFirstColumnIndex();
            lastRowIndex = selection.getLastRowIndex();
            lastColumnIndex = selection.getLastColumnIndex();

            message = 'Selected cells: ' + (lastColumnIndex - firstColumnIndex + 1) + 'x' + (lastRowIndex - firstRowIndex + 1) +
                ' at (' + firstColumnIndex + ',' + firstRowIndex + ')';
        }
        else if (selection.isRows) {

            grid.down('#delete').setDisabled(selection.length === 0);
            message = 'Selected rows: ' + selection.getCount();
        }
        else if (selection.isColumns) {
            message = 'Selected columns: ' + selection.getCount();
        }

        status.update(message);
    },

    onApprove: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.alert('Approve', rec.get('name'));
    },

    onDecline: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.alert('Decline', rec.get('name'));
    },

    renderChange: function (value) {
        return this.renderSign(value, '0.00');
    },

    renderPercent: function (value) {
        return this.renderSign(value, '0.00%');
    },

    renderSign: function (value, format) {
        var text = Ext.util.Format.number(value, format),
            tpl = this.signTpl,
            data = this.data;

        if (Math.abs(value) > 0.1) {
            if (!tpl) {
                this.signTpl = tpl = this.getView().lookupTpl('signTpl');
                this.data = data = {};
            }

            data.value = value;
            data.text = text;

            text = tpl.apply(data);
        }

        return text;
    },
    addRow: function (placeHolder) {
        debugger;
        var self = this,
            view = self.getView(),
            // empty record

            rec = Ext.create('PureAudit.model.Companies', {}),
            grid = Ext.getCmp('gridPanel'),
            store = self.getViewModel().getStore('companies'),
            index = (placeHolder.data) ? store.indexOf(placeHolder) : 0,
            rowEditing = grid.findPlugin('rowediting');

        store.insert(index, rec);
        rowEditing.startEdit(rec, 1);
    },

    deleteRow: function (placeHolder) {
        var self = this,
            view = self.getView(),
            grid = Ext.getCmp('gridPanel'),
            selection = grid.getView().getSelectionModel().getSelection();
            store = self.getViewModel().getStore('companies');
        if (selection.length > 0) {
            Ext.Array.each(selection, function (name, index, countriesItSelf) {            
                store.remove(name);
            });
        }
        else {
            store.remove(placeHolder);
        }
    },

    onItemContextMenuClick: function (grid, record, item, index, e, eOpts) {
        var self = this,
            view = self.getView();

        e.stopEvent();

        if (!view.contextmenu) {
            view.contextmenu = Ext.create({
                xtype: 'contextmenu'
            });
        }
        this.getSelectionModel().select(record);
        view.contextmenu.setRecord(record);

        view.contextmenu.showAt(e.getXY());

    }

});