Ext.define('NavTest.view.grids.spreadSheets.BetterSpreadSheet', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard',
        'NavTest.store.MonthlySales'
    ],

    xtype: 'betterspreadsheet',
    controller: 'betterspreadsheet',

    id: 'gridPanel',

    columnLines: true,
    height: 850,
    obj: [],
    scrollable: 'y',
    title: 'Spreadsheet',
    ui: 'auPanel',
    viewModel: {
        stores: {
            companies: {
                type: 'companies',
                autoLoad: true,
            }
        }
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true
    },
    config: {
        objectWidhObjects: [],
        objStore: []
    },

    bind: '{companies}',
    selModel: {
        type: 'spreadsheet',
        // Disables sorting by header click, though it will be still available via menu
        columnSelect: true,
        checkboxSelect: true,
        rowSelect : true,
        cellSelect: true,
        pruneRemoved: false,
        extensible: 'y'
    },

    // Enable CTRL+C/X/V hot-keys to copy/cut/paste to the system clipboard.
    plugins: {
        clipboard: true,
        selectionreplicator: true,
        rowediting: {
            listeners: {
                cancelEdit: function (rowEditing, context) {
                    var cmp = Ext.getCmp('gridPanel'),
                        viewModel = cmp.getViewModel(),
                        store = viewModel.getStore('companies');
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                edit: function (editor,context) {
                    context.record.commit();
                },
                validateEdit: function (editor, context) {
                    context.record.phantom = false;
                }
            }
        }
    },

    listeners: {
        selectionchange: 'onSelectionChange',
        itemcontextmenu: 'onItemContextMenuClick'
    },

    tools: [{
        type: 'refresh',
        handler: 'onRefresh',
        tooltip: 'Reload Data'
    }],

    dockedItems: [{
        xtype: 'toolbar',
        docked:'top',
        items: [{
            text: 'Add',
            iconCls: 'icon-add',
            handler: 'addRow'
        }, '-', {
            itemId: 'hideRow',
            text: 'Hide Row',
            disabled: true,
            handler: 'hideRow'
        }, '-', {
            itemId: 'delete',
            text: 'Delete',
            iconCls: 'icon-delete',
            disabled: true,
            handler: 'deleteRow'
        }, '->', {
            xtype: 'component',
            reference: 'status'
            },'-', {
                itemId: 'hiddenRows',
                text: 'Hidden rows',
                disabled: true,
                handler: 'onHiddenRowsClick'
            }]
    }],
    columns: [{
        text: 'Company',
        flex: 1,
        dataIndex: 'name',
        flex: 1,
        field: {
            xtype: 'textfield'
        }
    }, {
        text: 'Price',
        width: 95,
        formatter: 'usMoney',
            dataIndex: 'price',
            flex: 1,
            field: {
                xtype: 'textfield'
            }
    }, {
        text: 'Change',
        width: 80,
      //  renderer: 'renderChange',
            dataIndex: 'priceChange',
            flex: 1,
            field: {
                xtype: 'textfield'
            }
    }, {
        text: '% Change',
        width: 100,
        //renderer: 'renderPercent',
            dataIndex: 'priceChangePct',
            flex: 1,
            field: {
                xtype: 'textfield'
            }
    }, {
        text: 'Last Updated',
        width: 115,
        formatter: 'date("m/d/Y")',
            dataIndex: 'priceLastChange',
            flex: 1,
            field: {
                xtype: 'textfield'
            }
    }],
    forceFit: true,

    viewConfig: {
        columnLines: true,
        trackOver: false
    }
});