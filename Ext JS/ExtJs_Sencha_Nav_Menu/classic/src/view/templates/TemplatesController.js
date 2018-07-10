Ext.define('PureAudit.view.templates.TemplatesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.temp',
    requires: [
    ],

    tplObjs: {},
    componentsTotalCount: 0,

    loadBaseTemplate: function (value, record, index) {
        var self = this,
            view = self.getView();
            templateId = value.config.templateId,
            store = this.getViewModel().getStore('templates'),
            templateObj = store.findRecord('id', templateId);
        ///Let`s set the html to the Panel Tpl
        if (!templateObj) {
            return;
        }
        /// Reset the Template objects
        self.tplObjs = {};
        //view.tpl.destroyMembers('html', 'fn')
       // view.tpl.destroy();
        ///
        if (Ext.getCmp('gridCmp')) {
            Ext.getCmp('gridCmp').destroy();
        };
        if (Ext.getCmp('spreadSheetCmp')) {
            Ext.getCmp('spreadSheetCmp').destroy();
        };
        var a = Ext.getCmp('templatePanel');

        a.tpl.set(templateObj.data.html, true);
        var tempComponents = templateObj.get('components');

        self.componentsTotalCount = tempComponents.length;

        Ext.Array.each(tempComponents, function (name, index, countriesItSelf) {
            var comp = self.checkComponent(name),
                XtemplateType = comp.name,
                XtemplateTpl = comp.tpl,

                //APPLY DATA over the html
                compReady = self.applyData(XtemplateType, XtemplateTpl);

            //tplObjs[XtemplateType] = compReady;
        });

        //view.tpl.overwrite(view.body, tplObjs);

    },
    loadDataCallback: function (data, type) {
        var self = this;

        self.tplObjs[type] = data;

        if (Object.keys(self.tplObjs).length === self.componentsTotalCount) {
            self.tplOverWrite();
        }
    },

    tplOverWrite: function () {
        var self = this,
            view = self.getView();

        //view.tpl.overwrite(view.body, self.tplObjs);

        a = Ext.getCmp('templatePanel');

        a.tpl.overwrite(view.body, self.tplObjs);
    },
    applyData: function (type, xTemplate) {
        var self = this;
        switch (type) {
            case 'header':
                var data = {
                    userName: 'Kristiyan Gochev',
                    companyName: 'PlayBoxTechnology',
                    address: 'Filip Kutio 13',
                    overView: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation to deal in the Software ",
                };
                self.loadDataCallback(xTemplate.applyTemplate(data), type);
                break;
            case 'footer':
                var data = {
                    companyName: 'PlayBoxTechnology',
                };
                self.loadDataCallback(xTemplate.applyTemplate(data), type);
                break;
            case 'grid':
                var deferred = new Ext.Deferred(), // create the Ext.Deferred object
                    userStore = Ext.create('PureAudit.store.UserData', {
                        autoLoad: true,
                        storeId: 'dataUser'
                    });
                userStore.load({
                    callback: function (records, operation, success) {
                        if (success) {
                            // Use "deferred" to drive the promise:
                            self.loadDataCallback(xTemplate.applyTemplate(userStore), type);
                        }
                        else {
                            self.loadDataCallback(xTemplate.applyTemplate(userStore), type);
                        }
                    }
                });
                break;
            case 'spreadSheet':
                var deferred = new Ext.Deferred(), // create the Ext.Deferred object
                    spreadSheetStore = Ext.create('PureAudit.store.UserData', {
                        autoLoad: true,
                        storeId: 'dataUser'
                    });
                spreadSheetStore.load({
                    callback: function (records, operation, success) {
                        if (success) {
                            // Use "deferred" to drive the promise:
                            self.loadDataCallback(xTemplate.applyTemplate(spreadSheetStore), type);
                        }
                        else {
                            self.loadDataCallback(xTemplate.applyTemplate(spreadSheetStore), type);
                        }
                    }
                });
                break;
            case 'main':
                var data = {
                    userName: 'Gosho',
                    companyName: '#faq',
                    address: 'Main Street 16',
                    overView: "OverView",
                };
                self.loadDataCallback(xTemplate.applyTemplate(data), type);
                break;
            default:
                return null
                break;
        }
    },
    checkComponent: function (id) {
        var obj = {
            1: {
                name: 'header',
                tpl: PureAudit.HtmlTemplates.header
            },
            2: {
                name: 'footer',
                tpl: PureAudit.HtmlTemplates.footer
            },
            3: {
                name: 'grid',
                tpl: PureAudit.HtmlTemplates.grid
            },
            4: {
                name: 'main',
                tpl: PureAudit.HtmlTemplates.main
            },
            5: {
                name: 'spreadSheet',
                tpl: PureAudit.HtmlTemplates.spreadSheet
            }
        };

        return (obj[id]) ? obj[id] : null;

    },
    testPromise: function () {
        var userStore = Ext.getStore('userDataStore');
        userStore.load({
            callback: function (record) {
                console.log(record);
            }
        });
    },
    ///////////////////////////////////////////////
    //Loading baseTemplate from external Json file.
    //loadBaseTemplate_Old: function () {
    //    var self = this.getView(),
    //        templateStore = self.store,
    //        panel = Ext.getCmp('templatePanel'),
    //        ob = [];
    //    Ext.Array.each(templateStore.getRange(0, templateStore.getCount()), function (record) {
    //        ob.push(record.getData());
    //    });
    //    var first = ob[0];
    //    self.tpl.html = first.html;
    //},

    onApplyTempOneClick: function () {
        var self = this.getView()
        //header is specified in Application.js as Global var
        header = PureAudit.HtmlTemplates.header,
            grid = PureAudit.HtmlTemplates.grid,
            //Applying data over the template
            userStore = Ext.getStore('userDataStore'),
            data = {
                userName: 'Kristiyan Gochev',
                companyName: 'PlayBoxTechnology',
                address: 'Filip Kutio 13',
                overView: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation to deal in the Software ",
            };
        headerNew = header.applyTemplate(data);
        userStore.reload();
        gridNew = grid.applyTemplate(userStore);
        //OverWrite the template and render it to the body
        self.tpl.overwrite(self.body, {
            headerDiv: headerNew,
            mainDiv: gridNew,
            footerDiv: '<h2 style="text-align: center;background-color:orange">PlayBox Technology Limited Edition</h2>'
        })
    },
    onApplyTempTwoClick: function () {
        var self = this.getView()
        //header is specified in Application.js as Global var
        //header = PureAudit.HtmlTemplates.header,
        header = PureAudit.HtmlTemplates.senchaExample,
            //Applying data over the template
            data = {
                userName: 'Joro Petkov',
                companyName: 'Slavia',
                address: 'Street 13',
                overView: "Mnogo vargi govedoto",
            };
        headerNew = header.applyTemplate(data);
        //OverWrite the template and render it to the body
        self.tpl.overwrite(self.body, {
            headerDiv: headerNew,
            mainDiv: '<h2 style="text-align: center; background-color:orange">PlayBox Technology Limited Edition</h2>'
        })
    },
    onApplyTempThreeClick: function () {

        var self = this.getView(),
            templateStore = self.store,
            panel = Ext.getCmp('templatePanel'),
            tplHtml = templateStore.findRecord('html', '<').getData().html;
        //Set html to Ext.XTemplate
        self.tpl.html = tplHtml;
        /////
        /* get the sub-components and combine them in the BaseTemplate */
        /////
        header = PureAudit.HtmlTemplates.header,
            grid = PureAudit.HtmlTemplates.grid,
            //Applying data over the template
            userStore = Ext.getStore('userDataStore'),
            data = {
                userName: 'Kristiyan Gochev',
                companyName: 'PlayBoxTechnology',
                address: 'Filip Kutio 13',
                overView: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation to deal in the Software ",
            };
        headerNew = header.applyTemplate(data);
        userStore.reload();
        gridNew = grid.applyTemplate(userStore);
        //OverWrite the template and render it to the body
        self.tpl.overwrite(self.body, {
            headerDiv: headerNew,
            mainDiv: gridNew,
            footerDiv: '<h2 style="text-align: center;background-color:orange">PlayBox Technology Limited Edition</h2>'
        })
    },
    onApplyTempFourClick: function () {
        ///Bache Kris, tuka trqbva da se napravi nov nabor ot sub-templati koito shte sa na baza na razlichen BaseTemplate!

    }

});