Ext.define('NavTest.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Audit Manual',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'auditManual',
                routeId: 'auditManual', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Calendar',
                iconCls: 'x-fa fa-calendar',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'calendarPanel',
                id: 'calendarPanel',
                leaf: true
            },
            {
                text: 'Templates',
                iconCls: 'x-fa fa-edit',
                viewType: 'templates',
                routeId: 'templates', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Documents',
                iconCls: 'x-fa fa-edit',
                viewType: 'documents',
                routeId: 'documents', // routeId defaults to viewType
                leaf: true,
            },
            {
                text: 'Clients',
                iconCls: 'x-fa fa-user',
                viewType: 'clients',
                leaf: true
            },
            {
                text: 'FAQ',
                iconCls: 'x-fa fa-question',
                viewType: 'faq',
                leaf: true
            },
            {
                text: 'Grids',
                iconCls: 'x-fa fa-archive',
                viewType: 'grids',
                leaf: false,
                children: [{
                    text: 'SpredSheet',
                    iconCls: 'x-fa fa-file-excel-o',
                    viewType: 'spreadsheet',
                    leaf: true
                }, {
                    text: 'BetterSheet',
                        iconCls: 'x-fa fa-file-excel-o',
                    viewType: 'betterspreadsheet',
                    leaf: true
                }]
            },
            {
                text: 'Admin Panel',
                iconCls: 'x-fa fa-id-card-o',
                viewType: 'adminPanel',
                leaf: true
            }
        ]
    }
});
