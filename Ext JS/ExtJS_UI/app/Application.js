Ext.define('NavTest.Application', {
    extend: 'Ext.app.Application',

    name: 'NavTest',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    stores: [
        'NavigationTree',
        'TemplatesTreeList'
    ],
    defaultToken: 'calendar-panel',



    launch: function () {
        NavTest.HtmlTemplates = {
            footer: new Ext.XTemplate('<h2 style="text-align: center;background-color:orange">{[this.getCompanyName(values)]}</h2>', {
                getCompanyName: function (values) {
                    debugger;
                    var text = "";
                    if (values.companyName) {
                        text = 'Company: ' + values.companyName;
                    } else {
                        text = 'Company: N/A'
                    }
                    return text;
                },
            }),
            spreadSheet: new Ext.XTemplate(
                '<div id="spreadSheet">',
                '{[this.getDivHtml(values)]}',
                '</div>', {
                    getDivHtml: function (values) {
                        Ext.defer(function () {
                            Ext.create({
                                xtype: 'spreadsheet',
                                id: 'spreadSheetCmp',
                                renderTo: 'spreadSheet',
                                title: ''
                            });
                        }, 1);
                    }
                }),
            header: new Ext.XTemplate(
                '<div style="padding: 10px;display:inline-flex">',
                '<div style="width:20em">',
                '<b>User Data:</b><br>',
                '<p>{[this.getUserName(values)]}</p>',
                '<p>{[this.getCompanyName(values)]}</p>',
                '<p>{[this.getAddress(values)]}</p>',
                '</div>',
                '<aside style="width:43em; margin-left:10em">',
                '<b>Over View:</b><br>',
                '<p>{[this.getOverView(values)]}</p>',
                '</aside>',
                '<article style="margin-left: 15em">',
                '<b>Current Date:</b><br>',
                '<p>{[this.getCurrentDate()]}</p>',
                '</article>',
                '</div>', {
                    getCompanyName: function (values) {
                        var text = "";
                        if (values.companyName) {
                            text = 'Company: ' + values.companyName;
                        } else {
                            text = 'Company: N/A'
                        }
                        return text;
                    },
                    getOverView: function (values) {
                        var text = "";
                        if (values.overView) {
                            text = values.overView;
                        } else {
                            text = 'N/A';
                        }
                        return text;
                    },
                    getUserName: function (values) {
                        var text = '';
                        if (values.userName) {
                            text = Ext.String.htmlEncode('UserName : ' + values.userName);
                        } else {
                            text = 'UserName: N/A'
                        }
                        return text
                    },
                    getCurrentDate: function () {
                        Ext.Date.monthNames = [
                            "Яну", "Фев", "Мар",
                            "Апр", "Май", "Юни", "Юли",
                            "Авг", "Сеп", "Окт",
                            "Нов", "Дек"
                        ];
                        return Ext.Date.format(new Date(), 'd M Y');
                    },
                    getAddress: function (values) {
                        var text = "";
                        if (values.address) {
                            text = 'Address: ' + values.address;
                        } else {
                            text = 'Address: N/A';
                        }
                        return text;
                    },
                    getFooterDate: function (values) {
                        // Ext.defer(function () {
                        var btn = Ext.create({
                            xtype: 'button',
                            //id: 'btn',
                            renderTo: Ext.getBody(),
                            // renderTo: 'footer',
                            text: 'Test Button',
                            listeners: {
                                click: function (values) {
                                    console.log(values)
                                }
                            }
                        });
                        //    }, 1)

                        var html = btn.getEl().dom.outerHTML;
                        return html;
                    }

                }),

            main: new Ext.XTemplate(
                '<div style="padding: 10px;display:inline-flex">',
                '<ul>',
                '<li>{[this.getUserName(values)]}</li>',
                '<li>{[this.getCompanyName(values)]}</li>',
                '<li>{[this.getCurrentDate(values)]}</li>',
                '</ul>',
                '</div>', {
                    getCompanyName: function (values) {
                        var text = "";
                        if (values.companyName) {
                            text = 'Company: ' + values.companyName;
                        } else {
                            text = 'Company: N/A'
                        }
                        return text;
                    },
                    getOverView: function (values) {
                        var text = "";
                        if (values.overView) {
                            text = values.overView;
                        } else {
                            text = 'N/A';
                        }
                        return text;
                    },
                    getUserName: function (values) {
                        var text = '';
                        if (values.userName) {
                            text = Ext.String.htmlEncode('UserName : ' + values.userName);
                        } else {
                            text = 'UserName: N/A'
                        }
                        return text
                    },
                    getCurrentDate: function () {
                        Ext.Date.monthNames = [
                            "Яну", "Фев", "Мар",
                            "Апр", "Май", "Юни", "Юли",
                            "Авг", "Сеп", "Окт",
                            "Нов", "Дек"
                        ];
                        return Ext.Date.format(new Date(), 'd M Y');
                    },
                    getAddress: function (values) {
                        var text = "";
                        if (values.address) {
                            text = 'Address: ' + values.address;
                        } else {
                            text = 'Address: N/A';
                        }
                        return text;
                    },
                    getFooterDate: function (values) {
                        // Ext.defer(function () {
                        var btn = Ext.create({
                            xtype: 'button',
                            //id: 'btn',
                            renderTo: Ext.getBody(),
                            // renderTo: 'footer',
                            text: 'Test Button',
                            listeners: {
                                click: function (values) {
                                    console.log(values)
                                }
                            }
                        });
                        //    }, 1)

                        var html = btn.getEl().dom.outerHTML;
                        return html;
                    }

                }),

            grid: new Ext.XTemplate(
                '<div id="grid">',
                '{[this.getDivHtml(values)]}',
                '</div>', {
                    getDivHtml: function (values) {
                        Ext.defer(function () {
                            Ext.create({
                                xtype: 'grid',
                                id: 'gridCmp',
                                renderTo: 'grid',
                                title: 'GridData',
                                store: values,
                                columns: [
                                    { text: 'Name', dataIndex: 'userName', flex: 1 },
                                    { text: 'Company', dataIndex: 'companyName', flex: 1 },
                                    { text: 'Address', dataIndex: 'address', flex: 1 },
                                    { text: 'Email', dataIndex: 'email', flex: 1 },
                                    { text: 'Age', dataIndex: 'age', flex: 1 }
                                ],
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                }
                            });
                        }, 1);
                    }
                })
        };
        NavTest.ContextData = {
            userName: 'Kristiyan Gochev',
            address: 'Iskyrsko Shose 7',
            age: 25,
            isActiveUser: true,
            company: 'PlayBox Technology',
            languages: ['html', 'css', 'c#', 'js']
        };
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn = true;

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("TutorialLoggedIn");

        // (loggedIn) ? this.redirectTo('faq') : this.redirectTo();
        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
        Ext.create({
            xtype: (loggedIn) ? 'app-main' : 'loginAudit'
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
