Ext.define('NavTest.view.main.MainContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerwrap',

    requires : [
        'Ext.layout.container.HBox'
    ],

    scrollable: 'y',

    layout: {
        type: 'hbox',
        align: 'stretchmax',

        // Tell the layout to animate the x/width of the child items.
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },
    click: function () {
        debugger;
    },
    beforeLayout: function () {
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar
        var me = this,
            height = Ext.Element.getViewportHeight() - 60,  // offset by topmost toolbar height
            // We use itemId/getComponent instead of "reference" because the initial
            // layout occurs too early for the reference to be resolved
            navTree = Ext.getCmp('navigationTreeList');
          //  navTree = Ext.getCmp('tabpanel');
            me.minHeight = height;

        navTree.setStyle({
            'min-height': height + 'px'
        });

        me.callParent(arguments);
        // Attaching Click Event on ViewPort
        Ext.getBody().on({
            click: function (e, item) {
                Ext.getCmp('app-main').getController().clickOutsideOfPopUp(e, item);
            }
        });
    }
});
