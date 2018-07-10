Ext.define('NavTest.view.documents.DocumentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.documents',
    requires: [
        'NavTest.store.TumbTemps'
    ],


    onSearchClick: function () {
        console.log('SearchClick');
    },

    onCreateDocumentClick: function () {
        debugger;
        var existing = Ext.getCmp('createDocumentModal');
        if (existing) {
            existing.destroy();
        }
        var newDocPanel = Ext.create('NavTest.view.documents.dialogs.ModalDocumentDialog', {
            id: 'createDocumentModal',
            extend: 'Ext.form.Panel',
            requires: [
                'NavTest.view.documents.DocumentsController',
                'NavTest.store.TumbTemps'
            ],
            viewModel: {
                stores: {
                    temps: {
                        type: 'tumbTemps',
                        autoLoad: true,
                    }
                }
            },
            controller:'documents',
            header: {
                title: 'Create new document',
                items: [{
                    xtype: 'button',
                    border:false,
                    iconCls:'x-fa fa-remove',
                    handler:'closeCreateDocument'
                }]
            },
            items: [{
                layout: 'form',
                xtype: 'form',
                id:'createDocumentForm',
                items: [{
                    xtype: 'textfield',
                    name: 'documentName',
                    fieldLabel: 'Document name',
                    emptyText: 'Please enter a name for the document',
                    allowBlank: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }, {
                    xtype: 'textfield',
                    name: 'userPassword',
                    inputType: 'password',
                    emptyText: 'Password',
                    fieldLabel: 'Please enter your account password',
                    allowBlank: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }, {
                    xtype: 'combobox',
                    id:'comboTemp',
                    fieldLabel: 'Template',
                        name: 'templateId',

                        forceSelection: true,
                    store: null,
                    bind: {
                        store:'{temps}'
                    },
                    valueField: 'id',
                    displayField: 'name',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select a template...',
                    allowBlank: false, afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Practice',
                    name: 'practice',
                    forceSelection : true,
                    store: null,
                    bind: {
                        store: '{temps}'
                    },
                    valueField: 'id',
                    displayField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select a practice...',
                    allowBlank: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }, {
                    xtype: 'textareafield',
                    name: 'discription',
                    fieldLabel: 'Discription',
                    emptyText: '(Optional)'
                }, {
                    xtype: 'numberfield',
                    name: 'numberfield1',
                    fieldLabel: 'Number of employee',
                    value: 1,
                    minValue: 1,
                    maxValue: 50,
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    name: 'endDate',
                    fieldLabel: 'Project end date',
                    minValue: new Date()
                }, {
                    xtype: 'timefield',
                    name: 'timeField',
                    fieldLabel: 'Time Field',
                    minValue: '1:30 AM',
                    maxValue: '9:15 PM'
                },{
                    xtype: 'filefield',
                    name: 'file1',
                    fieldLabel: 'Import data from file',
                    emptyText: 'Supported data files are: xml,html,xlsx',
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Who can view this document',
                    cls: 'x-check-group-alt',
                    name: 'privacyField',
                    items: [
                        { boxLabel: 'Public', inputValue: 1 , checked: true },
                        { boxLabel: 'Private', inputValue: 2 },
                        { boxLabel: 'Only me', inputValue: 3 },
                        { boxLabel: 'Not my boss', inputValue: 4 }]
                    }],
                buttons: [{
                    text: 'Submit',
                    disabled: true,
                    formBind: true,
                    listeners: {
                        click: 'onSubmitFormClick'
                    }
                }, {
                    text: 'Reset',
                    handler: 'onResetClick'
                }, {
                    text: 'Cancel',
                    listeners: {
                        click: 'onCancelNewDocClick'
                    }
                }]
            }]
        });
        newDocPanel.setWidth(1000);
        newDocPanel.setHeight(800);
        newDocPanel.show();
    },

    onCancelNewDocClick: function () {
        this.closeCreateDocument();
    },
    onResetClick: function () {
        var self = this;
        Ext.Msg.show({
            title: 'Reset form',
            message: 'Form resetting, are you sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    self.getForm().reset();
                } else if (btn === 'no') {
                    return;
                };
            }
        });
        
    },
    getForm: function () {
        var form = Ext.getCmp('createDocumentForm');
        return form.getForm();
    },

    closeCreateDocument: function () {
        var existing = Ext.getCmp('createDocumentModal');
        if (!existing) {
            return;
        }
        existing.destroy();
    },
    onSubmitFormClick: function () {
            var form = this.getForm(),
                pretty, values;

            if (form.isValid()) {
                values = form.getValues(true);

                pretty = Ext.Array.map(values.split('&'), function (val) {
                    val = decodeURIComponent(val);
                    var i = val.indexOf('=');
                    return '<b>' + val.substr(0, i) + ': </b>' +
                        Ext.htmlEncode(val.substr(i + 1));
                });

                pretty = pretty.join('<br>') +
                    '<br><br><b>Raw values:</b>' +
                    '<pre style="overflow:auto; margin-top:0;padding:8px;">' +
                    Ext.htmlEncode(values) +
                    '</pre>';


                Ext.getCmp('createDocumentModal').destroy();

                Ext.toast({
                    html: pretty,
                    title: 'Submitted Values',
                    width: 300,
                    align: 't'
                });
            }
    },

    //////////OnClickAction//////////
    onDocumentOpenClick: function (vw, rowIndex, colIndex, item, e, record) {
        debugger;
        var self = this,
            tabPanel = self.getView(),
            tabName = record.get('name'),
            documentId = record.getId();
        var openDocument = 
        
    },
    onDocumentDetailsClick: function (vw, rowIndex, colIndex, item, e, record) {

    },
    onDocumentEditClick: function (vw, rowIndex, colIndex, item, e, record) {

    },

    onDocumentDeleteClick: function (vw, rowIndex, colIndex, item, e, record) {

    },

    //////////isDisabled//////////
    isDocumentDetailsDisabled: function (view, rowIndex, colIndex, item, record) {
        return false;
    },

    isDocumentOpenDisabled: function (view, rowIndex, colIndex, item, record) {
        return false;
    },

    isDocumentEditDisabled: function (view, rowIndex, colIndex, item, record) {
        return false;
    },

    isDocumentDeleteDisabled: function (view, rowIndex, colIndex, item, record) {
        return false;
    }

});