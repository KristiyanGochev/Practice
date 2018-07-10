Ext.define('NavTest.model.UserInfoModalPopUpModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.userInfoModalPopUp',

    stores: {
        userPanelTreelistStore: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Account Settings',
                    iconCls: 'x-fa fa-gear',
                    leaf: true
                },{
                    text: 'Asignmants',
                    iconCls: 'x-fa fa-bank',
                    leaf:true
                    }, {
                    text: 'Users',
                    viewType: 'users',
                    iconCls: 'x-fa fa-user',
                    children: [{
                        text: 'Add User',
                        iconCls: 'x-fa fa-tag',
                        leaf: true
                    }, {
                        text: 'Removed',
                        iconCls: 'x-fa fa-trash',
                        leaf: true
                    }]
                }, {
                    text: 'Admin Console',
                    iconCls: 'x-fa fa-vcard-o',
                    viewType: 'admin-console',
                    id: 'admin-console',
                    leaf: true
                }, {
                    text: 'Lock screen',
                    iconCls: 'x-fa fa-vcard-o',
                    viewType: 'lockscreen',
                    leaf: true
                }, {
                    text: 'Sing out',
                    iconCls: 'x-fa fa-vcard-o',
                    viewType: 'loginAudit',
                    leaf: true
                    }]
            }
        }
    }
}); 