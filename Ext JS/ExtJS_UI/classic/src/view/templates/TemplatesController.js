Ext.define('NavTest.view.templates.TemplatesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.temp',
    requires: [
    ],

    tplObjs: {},
    componentsTotalCount: 0,

    loadBaseTemplate: function (value, record, index) {
        debugger;

        if (!record) {
            return;
        }
        var self = this,
            view = self.getView();
            templateId = record.getData().id,
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
        var tplPanel = Ext.getCmp('templatePanel');

        tplPanel.tpl.set(templateObj.data.html, true);
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

        templatePanel = Ext.getCmp('templatePanel');
        templatePanel.tpl.overwrite(templatePanel.body, self.tplObjs);
    },
    applyData: function (type, xTemplate) {
        var self = this;
        switch (type) {
            case '08d5da80-15d3-0d5b-4fea-22078aca0a31':
                var data = {
                    userName: 'Kristiyan Gochev',
                    companyName: 'PlayBoxTechnology',
                    address: 'Filip Kutio 13',
                    overView: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation to deal in the Software ",
                };
                self.loadDataCallback(xTemplate.applyTemplate(data), type);
                break;
            case '08d5da80-15d3-0d5b-4fea-22078aca0a33':
                var data = {
                    companyName: 'PlayBoxTechnology',
                };
                self.loadDataCallback(xTemplate.applyTemplate(data), type);
                break;
            case '08d5da80-15d3-0d5b-4fea-22078aca0a32':
                var deferred = new Ext.Deferred(), // create the Ext.Deferred object
                    userStore = Ext.create('NavTest.store.UserData', {
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
            case '08d5da80-15d3-0d5b-4fea-22078aca0a35':
                var deferred = new Ext.Deferred(), // create the Ext.Deferred object
                    spreadSheetStore = Ext.create('NavTest.store.UserData', {
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
            case '08d5da80-15d3-0d5b-4fea-22078aca0a34':
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
            '08d5da80-15d3-0d5b-4fea-22078aca0a31': NavTest.HtmlTemplates.header,
            '08d5da80-15d3-0d5b-4fea-22078aca0a32': NavTest.HtmlTemplates.grid,
            '08d5da80-15d3-0d5b-4fea-22078aca0a33': NavTest.HtmlTemplates.footer,
            '08d5da80-15d3-0d5b-4fea-22078aca0a34': NavTest.HtmlTemplates.main,
            '08d5da80-15d3-0d5b-4fea-22078aca0a35': NavTest.HtmlTemplates.spreadSheet
        }
        templ.applyData('', obj);
        //var obj = {
        //    '08d5da80-15d3-0d5b-4fea-22078aca0a31': {
        //        name: '08d5da80-15d3-0d5b-4fea-22078aca0a31',
        //        tpl: NavTest.HtmlTemplates.header
        //    },
        //    '08d5da80-15d3-0d5b-4fea-22078aca0a33': {
        //        name: '08d5da80-15d3-0d5b-4fea-22078aca0a33',
        //        tpl: NavTest.HtmlTemplates.footer
        //    },
        //    '08d5da80-15d3-0d5b-4fea-22078aca0a32': {
        //        name: '08d5da80-15d3-0d5b-4fea-22078aca0a32',
        //        tpl: NavTest.HtmlTemplates.grid
        //    },
        //    '08d5da80-15d3-0d5b-4fea-22078aca0a34': {
        //        name: '08d5da80-15d3-0d5b-4fea-22078aca0a34',
        //        tpl: NavTest.HtmlTemplates.main
        //    },
        //    '08d5da80-15d3-0d5b-4fea-22078aca0a35': {
        //        name: '08d5da80-15d3-0d5b-4fea-22078aca0a35',
        //        tpl: NavTest.HtmlTemplates.spreadSheet
        //    }
        //};

        //return (obj[id]) ? obj[id] : null;

    }
    //testPromise: function () {
    //    var userStore = Ext.getStore('userDataStore');
    //    userStore.load({
    //        callback: function (record) {
    //            console.log(record);
    //        }
    //    });
    //},
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

    //onApplyTempOneClick: function () {
    //    var self = this.getView()
    //    //header is specified in Application.js as Global var
    //    header = NavTest.HtmlTemplates.header,
    //        grid = NavTest.HtmlTemplates.grid,
    //        //Applying data over the template
    //        userStore = Ext.getStore('userDataStore'),
    //        data = {
    //            userName: 'Kristiyan Gochev',
    //            companyName: 'PlayBoxTechnology',
    //            address: 'Filip Kutio 13',
    //            overView: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation to deal in the Software ",
    //        };
    //    headerNew = header.applyTemplate(data);
    //    userStore.reload();
    //    gridNew = grid.applyTemplate(userStore);
    //    //OverWrite the template and render it to the body
    //    self.tpl.overwrite(self.body, {
    //        headerDiv: headerNew,
    //        mainDiv: gridNew,
    //        footerDiv: '<h2 style="text-align: center;background-color:orange">PlayBox Technology Limited Edition</h2>'
    //    })
    //},
    //onApplyTempTwoClick: function () {
    //    var self = this.getView()
    //    //header is specified in Application.js as Global var
    //    //header = NavTest.HtmlTemplates.header,
    //    header = NavTest.HtmlTemplates.senchaExample,
    //        //Applying data over the template
    //        data = {
    //            userName: 'Joro Petkov',
    //            companyName: 'Slavia',
    //            address: 'Street 13',
    //            overView: "Mnogo vargi govedoto",
    //        };
    //    headerNew = header.applyTemplate(data);
    //    //OverWrite the template and render it to the body
    //    self.tpl.overwrite(self.body, {
    //        headerDiv: headerNew,
    //        mainDiv: '<h2 style="text-align: center; background-color:orange">PlayBox Technology Limited Edition</h2>'
    //    })
    //},
    //onApplyTempThreeClick: function () {

    //    var self = this.getView(),
    //        templateStore = self.store,
    //        panel = Ext.getCmp('templatePanel'),
    //        tplHtml = templateStore.findRecord('html', '<').getData().html;
    //    //Set html to Ext.XTemplate
    //    self.tpl.html = tplHtml;
    //    /////
    //    /* get the sub-components and combine them in the BaseTemplate */
    //    /////
    //    header = NavTest.HtmlTemplates.header,
    //        grid = NavTest.HtmlTemplates.grid,
    //        //Applying data over the template
    //        userStore = Ext.getStore('userDataStore'),
    //        data = {
    //            userName: 'Kristiyan Gochev',
    //            companyName: 'PlayBoxTechnology',
    //            address: 'Filip Kutio 13',
    //            overView: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation to deal in the Software ",
    //        };
    //    headerNew = header.applyTemplate(data);
    //    userStore.reload();
    //    gridNew = grid.applyTemplate(userStore);
    //    //OverWrite the template and render it to the body
    //    self.tpl.overwrite(self.body, {
    //        headerDiv: headerNew,
    //        mainDiv: gridNew,
    //        footerDiv: '<h2 style="text-align: center;background-color:orange">PlayBox Technology Limited Edition</h2>'
    //    })
    //},
    //onApplyTempFourClick: function () {
    //    ///Bache Kris, tuka trqbva da se napravi nov nabor ot sub-templati koito shte sa na baza na razlichen BaseTemplate!

    //}

});