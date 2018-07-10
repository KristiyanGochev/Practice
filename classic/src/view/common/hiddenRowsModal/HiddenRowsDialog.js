Ext.define('NavTest.view.common.hiddenRowsModal.HiddenRowsDialog', {
    extend: 'Ext.panel.Panel',
    xtype: 'hiddenRowsDialog',

    controller: 'hiddenRows',

    modal: false,
    floating: true,
    hidden: true,
    width: 400,
    height: 400,
    shadow: 'side',
    shadowOffset: 10,
    id: 'hiddenRows-modal',
    closeAction: 'hide',
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        height: 60,
        ui: 'userInfoToolBar',
        items: [
            {
                text: 'Show Selected',
                handler:'showSelectedRows'
            }, {
                text: 'Show All',
                handler: 'showAllRows'
            }, '->', {
                iconCls: 'x-fa fa-refresh',
                handler: 'refreshStore'
            },{
                iconCls:'x-fa fa-close',
                handler: 'closeHiddenRowsDialog'
            }
        ]
    }],
    items: [
        {
            xtype: 'grid',
            id:'hiddenRowsGrid',
            store:[],
            columns:[{
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
                    dataIndex: 'priceChange',
                    flex: 1,
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    text: '% Change',
                    width: 100,
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
                }]
        }
    ]
});