Ext.define('NavTest.view.grids.spreadSheets.SpreadSheet', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard',
        'NavTest.store.MonthlySales'
    ],

    xtype: 'spreadsheet',
    controller: 'spreadsheet',

    store: {
        type: 'monthlysales'
    },
    columnLines: true,
    height: 850,
    scrollable:'y',
    title: 'Spreadsheet',
    ui:'auPanel',
    selModel: {
        type: 'spreadsheet',
        // Disables sorting by header click, though it will be still available via menu
        columnSelect: true,
        checkboxSelect: true,
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
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateEdit: function (editor, context) {
                }
            }
        }
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    tools: [{
        type: 'refresh',
        handler: 'onRefresh',
        tooltip: 'Reload Data'
    }],

    tbar: [{
        xtype: 'component',
        html: 'Selectable: '
    }, {
        text: 'Rows',
        enableToggle: true,
        toggleHandler: 'toggleRowSelect',
        pressed: true
    }, {
        text: 'Cells',
        enableToggle: true,
        toggleHandler: 'toggleCellSelect',
        pressed: true
        }, {
        text: 'Columns',
        enableToggle: true,
        toggleHandler: 'toggleColumnSelect',
        pressed: true
    }, '->', {
        xtype: 'component',
        reference: 'status'
    }],

    columns: [
        {
            text: 'Year', dataIndex: 'year', flex: 1, minWidth: 70 },
        { text: 'Jan', dataIndex: 'jan', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Feb', dataIndex: 'feb', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Mar', dataIndex: 'mar', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Apr', dataIndex: 'apr', flex: 1, field: { xtype: 'textfield' } },
        { text: 'May', dataIndex: 'may', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Jun', dataIndex: 'jun', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Jul', dataIndex: 'jul', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Aug', dataIndex: 'aug', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Sep', dataIndex: 'sep', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Oct', dataIndex: 'oct', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Nov', dataIndex: 'nov', flex: 1, field: { xtype: 'textfield' } },
        { text: 'Dec', dataIndex: 'dec', flex: 1, field: { xtype: 'textfield' } }
    ],
    columnLines: true,
    cls: 'grid-row-span',
    forceFit: true,

    viewConfig: {
        columnLines: true,
        trackOver: false
    }
});