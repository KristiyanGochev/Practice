Ext.define('NavTest.view.documents.Documents', {
    xtype: 'documents',
    extend: 'Ext.tab.Panel',
    requires: [
        'NavTest.view.documents.DocumentsController',
        'NavTest.store.TumbTemps'
    ],
    controller: 'documents',
    scrollable: 'y',
    id: 'docs',
    layout: 'fit',
    viewModel: {
        stores: {
            temps: {
                type: 'tumbTemps',
                autoLoad: true,
            }
        }
    },
    items: [{
        title:'Document',
        xtype: 'panel',
        closable: false,
        id: 'dataViewPanel',
        flex: 2.6,
        layout: 'fit',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'combobox',
                    width: 250,
                    fieldLabel: 'Filter by',
                    labelWidth: 70,
                    autoSelect: true,
                    editable: false,
                    value: 'Created by me',
                 //   store: sortByStore,
                    listeners: {
                        change: 'onSortByPropertyChange'
                    }
                },{
                    xtype: 'textclearfield',
                    name: 'search_term',
                    reference: 'searchField',
                    id: 'documents-grid-search-field',
                    width: 300,
                    listeners: {
                        specialKey: 'onSpecialKey'
                    },
                    owner: self,
                    callback: function () {
                        this.getController().onSearchClick();
                    }
                }, {
                    xtype: 'button',
                    border:false,
                    iconCls: 'x-fa fa-search',
                    id:'navBtn1',
                    tooltip: 'Searching for..',
                    listeners: {
                        click: 'onSearchClick',
                        element: 'el'
                    }
                },'->',{
                    xtype: 'button',
                    text: 'Create Document',
                    handler: 'onCreateDocumentClick',
                    tooltip: 'New Document'
                }]
            }],
        items: [{
            xtype: 'grid',
            id: 'documentsGridPanel',
            store: null,
            border: true,
            bind: {
                store:'{temps}'
            },
            columns: [
                { text: 'Document Name', dataIndex: 'name', flex: 1, minWidth: 70},
                { text: 'Practise Name', dataIndex: 'practiseName', flex: 1, field: { xtype: 'textfield' } },
                { text: 'Template', dataIndex: 'tpl', flex: 1, field: { xtype: 'textfield' } },
                { text: 'Id', dataIndex: 'id', flex: 1, field: { xtype: 'textfield' } },
                { text: 'Created by', dataIndex: 'createdBy', flex: 1, field: { xtype: 'textfield' } },
                {
                    xtype: 'actioncolumn',
                    width: 80,
                    items: [{
                        iconCls: 'x-fa fa-book',
                        tooltip: 'Open the document',
                        handler: 'onDocumentOpenClick',
                        isDisabled: 'isDocumentOpenDisabled'
                    }, {
                        iconCls: 'x-fa fa-eye',
                        tooltip: 'View details',
                        handler: 'onDocumentDetailsClick',
                        isDisabled: 'isDocumentDetailsDisabled'
                    }, {
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit',
                        handler: 'onDocumentEditClick',
                        isDisabled: 'isDocumentEditDisabled'
                    }, {
                        iconCls: 'x-fa fa-trash-o',
                        tooltip: 'Delete the document',
                        handler: 'onDocumentDeleteClick'
                    }]
                }
            ],
        }]
    }, {
            title: 'Tab 2',
            html: 'This is tab 2 content.',
            closable: true
        }]
});
