// Define libraries
require.config({
    baseUrl: 'static/js/',
    paths: {
        mocha: 'lib/mocha-1.4.2',
        chai: 'lib/chai-1.2.0',
        jquery: 'lib/jquery-1.9.1',
        jqueryUi: 'lib/jquery-ui-1.9.1.custom',
        text: 'lib/require/text',
        ember: 'lib/ember-1.0.0-rc.1',
        handlebars: 'lib/handlebars-1.0.0-rc.3',
        mobile: 'lib/jquery.mobile-1.3.0',
        d3: 'lib/d3-2.10.1',
        cubism: 'lib/cubism-1.2.2',
        md5: 'lib/md5',
        sha256: 'lib/sha256',
    },
    shim: {
        'ember': {
            deps: ['handlebars', 'text', 'jquery', 'md5', 'sha256']
        },
        'jqueryUi': {
            deps: ['jquery']
        },
        'd3': {
            deps: ['jquery']
        },
        'cubism':{
            deps: ['d3']
        }
    }
});

// Load our app
define( 'app', [
    'jquery',
    'jqueryUi',
    'd3',
    'app/controllers/backends',
    'app/controllers/confirmation',
    'app/controllers/notification',
    'app/controllers/backend_add',
    'app/controllers/machine_add',
    'app/controllers/key_add',
    'app/controllers/select_machines',
    'app/controllers/select_images',
    'app/controllers/keys',
    'app/controllers/rules',
    'app/views/home',
    'app/views/count',
    'app/views/backend_button',
    'app/views/backend_add',
    'app/views/backend_edit',
    'app/views/machine_list_item',
    'app/views/image_list_item',
    'app/views/machine_add_dialog',
    'app/views/machine',
    'app/views/machine_list',
    'app/views/machine_key_list_item',
    'app/views/confirmation_dialog',
    'app/views/machine_actions_dialog',
    'app/views/single_machine_actions_dialog',
    'app/views/shell',
    'app/views/image_list',
    'app/views/delete_tag',
    'app/views/machine_tags_dialog',
    'app/views/machine_monitoring_dialog',
    'app/views/key_list_item',
    'app/views/key_list',
    'app/views/key',
    'app/views/key_add_dialog',
    'app/views/key_associate_dialog',
    'app/views/key_priv_dialog',
    'app/views/key_machine_list_item',
    'app/views/rule',
    'app/views/user_menu',
    'text!app/templates/machine.html',
    'cubism',
    'ember'
    ], function($,
                jQueryUI,
                d3,
                BackendsController,
                ConfirmationController,
                NotificationController,
                BackendAddController,
                MachineAddController,
                KeyAddController,
                SelectMachinesController,
                SelectImagesController,
                KeysController,
                RulesController,
                Home,
                Count,
                BackendButton,
                BackendAdd,
                EditBackend,
                MachineListItem,
                ImageListItem,
                MachineAddDialog,
                MachineView,
                MachineListView,
                MachineKeyListItem,
                ConfirmationDialog,
                MachineActionsDialog,
                SingleMachineActionsDialog,
                Shell,
                ImageListView,
                DeleteTagView,
                MachineTagsDialog,
                MachineMonitoringDialog,
                KeyListItemView,
                KeyListView,
                KeyView,
                KeyAddDialog,
                KeyAssociateDialog,
                KeyPrivDialog,
                KeyMachineListItem,
                RuleView,
                UserMenuView,
                machine_html,
                cubism
                ) {

    function initialize() {
        //$(window).load(function(){
        //    warn('preloading');
        //    $.preloadCssImages();
        //});
        //function init() {


        $(document).bind("mobileinit", function(){
            $.mobile.ajaxEnabled = false;
            $.mobile.hashListeningEnabled = false;
            $.mobile.linkBindingEnabled = false;
            $('#splash').fadeOut(1000);
            $('body').css('overflow', '');
        });

        Ember.LOG_BINDINGS = false;

        App = Ember.Application.create({
            rootElement: 'body',
            LOG_TRANSITIONS: false,
            LOG_STATE_TRANSITIONS: false,

            ready: function(){
                Em.run.next(function(){
                    var id = false;
                    for(key in Ember.View.views) {
                        if("application" == Ember.View.views[key].renderedName) {
                            id = key;
                        }
                    }
                    if(id){
                        $("#" + id).attr('data-role', 'page');
                        require(['mobile'], function(){console.log('jqm loaded');});
                    }
                });
            }
        });

        App.Router.map(function() {
            this.route('machines');
            this.route('images');
            this.route('machine', {
                path : '/machines/:machine_id'
            });
            this.route('keys');
            this.route('key', {
                path : '/keys/:key_id'
            });
        });

        // TODO: why the shortcut names? they don't make sense
        App.MacView = MachineView;
        App.MachineListView = MachineListView
        App.UserMenuView = UserMenuView;
        App.KeyListView = KeyListView;
        App.KeyListItemView = KeyListItemView;
        App.ImageListView = ImageListView;
        App.KView = KeyView;
        App.AddKeyView = KeyAddDialog;
        App.KeyPrivDialog = KeyPrivDialog;
        App.MachineAddView = MachineAddDialog;
        App.KeyAssociateDialog = KeyAssociateDialog;
        App.MachineKeyListItemView = MachineKeyListItem;

    //        var mobileinit = false;
    //        $(document).bind('pageinit', function() {
    //            if (mobileinit){
    //                return
    //            }
    //
    //            mobileinit = true;
    //            Ember.LOG_BINDINGS = true;
    //
    //            var App = Ember.Application.create({
    //
    //                VERSION: '0.3-ember',
    //                LOG_TRANSITIONS: true,
    //                LOG_STATE_TRANSITIONS: true,
    //                // Sets up mocha to run some integration tests
    //                specsRunner: function( chai ) {
    //                    // Create placeholder for mocha output
    //                    $( document.body ).before( '<div id="mocha"></div>' );
    //
    //                    // Setup mocha and expose chai matchers
    //                    window.expect = chai.expect;
    //                    mocha.setup('bdd');
    //
    //                    // Load testsuite
    //                    require([
    //                        'app/specs/templates/basic_acceptance'
    //                    ], function() {
    //                            mocha.run().globals( [ '$', 'Ember', 'Mist' ] );
    //                        }
    //                    );
    //                },
    //
    //                emailReady: function(){
    //                    if (this.email && this.password){
    //                        $('#auth-ok').button('enable');
    //                    } else {
    //                        try{
    //                            $('#auth-ok').button('disable');
    //                        } catch(e){
    //                            $('#auth-ok').button();
    //                            $('#auth-ok').button('disable');
    //                        }
    //                    }
    //                }.observes('email'),
    //
    //                passReady: function(){
    //                    this.emailReady();
    //                }.observes('password')
    //
    //            });
    //
    //            App.Router = Ember.Router.extend({
    //                location : Ember.Location.create({
    //                implementation : 'none'
    //            })
    //        });
    //
    //        window.Mist = App;
    //
        App.set('backendAddController', BackendAddController.create());
        App.set('backendsController', BackendsController.create());
        App.set('confirmationController', ConfirmationController.create());
        App.set('notificationController', NotificationController.create());
        App.set('machineAddController', MachineAddController.create());
        App.set('selectMachinesController', SelectMachinesController.create());
        App.set('selectImagesController', SelectImagesController.create());
        App.set('keysController', KeysController.create());
        App.set('rulesController', RulesController.create());
        App.set('keyAddController', KeyAddController.create());

        App.set('authenticated', URL_PREFIX == '' ? true : false);
        App.set('email', '');
        App.set('password', '');
    //
    //
    //                    setTimeout(function(){
    //                        $.mobile.changePage('#home', { transition: 'fade' });
    //                        Mist.emailReady();
    //                        if (EMAIL != '') {
    //                            Mist.set('authenticated', true);
    //                        }
    //                    }, 2000);
    //
    //
    //
    //            $(document).on( 'pagebeforeshow', '#machines', function() {
    //                $('#machines-list').listview('refresh');
    //            });
    //
    //            $(document).on( 'popupbeforeposition', '#dialog-power', function() {
    //                $("#dialog-power a").button();
    //            });
    //
    //            $(document).on( 'popupbeforeposition', '#dialog-single-power', function() {
    //                $("#dialog-single-power a").button();
    //            });
    //
    //            $(document).on( 'popupbeforeposition', '#monitoring-dialog', function() {
    //                $("#single-machine").trigger('pagecreate');
    //            });
    //
    //            $(document).on( 'pagebeforeshow', '#images', function() {
    //                $("#images-list").listview('refresh');
    //            });
    //
    //            $(document).on( 'pagebeforeshow', '#single-machine', function() {
    //                Mist.set('graphPolling', true);
    //            });
    //
    //            $(document).on( 'pageshow', '#single-machine', function() {
    //                $(".monitoring-button").button();
    //            });
    //
    //            $(document).on( 'pagebeforehide', '#single-machine', function() {
    //                Mist.set('graphPolling', false);
    //                Mist.set('machine', null);
    //            });
    //
    //            // Console toggle behavior
    //            $(document).ready(function() {
    //                $('#shell-return').on('click', '.command', function() {
    //                    var out = $(this).next('.output');
    //                    if (out.is(':visible')) {
    //                        out.slideUp(300);
    //                        $(this).parent().addClass('contracted').removeClass('expanded');
    //                    } else {
    //                        out.slideDown(200);
    //                        $(this).parent().removeClass('contracted').addClass('expanded');
    //                    }
    //                });
    //            });
    //
    //            function showRuleSlider(){
    //                    $(this).parent().children('.ui-slider').fadeIn(100);
    //                    return false;
    //            }
    //            function hideRuleSlider(){
    //                    $('.ui-slider').fadeOut(100);
    //            }
    //
    //            // monitoring rule slider toggle
    //            $(document).on('mouseover', 'input.rule-value', showRuleSlider);
    //            $(document).on('click', 'input.rule-value', showRuleSlider);
    //
    //            $(document).on('mouseleave', '.rule-box', hideRuleSlider);
    //            $(document).on('tap', '#single-machine', hideRuleSlider);
    //
        App.Select = Ember.Select.extend({
            attributeBindings: [
                'name',
                'data-theme',
                'data-icon',
                'data-native-menu',
                'disabled'
            ],
        });

        App.TextField = Ember.TextField.extend({
            attributeBindings: [
                'name',
                'data-theme'
            ]
        });

        App.ShellTextField = Ember.TextField.extend({
            attributeBindings: [
                'name',
                'data-theme',
                'autocapitalize'
            ],

                    insertNewline: function() {
                        this._parentView.submit();
                    }
                });

                App.Checkbox = Ember.Checkbox.extend({
                    attributeBindings: [
                        'name',
                        'id',
                        'data-inline'
                    ],
                });
    //            Ember.TextArea.reopen({
    //                attributeBindings: ["name", "placeholder", "id"]
    //              });
    //
        App.HomeView = Home;
        App.CountView = Count;
        App.BackendButtonView = BackendButton;
        App.BackendAddView = BackendAdd;
        App.EditBackendView = EditBackend;
        App.MachineListItemView = MachineListItem;
        App.ImageListItemView = ImageListItem;
        App.ConfirmationDialog = ConfirmationDialog;

        App.DeleteTagView = DeleteTagView;
        App.RuleView = RuleView;
        App.KeyMachineListItemView = KeyMachineListItem;
        App.MachineTagsDialog = MachineTagsDialog;
        App.ShellDialog = Shell;
        App.PowerDialog = SingleMachineActionsDialog;
        App.MachineActionsDialog = MachineActionsDialog;
        App.MachineMonitoringDialog = MachineMonitoringDialog;
    //
    //            var homeView = Home.create();
    //            homeView.append();
    //
    //            var machineView = MachineView.create();
    //            machineView.append();
    /////*
    ////            var confirmationDialog = ConfirmationDialog.create();
    ////            confirmationDialog.append();
    ////
    ////            var dialog = SingleMachineActionsDialog.create();
    ////            dialog.appendTo("#single-machine");
    ////            var shellDialog = Shell.create();
    ////            shellDialog.appendTo("#single-machine");
    ////            var machineTagsDialog = MachineTagsDialog.create();
    ////            machineTagsDialog.appendTo("#single-machine");
    ////*/
        App.MachineListView = MachineListView;
    //            machineListView.append();
    //
    //            var addDialog = MachineAddDialog.create();
    //            addDialog.append();
    //
    ////            /*
    ////            shellDialog = Shell.create();
    ////            shellDialog.appendTo("#machines");
    ////            var machineActionsDialog = MachineActionsDialog.create();
    ////            machineActionsDialog.appendTo("#machines");
    ////            */
    ////
    //            var imageListView = ImageListView.create();
    //            imageListView.append();
    /////*
    ////            var machineMonitoringDialog = MachineMonitoringDialog.create();
    ////            machineMonitoringDialog.appendTo("#single-machine");
    ////
    ////            $(document).on( 'pagebeforeshow', '#dialog-add', function(){
    ////                $('#dialog-add').trigger('create');
    ////            });
    ////*/
    //            var keyListView = KeyListView.create();
    //            keyListView.append();
    //
    //            var keyView = KeyView.create();
    //            keyView.append();
    /////*
    ////            var keyPrivDialog = KeyPrivDialog.create();
    ////            keyPrivDialog.append();
    ////
    ////            var keyAddDialog = KeyAddDialog.create();
    ////            keyAddDialog.appendTo("#keys");
    ////
    ////            var keyAssociateDialog = KeyAssociateDialog.create();
    ////            keyAssociateDialog.append();
    ////*/

        window.Mist = App;
        return App
    }

    var allImgs = [],
        imgUrls = [],
        thisSheetRules;

    function parseCSS(sheets, urls) {
        var w3cImport = false,
            imported = [],
            importedSrc = [],
            baseURL;
        var sheetIndex = sheets.length;
        while(sheetIndex--){//loop through each stylesheet

            var cssPile = '';//create large string of all css rules in sheet

            if(urls && urls[sheetIndex]){
                baseURL = urls[sheetIndex];
            } else {
                var csshref = (sheets[sheetIndex].href) ? sheets[sheetIndex].href : 'window.location.href';
                var baseURLarr = csshref.split('/');//split href at / to make array
                baseURLarr.pop();//remove file path from baseURL array
                baseURL = baseURLarr.join('/');//create base url for the images in this sheet (css file's dir)
                if (baseURL) {
                    baseURL += '/'; //tack on a / if needed
                }
            }
            if(sheets[sheetIndex].cssRules || sheets[sheetIndex].rules){
                thisSheetRules = (sheets[sheetIndex].cssRules) ? //->>> http://www.quirksmode.org/dom/w3c_css.html
                    sheets[sheetIndex].cssRules : //w3
                    sheets[sheetIndex].rules; //ie
                var ruleIndex = thisSheetRules.length;
                while(ruleIndex--){
                    if(thisSheetRules[ruleIndex].style && thisSheetRules[ruleIndex].style.cssText){
                        var text = thisSheetRules[ruleIndex].style.cssText;
                        if(text.toLowerCase().indexOf('url') != -1){ // only add rules to the string if you can assume, to find an image, speed improvement
                            cssPile += text; // thisSheetRules[ruleIndex].style.cssText instead of thisSheetRules[ruleIndex].cssText is a huge speed improvement
                        }
                    } else if(thisSheetRules[ruleIndex].styleSheet) {
                        imported.push(thisSheetRules[ruleIndex].styleSheet);
                        w3cImport = true;
                    }

                }
            }
            //parse cssPile for image urls
            var tmpImage = cssPile.match(/[^\("]+\.(gif|jpg|jpeg|png)/g);//reg ex to get a string of between a "(" and a ".filename" / '"' for opera-bugfix
            if(tmpImage){
                var i = tmpImage.length;
                while(i--){ // handle baseUrl here for multiple stylesheets in different folders bug
                    var imgSrc = (tmpImage[i].charAt(0) == '/' || tmpImage[i].match('://')) ? // protocol-bug fixed
                        tmpImage[i] :
                        baseURL + tmpImage[i];

                    if(jQuery.inArray(imgSrc, imgUrls) == -1){
                        imgUrls.push(imgSrc);
                    }
                }
            }

            if(!w3cImport && sheets[sheetIndex].imports && sheets[sheetIndex].imports.length) {
                for(var iImport = 0, importLen = sheets[sheetIndex].imports.length; iImport < importLen; iImport++){
                    var iHref = sheets[sheetIndex].imports[iImport].href;
                    iHref = iHref.split('/');
                    iHref.pop();
                    iHref = iHref.join('/');
                    if (iHref) {
                        iHref += '/'; //tack on a / if needed
                    }
                    var iSrc = (iHref.charAt(0) == '/' || iHref.match('://')) ? // protocol-bug fixed
                        iHref :
                        baseURL + iHref;

                    importedSrc.push(iSrc);
                    imported.push(sheets[sheetIndex].imports[iImport]);
                }


            }
        }//loop
        if(imported.length){
            parseCSS(imported, importedSrc);
            return false;
        }
    }

    function preloadImages(callback) {
        var imgs = [];
        parseCSS(document.styleSheets);
        var img;
        var remaining = imgUrls.length;
        for (var i = 0; i < imgUrls.length; i++) {
            img = new Image();
            img.onload = function() {
                --remaining;
                if (remaining <= 0) {
                    callback();
                }
            };
            img.src = imgUrls[i];
            imgs.push(img);
        }
    }

    preloadImages(initialize);
});

//LOGLEVEL comes from home python view and home.pt
function log() {
    try {
        if (LOGLEVEL > 3) {
            return console.log.apply(console, arguments);
        }
    } catch(err) {console.log(err);}
}

function info() {
    try {
        if (LOGLEVEL > 2) {
            return console.info.apply(console, arguments);
        }
    } catch(err) {console.log(err);}
}

function warn() {
    try {
        if (LOGLEVEL > 1) {
            return console.warn.apply(console, arguments);
        }
    } catch(err) {console.log(err);}
}

function error() {
    try {
        if (LOGLEVEL > 0) {
            return console.error.apply(console, arguments);
        }
    } catch(err) {console.log(err);}
}

var collectd_install_target = false, collectd_uninstall_target = false, collectd_lastlog="";

function appendShell(data){
    var line = data.trim();

    if (data.length){
        warn(Date() + ': ' + data);
    }

    if (collectd_install_target) {
        if (line != '<br/>') {
            collectd_lastlog = line;
        }
        // TODO: display collectd install output
    } else if (collectd_uninstall_target){
        if (line != '<br/>') {
            collectd_lastlog = line;
        }
        // TODO: display collectd uninstall output
    } else {
        var target_page = $($.mobile.activePage);
        var output = target_page.find('.shell-return .output').first();
        if (data.length) {
            output.append(data);
            output.scrollTop(10000);
        } else {
            that.set('pendingShell', false);
            target_page.find('.shell-return .pending').removeClass('pending');
        }
    }
}

function completeShell(ret){
    $('iframe').remove();
    // TODO disabling this for now, spinners won't work, globals are not there
    //Mist.machine.set('pendingShell', false);
    $('.shell-return .pending').removeClass('pending');
    $('a.shell-send').removeClass('ui-disabled');
    if (collectd_install_target) {
        if (collectd_lastlog.search('root') == -1){
            // TODO: display instruction for manual installation
            // alert('collectd install failed');
        }
        collectd_install_target.set('hasMonitoring', true);
        collectd_install_target.set('pendingMonitoring', false);
        $('.pending-monitoring h1').text('Enabling monitoring');
        collectd_install_target = false;
    } else if (collectd_uninstall_target) {
        collectd_uninstall_target.set('hasMonitoring', false);
        collectd_uninstall_target.set('pendingMonitoring', false);
        $('.pending-monitoring h1').text('Enabling monitoring');
        collectd_uninstall_target = false;
    }
    $('body').append('<iframe id="hidden-shell-iframe"></iframe');
}
