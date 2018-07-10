Ext.define('NavTest.view.grids.spreadSheets.BetterSpreadsheetController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.betterspreadsheet',
    object: [],

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
            grid.down('#delete').setDisabled(true);
            grid.down('#hideRow').setDisabled(true);
            message = 'Selected cells: ' + (lastColumnIndex - firstColumnIndex + 1) + 'x' + (lastRowIndex - firstRowIndex + 1) +
                ' at (' + firstColumnIndex + ',' + firstRowIndex + ')';
        }
        else if (selection.isRows) {
            grid.down('#delete').setDisabled(selection.length === 0);
            grid.down('#hideRow').setDisabled(selection.length === 0);
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
        var self = this,
            view = self.getView(),
            // empty record

            rec = Ext.create('NavTest.model.Companies', {}),
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
    //hideRow: function (placeholder) {
    //    debugger;
    //    var self = this,
    //        view = self.getView(),
    //        grid = Ext.getCmp('gridPanel'),

    //        selection = grid.getView().getSelectionModel().getSelection(),
    //        selectedRange = grid.getView().getSelectionModel().getSelected(),

    //        store = self.getViewModel().getStore('companies'),
    //        rowCount = store.getCount(),
    //        column = selectedRange.startCell.colIdx,
    //        dataIndex = column.dataIndex,

    //        spanCell = null,
    //        spanCount = null,
    //        spanValue = null;

    //    //for (var row = selectedRange.startCell.rowIdx; row <= selectedRange.endCell.rowIdx; ++row) {
    //    selectedRange.eachCell(function (cell) {
    //        debugger;
    //        var cellHtml = grid.getView().getCellByPosition({ row: cell.rowIdx, column: cell.colIdx }).dom,
    //            record = cell.record,
    //            // value = cell.record.get(dataIndex);
    //            value = cell.column.dataIndex;

    //        if (spanValue != value) {
    //            debugger;
    //            if (spanCell !== null) {
    //                spanCell.rowSpan = spanCount;
    //            }
    //            Ext.fly(cellHtml).setStyle('display', '');
    //            spanCell = cellHtml;
    //            spanCount = 1;
    //            spanValue = value;
    //        } else {
    //            spanCount++;
    //            Ext.fly(cellHtml).setStyle('display', 'none');
    //        }
    //        if (spanCell !== null) {
    //            spanCell.rowSpan = spanCount;
    //        }
    //    });
    
    hideRow: function (placeholder) {
        var self = this,
            view = self.getView(),
            grid = Ext.getCmp('gridPanel'),
            selection = grid.getView().getSelectionModel().getSelection(),
            selectedRange = grid.getView().getSelectionModel().getSelected(),

            store = self.getViewModel().getStore('companies'),
            rowCount = store.getCount();
        Ext.Array.each(selection, function (item) {
            var row = grid.getView().getRow(item.id - 1),

            itemObj = {};
            itemObj['rowHtml'] = row;
            itemObj['rowComponent'] = item;

            view.config.objectWidhObjects.push(itemObj);
            view.config.objStore.push(item);
            row.style.display = 'none';

        })

       
//        grid.down.('#hiddenRows').setDisabled(!view.config.obj.length > 0);

        console.log(view.config.objectWidhObjects);
        grid.down('#hiddenRows').setDisabled(view.config.objectWidhObjects.length === 0);
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

    },

    onHiddenRowsClick: function (btn, item, event) {
        var self = this,
            view = self.getView(),
            grid = Ext.getCmp('gridPanel'),
            hiddenRowsObj = view.config.objectWidhObjects,
            popup = Ext.getCmp('hiddenRows-modal'),
            treelist = Ext.getCmp('navigationTreeList');

        if (popup && !popup.isHidden()) {
            popup.hide();
            return;
        }


        if (!popup) {
            popup = Ext.create('NavTest.view.common.hiddenRowsModal.HiddenRowsDialog');
        }
        var gridPanel = Ext.getCmp('gridPanel'),
            dataItems = gridPanel.config.objStore;


        var hiddenRowsGrid= Ext.getCmp('hiddenRowsGrid');
            store = hiddenRowsGrid.getStore();

        store.loadData(dataItems);
        debugger;
        popup.showAt(((btn.x + treelist.getWidth() + 10) - popup.width), (btn.y + btn.getHeight() + 85));
    },

    showRows: function (items) {
        var self = this,
            view = self.getView(),
            objects = view.getObjectWidhObjects(),
            storeObj = view.getObjStore(),
            hiddenRowsGrid = Ext.getCmp('hiddenRowsGrid'),
            store = hiddenRowsGrid.getStore(),
            objectsToBeRemoved = [];

        Ext.Array.each(items, function (item) {

            Ext.Array.each(objects, function (obj) {
                if (obj.rowComponent.get('name') == item.get('name')) {
                    obj.rowHtml.removeAttribute("style");
                    store.remove(item, true);
                    objectsToBeRemoved.push(obj.rowComponent);
                }
            })
        })

        Ext.Array.each(objectsToBeRemoved, function (obj) {
            Ext.Array.remove(storeObj, obj);
        })

    }

});