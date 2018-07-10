Ext.define('PureAudit.view.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    //////////////////////////////////////
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },
    onRouteChange: function (id) {
        this.setCurrentView(id);
    },
    onLockScreen: function () {
        var self = this;
        self.disableActivityListeners();
        this.setCurrentView('lockscreen');
    },
    onLogOut: function () {
        this.setCurrentView('loginAudit');
    },

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.treelist,
            //  store = navigationList.getStore(),
            data = me.getViewModel().get('navItems'),
            node = data.findNode('routeId', hashTag) ||
                data.findNode('viewType', hashTag);
        if (!node) {
            var data = me.getViewModel().data.doNotDisplayItems,
                node = data.findNode('routeId', hashTag) ||
                    data.findNode('viewType', hashTag)
        };

        var view = (node && node.get('viewType')) || 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,  // for existingItem search later
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                debugger;
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                debugger;
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;

        if (!me.checkIsActivityTaskRunning() && (hashTag !== 'lockscreen') && (hashTag !== 'loginAudit')) {
            me.setActivityListeners();
        }
    },
    clickSettings: function () {
        console.log('Settings')
    },
    clickUser: function () {
        console.log('User')
    },

    //////////////////////////////////////
    onToggleConfig: function (menuitem) {
        var treelist = this.lookupReference('treelist');

        treelist.setConfig(menuitem.config, menuitem.checked);
    },
    getNavCls: function () {
        var treelist = this.lookupReference('treelist'),
            pressed = true,
            ct = this.lookupReference('treelistContainer');
        treelist.setConfig('expanderOnly', false);
        treelist.setExpanderFirst(!pressed);
        //treelist.setUi(pressed ? 'navColor' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

    },

    onToggleMicro: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            microBtn = this.lookupReference('microBtn'),
            ct = treelist.ownerCt;

        treelist.setMicro(pressed);

        if (pressed) {
            microBtn.setTextAlign('center');
            //navBtn.setPressed(true);
            //navBtn.disable();
            this.oldWidth = ct.width;
            ct.setWidth(44);
        } else {
            microBtn.setTextAlign('right');
            ct.setWidth(this.oldWidth);
            //navBtn.enable();
        }

        // IE8 has an odd bug with handling font icons in pseudo elements;
        // it will render the icon once and not update it when something
        // like text color is changed via style addition or removal.
        // We have to force icon repaint by adding a style with forced empty
        // pseudo element content, (x-sync-repaint) and removing it back to work
        // around this issue.
        // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
        // and this: https://github.com/twbs/bootstrap/issues/13863
        if (Ext.isIE8) {
            this.repaintList(treelist, pressed);
        }
    },
    onToggleNav: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
    },
    changeNavSize: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            microBtn = this.lookupReference('microBtn'),
            navToolbar = this.lookupReference('navToolbar'),
            tbfillToolbar = this.lookupReference('tbfillToolbar'),
            ct = treelist.ownerCt;

        treelist.setMicro(!pressed);

        if (!pressed) {
            //  microBtn.setTextAlign('center');
            //navBtn.setPressed(true);
            //navBtn.disable();
            //this.oldWidth = ct.width;
            ct.setWidth(64);
            navToolbar.setWidth(64);
            treelist.setWidth(64);
            microBtn.setIconCls('x-fa fa-bars');
            tbfillToolbar.show();
        } else {
            // microBtn.setTextAlign('right');
            ct.setWidth(250);
            navToolbar.setWidth(250);
            treelist.setWidth(250);
            microBtn.setIconCls('x-fa fa-close');
            tbfillToolbar.hide();
            //navBtn.enable();
        }

    },
    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.treelist,
            wrapContainer = refs.treelistContainer,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 63 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({ dynamic: true, to: { width: new_width } });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({ isRoot: true });
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },
    repaintList: function (treelist, microMode) {
        treelist.getStore().getRoot().cascade(function (node) {
            var item, toolElement;

            item = treelist.getItem(node);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    },

    setActivityListeners: function () {
        var self = this,
            body = Ext.getBody();

        body.addListener('mousemove', self.setLastActivityTime);
        body.addListener('mousedown', self.setLastActivityTime);
        body.addListener('keypress', self.setLastActivityTime);
        body.addListener('DOMMouseScroll', self.setLastActivityTime);
        body.addListener('mousewheel', self.setLastActivityTime);
        body.addListener('touchmove', self.setLastActivityTime);
        body.addListener('MSPointerMove', self.setLastActivityTime);

        self.startActivityTask();
    },

    disableActivityListeners: function () {
        var self = this,
            body = Ext.getBody(),
            store = Ext.util.LocalStorage.get('KAAudit'),
            task = self.checkIsActivityTaskRunning(true);

        body.removeListener('mousemove', self.setLastActivityTime);
        body.removeListener('mousedown', self.setLastActivityTime);
        body.removeListener('keypress', self.setLastActivityTime);
        body.removeListener('DOMMouseScroll', self.setLastActivityTime);
        body.removeListener('mousewheel', self.setLastActivityTime);
        body.removeListener('touchmove', self.setLastActivityTime);
        body.removeListener('MSPointerMove', self.setLastActivityTime);

        Ext.TaskManager.stop(task, true);

        store.removeItem('lastActivity');
        store.release();

    },

    startActivityTask: function () {
        var self = this,
            task = {
                run: function () {
                    self.validateLastActivityTime();
                },
                name: 'ActivityTask',
                fireOnStart: false,
                interval: 5000
            };

        self.setLastActivityTime();

        Ext.TaskManager.start(task);
    },

    checkIsActivityTaskRunning: function (returnTask) {
        var taskExist = false,
            taskReturn;

        if (Ext.isEmpty(Ext.TaskManager.tasks)) {
            return taskExist;
        }
        Ext.Array.each(Ext.TaskManager.tasks, function (task) {
            taskExist = true;
            taskReturn = task;
            return false;
        });
        if (returnTask && (returnTask === true)) {
            return taskReturn;
        }
        return taskExist;
    },

    validateLastActivityTime: function () {
        var self = this,
            store = Ext.util.LocalStorage.get('KAAudit'),
            inactivityTimeInMinutes = 1; // in minutes - this should be moved in general config file !!!

        if ((Ext.now() - store.getItem('lastActivity')) > (inactivityTimeInMinutes * 60 * 1000)) {
            self.onLockScreen();
        }
    },

    setLastActivityTime: function () {
        var store = Ext.util.LocalStorage.get('KAAudit');
        store.setItem('lastActivity', Ext.now());
        store.release();
    }
});