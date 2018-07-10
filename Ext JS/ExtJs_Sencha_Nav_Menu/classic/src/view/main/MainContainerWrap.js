Ext.define('PureAudit.view.main.MainContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerWrap',

    requires: [
        'Ext.layout.container.HBox'
    ],

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
    listeners: [{
        afterrender: function () {
            // We setup some minHeights dynamically to ensure we stretch to fill the height
            // of the viewport minus the top toolbar and dockedItems above treelist
            var me = this,
                height = Ext.Element.getViewportHeight() - 100,  // offset by topmost toolbar height
                // We use itemId/getComponent instead of "reference" because the initial
                // layout occurs too early for the reference to be resolved
                navTree = Ext.getCmp('treelist');
            //me.lookupReference('treelist');

            me.minHeight = height;

            navTree.setStyle({
                'min-height': height + 'px'
            });

            //  me.callParent(arguments);
        }

    }]

    //beforeLayout: function () {
    //    // We setup some minHeights dynamically to ensure we stretch to fill the height
    //    // of the viewport minus the top toolbar
    //    debugger;
    //    var me = this,
    //        height = Ext.Element.getViewportHeight() - 64,  // offset by topmost toolbar height
    //        // We use itemId/getComponent instead of "reference" because the initial
    //        // layout occurs too early for the reference to be resolved
    //        navTree = me.lookupReference('treelist');

    //    me.minHeight = height;

    //    navTree.setStyle({
    //        'min-height': height + 'px'
    //    });

    //    me.callParent(arguments);
    //}
});
