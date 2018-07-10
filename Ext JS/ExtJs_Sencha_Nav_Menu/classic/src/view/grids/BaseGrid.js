Ext.define('PureAudit.view.grids.BaseGrid',{
    extend: 'Ext.grid.Panel',
    xtype: 'array-grid',
    controller: 'basicgrid',

    requires: [
    'Ext.grid.column.Action'
    ],
    
    title: 'Basic Grid',
    viewModel: {
        stores: {
            companies: {
                type: 'companies',
                autoLoad: true,
            }
        }
    },
    height: 700,
    scrollable:true,
    collapsible: false,
    multiSelect: true,
    stateId: 'companies',
    headerBorders: false,
    bind: '{companies}',
    columns: [{
        text: 'Company',
        flex: 1,
        dataIndex: 'name'
    }, {
        text: 'Price',
        width: 95,
        formatter: 'usMoney',
        dataIndex: 'price'
    }, {
        text: 'Change',
        width: 80,
        renderer: 'renderChange',
        dataIndex: 'priceChange'
    }, {
        text: '% Change',
        width: 100,
        renderer: 'renderPercent',
        dataIndex: 'priceChangePct'
    }, {
        text: 'Last Updated',
        width: 115,
        formatter: 'date("m/d/Y")',
        dataIndex: 'priceLastChange'
    }, {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
    
        items: [{
            iconCls: 'x-fa fa-check green',
            handler: 'onApprove'
        }, {
            iconCls: 'x-fa fa-ban red',
            handler: 'onDecline'
        }]
    }],
    
    signTpl: '<span style="' + 'color:{value:sign(\'"#cf4c35"\',\'"#73b51e"\')}"' + '>{text}</span>'
});