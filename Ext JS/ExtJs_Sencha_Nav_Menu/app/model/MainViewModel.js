Ext.define('PureAudit.model.MainViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    formulas: {
        selectionText: function(get) {
            var selection = get('treelist.selection'),
                path;
            if (selection) {
                path = selection.getPath('text');
                path = path.replace(/^\/Root/, '');
                return 'Selected: ' + path;
            } else {
                return 'No node selected';
            }
        }
    },

    stores: {
        navItems: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Home',
                    viewType:'home',
                    iconCls: 'x-fa fa-home',
                    children: [{
                        text: 'Templates',
                        viewType: 'templates',
                        iconCls: 'x-fa fa-inbox',
                        leaf: true
                    },{
                        text: 'FAQ',
                        iconCls: 'x-fa fa-database',
                        viewType: 'faq',
                        leaf: true
                    },{
                        text: 'Grid',
                        viewType: 'array-grid',
                        iconCls: 'x-fa fa-bar-chart',
                        leaf: true
                    },{
                        text: 'SpreadSheet',
                        viewType: 'spreadsheet',
                        iconCls: 'x-fa fa-film',
                        leaf: true
                    },{
                        text: 'BetterSpreadSheet',
                        viewType: 'betterspreadsheet',
                        iconCls: 'x-fa fa-film',
                        leaf: true
                      }]
                },{
                    text: 'Users',
                    viewType: 'users',
                    iconCls: 'x-fa fa-user',
                    children: [{
                        text: 'Add User',
                        iconCls: 'x-fa fa-tag',
                        leaf: true
                    },{
                        text: 'Removed',
                        iconCls: 'x-fa fa-trash',
                        leaf: true
                    }]
                },{
                    text: 'Admin Console',
                    iconCls: 'x-fa fa-vcard-o',
                    viewType: 'admin-console',
                    id:'admin-console',
                    leaf: true
                    },{
                        text: 'Calendar',
                        iconCls: 'x-fa fa-vcard-o',
                        viewType: 'calendar-panel',
                        id: 'calendar-panel',
                        leaf: true
                    }, {
                    text: 'Settings',
                    iconCls: 'x-fa fa-wrench',
                    children: [{
                        text: 'Sharing',
                        iconCls: 'x-fa fa-share-alt',
                        leaf: true
                    },{
                        text: 'Notifications',
                        iconCls: 'x-fa fa-flag',
                        leaf: true
                    },{
                        text: 'Network',
                        iconCls: 'x-fa fa-signal',
                        leaf: true
                    }]
                }]
            }
        },
        doNotDisplayItems: {         
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'LockScreen',
                    viewType: 'lockscreen'            
                }, {
                    text: 'LoginAudit',
                    viewType:'loginAudit'
                }, {
                    text: 'appMain',
                    viewType: 'app-main'
                }, {
                    text: 'page404',
                    viewType: 'page404'
                }]
            }
        }
    }
}); 