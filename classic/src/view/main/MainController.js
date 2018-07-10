Ext.define('NavTest.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

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

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                store.findNode('viewType', hashTag);
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
        if (hashTag == 'lockscreen' && newView.xtype === 'lockscreen') {
            me.IsScreenLocked = true,
            me.lockScreenWindow = newView;
        }
        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    if (existingItem == me.lastActiveView) {
                        mainLayout.setActiveItem(me.lastActiveView);
                    } else {
                        mainLayout.setActiveItem(existingItem);
                    }
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        } else {
            // newView isWindow so we dont add it to the card layout and 
            // we dont need to set currentView to 'lockscreen', just stop to here.
            return;
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }
        me.lastActiveView = me.lastView;
        me.lastView = newView;

        if (!me.checkIsActivityTaskRunning() && (hashTag !== 'lockscreen') && (hashTag !== 'loginAudit')) {
            me.setActivityListeners();
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },
    changeNavSize: function (button, pressed) {
        var treelist = this.lookupReference('navigationTreeList'),
            microBtn = this.lookupReference('microBtn'),
            navToolbar = this.lookupReference('navToolbar'),
            tbfillToolbar = this.lookupReference('tbfillToolbar'),
            ct = treelist.ownerCt;

        treelist.setMicro(!pressed);

        if (!pressed) {
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
    microBtnMove: function (btn) {
        var me = this,
            refs = me.getReferences();
        btn.animate({
            to: {
                x: 210
            }
        });
    },
    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            btnIn = Ext.getCmp('main-navigation-btn-in'),
            btnOut = Ext.getCmp('main-navigation-btn-out'),
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 50 : 220,
            logoWidth;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

          //  refs.myLogoPanel.setWidth(new_width);

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
                btnIn.show();
                btnOut.hide();
            }

            // Start this layout first since it does not require a layout

            logoWidth = collapsing ? 0 : 220,

            refs.myLogoPanel.animate({
                dynamic: true,
                to: { width: logoWidth }
            });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.setWidth(new_width);
            wrapContainer.updateLayout({ isRoot: true });

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.setMicro(true);
                btnIn.hide();
                btnOut.show();
            }
        }
    },

    onMainViewRender: function () {
        if (!window.location.hash) {
            this.redirectTo("faq");
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
            this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = window.location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            window.location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },


    onLockScreen: function () {
        var self = this;
        self.disableActivityListeners();
        this.setCurrentView('lockscreen');
    },
    onUnlockScreen: function () {
        var self = this;
        // Additional check IsScreenLocked
        if (self.IsScreenLocked) {
            self.lockScreenWindow.destroy();
        }
        self.setActivityListeners();
        var userInfoPanel = Ext.getCmp('userInfoTreelist')
        if (userInfoPanel) { 
            //This might be considered as hack.. but for now does work
            userInfoPanel.setSelection(1);
        }
    },

    onLogOut: function () {
    // Remove the childs of Ext.Viewport that is your app.Then add the login form to Ext.Viewport.
        var self = this,
            viewport = self.getView(),
            logInCmp = Ext.create({
                xtype: 'loginAudit'
            });

        self.disableActivityListeners();

        Ext.defer(function () {
            viewport.removeAll(true);
            viewport.add(logInCmp);
        }, 1);
        var obj = ['userInfo-modal','hiddenRows-modal'];
        Ext.Array.each(obj, function (item) {
            var toBeClosed = Ext.getCmp(item);
            if (toBeClosed) {
                toBeClosed.destroy();
            }
        })
    },

    activityListeners: ['mousemove', 'mousedown', 'keypress', 'DOMMouseScroll', 'mousewheel', 'touchmove', 'MSPointerMove'],

    setActivityListeners: function () {
        var self = this,
            body = Ext.getBody();

        Ext.Array.each(self.activityListeners, function(evt){
            body.addListener(evt, self.setLastActivityTime);
        });

        self.startActivityTask();
    },

    disableActivityListeners: function () {
        var self = this,
            body = Ext.getBody(),
            store = Ext.util.LocalStorage.get('KAAudit'),
            task = self.checkIsActivityTaskRunning(true);

        Ext.Array.each(self.activityListeners, function(evt){
            body.removeListener(evt, self.setLastActivityTime);
        });

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
            inactivityTimeInMinutes = 10; // in minutes - this should be moved in general config file !!!

        if ((Ext.now() - store.getItem('lastActivity')) > (inactivityTimeInMinutes * 60 * 1000)) {
            self.onLockScreen();
        }
    },

    setLastActivityTime: function () {
        var store = Ext.util.LocalStorage.get('KAAudit');
        store.setItem('lastActivity', Ext.now());
        store.release();
    },

    onSearchClick: function () {

    },

    onSpecialKey: function () {
        this.onSearchClick();
    },

    onImageClick: function (event, img) {
        var popup = Ext.getCmp('userInfo-modal');

        //if (!popup) {
        //    popup = new Ext.Panel({
        //        floating: true,
        //        modal: false,
        //        draggable: false,
        //        id: 'userInfoPopUp',
        //        width: 300,
        //        cls:'modal',
        //        itemId:'popPanel',
        //        height: 400,
        //        hidden: true,
        //        styleHtmlContent: true,
        //        html: 'Hello! I\'m a PopUp',
        //        dockedItems: [{
        //            xtype: 'toolbar',
        //            title: 'PopUp',
        //            items: [{
        //                text: 'Close',
        //                handler: function () {
        //                    popup.hide();
        //                }
        //            }]
        //        }]
        //    });
        //}     
        if (!popup) {
            popup = Ext.create('NavTest.view.common.userInfoModal.UserInfoModal');
        }
        if (popup.isHidden()) {
            popup.showAt((img.x + img.width - popup.width), (img.y + img.height + 5));
        } else {
            popup.hide();
        }
                 
    },
    clickOutsideOfPopUp: function (e, item) {
        var popUpWindows = ['userInfo-modal'],
            ids = item.id.split('-'),
            objs = [];
            
        if (Ext.Array.contains(ids, 'modal')) {
            objs.push(item);
        }

        if (!Ext.isEmpty(objs)) {
            return;
        }

        Ext.Array.each(popUpWindows, function (item) {
            var popUp = Ext.getCmp(item);

            if (popUp && !popUp.hidden) {
                popUp.close(popUp.closeAction);
            }
        })


    }
});
