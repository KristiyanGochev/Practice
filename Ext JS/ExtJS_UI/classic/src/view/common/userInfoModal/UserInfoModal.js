Ext.define('NavTest.view.common.userInfoModal.UserInfoModal', {
    extend: 'Ext.panel.Panel',
    xtype: 'userInfoModalPopUp',
    viewModel: 'userInfoModalPopUp',

    controller: 'userInfo',

    modal: false,
    floating: true,
    styleHtmlContent: true,
    hidden: true,
    width: 250,
    height: 400,
    shadow: 'side',
    shadowOffset: 10,

    ui: 'userInfoPanel',
    id: 'userInfo-modal',
    closeAction: 'hide',
    layout: 'fit',

    dockedItems: [{
        xtype: 'toolbar',
        height: 60,
        ui: 'userInfoToolBar',
        items: [
            //    {
            //    text: 'Close',
            //    handler: function () {
            //        var self = this,
            //            // In order to escape from Ext.getCmp('id') we do : 
            //            // As the button is chield of toolbar which is chield of the Panel 
            //            parentPanel = self.getBubbleParent().getBubbleParent();            
            //        parentPanel.close(parentPanel.closeAction);
            //    }
            //}
            {
                xtype: 'image',
                src: 'resources/images/user-profile/kris.png',
                alt: 'No Image!',
                margin: 10,
                height: 35,
                width: 35,
                style: {
                    borderRadius: '20px'
                }
            }, {
                xtype: 'label',
                width: 265,
                text: 'Kristian Gochev',
            }
        ]
    }],
    items: [{
        xtype: 'treelist',
        reference: 'userInfoTreelist',
        id: 'userInfoTreelist',
        ui: 'userInfoTreelist',
        store: {},
        bind: {
            store: '{userPanelTreelistStore}'
        },
        width: 150,
        expanderFirst: false,
        expanderOnly: false,
        listeners: {
            selectionchange: 'onUserInfoSelectionChange'
        }
    }]
});