Ext.define('NavTest.view.common.userInfoModal.UserInfoModalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userInfo',


    onUserInfoSelectionChange: function (treelist, item, eOpt) {
        var viewPort = Ext.getCmp('app-main');
        if (!viewPort || !item) {
            return;
        };

        switch (item.data.viewType) {
            case 'lockscreen':
                viewPort.getController().onLockScreen();
                break;
            case 'loginAudit':
                viewPort.getController().onLogOut();
                break;
            default:
                viewPort.getController().setCurrentView(item.data.viewType);
        }
    }
});