const API_DOMIAN1 = "https://api.m2mglobaltech.com/";
const API_DOMIAN9 = "https://upload.quiktrak.co/";
let API_URL = {};
API_URL.LOGIN = API_DOMIAN1 + 'PreStart/V1/User/Auth';
API_URL.PHOTO_UPLOAD = API_DOMIAN9 + "image/Upload";

Framework7.request.setup({
    timeout: 40*1000
});

const AppEvents = new Framework7.Events();

// Dom7
let $$ = Dom7;


let htmlTemplate = $$('script#loginScreenTemplate').html();
let compiledTemplate = Template7.compile(htmlTemplate);
$$('#app').append(compiledTemplate());

// Framework7 App main instance
window.app  = new Framework7({
    root: '#app', // App root element
    id: 'com.sinopacific.prestart', // App bundle ID
    name: 'PreStart', // App name
    theme: 'auto', // Automatic theme detection
    /*view: {
        pushState: true,
        pushStateRoot: document.location.pathname,
    },*/
    input: {
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
    },

    data: function () {
        let maxPopupWidth = 280;
        if (this.device.desktop) {
            maxPopupWidth = 300;
        }
        return {
            MaxMapPopupWidth: maxPopupWidth,
            logo: 'resources/images/logo.png',
            logoModal: 'resources/images/logo-dark.png',
            PolygonCustomization: {
                color: '#AA5959',
                fillColor: '#FF0000',
                fillOpacity: 0.25,
            },
            PolylineCustomization: {
                mainBg: {
                    //color: '#f44336',
                    color: '#039ac5',
                    weight: 6,
                    opacity: 1,
                },
                main: {
                    //color: '#f96868',
                    color: '#00b9ee',
                    weight: 3,
                    opacity: 1,
                },
                droppedBg: {
                    //color: '#b50000',     //red
                    color: '#b47605',   //orange
                    weight: 6,
                    opacity: 0.7,
                },
                dropped: {
                    //color: '#fc0405',
                    color: '#fd9a08',   //orange
                    weight: 3,
                    opacity: 0.7,
                },
                boundariesBg: {
                    color: '#6199CC',
                    weight: 6,
                    opacity: 0.4,
                },
                boundaries: {
                    color: '#00B1FC',
                    weight: 3,
                    opacity: 0.4,
                },
            },
            AppDetails: {
                name: 'PreStart-app',
                code: 1,
                supportCode: 1,
                appId: '',
                appleId: '1269018607',
                appVersion: '',
                supportPhone: '1300885461',
            },
            UTCOFFSET: moment().utcOffset(),
        };
    },
    on: {
        routerAjaxStart: function () {
            this.progressbar.show();
        },
        routerAjaxComplete: function () {
            this.progressbar.hide();
        },
        init: function () {
            let self = this;

            if(window.hasOwnProperty("cordova")){

                //AppDetails.appId = BuildInfo.packageName;
                /*if (BuildInfo){
                    self.data.AppDetails.appId = BuildInfo.packageName;
                    if (BuildInfo.version){
                        self.data.AppDetails.appVersion = BuildInfo.version;
                    }
                }*/
                //fix app images and text size
                if (window.MobileAccessibility) {
                    window.MobileAccessibility.usePreferredTextZoom(false);
                }
                if (StatusBar) {
                    StatusBar.styleDefault();
                }
                if(window.isTablet){
                    screen.orientation.unlock('any');
                }else{
                    screen.orientation.lock('portrait');
                }

                //configureBackgroundTracking();

                self.methods.handleAndroidBackButton();
                self.methods.handleKeyboard();
                //alert(JSON.stringify(window.device));



            }

            if(localStorage.ACCOUNT && localStorage.PASSWORD) {
                self.methods.login();
            }
            else {
                self.methods.logout();
            }
        }
    },
    // App root methods
    methods: {
        capitalize: function(s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        isJsonString: function(str){
            let ret = false;
            try{ret=JSON.parse(str);}catch(e){return false;}return ret;
        },
        findObjectByKey: function(array, key, value) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        reverseArry: function(arry){
            let newArry = [];
            let i = null;
            for (i = arry.length - 1; i >= 0; i -= 1)
            {
                newArry.push(arry[i]);
            }
            return newArry;
        },
        isObjEmpty: function(obj) {
            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // If it isn't an object at this point
            // it is empty, but it can't be anything *but* empty
            // Is it empty?  Depends on your application.
            if (typeof obj !== "object") return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (let key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        },
        sortArrayByObjProps: function(list, sortBy){
            //sortBy.direction == 1  means asc
            //sortBy.direction == -1 means desc
            if(list && list.length){
                list.sort(function(a,b){
                    let i = 0, result = 0;
                    while(i < sortBy.length && result === 0) {
                        result = sortBy[i].direction*(a[ sortBy[i].prop ].toString().toUpperCase() < b[ sortBy[i].prop ].toString().toUpperCase() ? -1 : (a[ sortBy[i].prop ].toString().toUpperCase() > b[ sortBy[i].prop ].toString().toUpperCase() ? 1 : 0));
                        i++;
                    }
                    return result;
                })
            }
            return list;
        },
        hideKeyboard: function() {
            document.activeElement.blur();
            $$("input").blur();
        },
        guid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        getPlusInfo: function () {
            let self = this;
            let uid = this.methods.guid();
            if (window.device) {
                if (!localStorage.PUSH_MOBILE_TOKEN) {
                    localStorage.PUSH_MOBILE_TOKEN = uid;
                }
                localStorage.PUSH_APP_KEY = BuildInfo.packageName;
                localStorage.PUSH_APPID_ID = BuildInfo.packageName;
                localStorage.DEVICE_TYPE = self.device.ios ? 'iOS' : 'android';
            } else {
                if (!localStorage.PUSH_MOBILE_TOKEN)
                    localStorage.PUSH_MOBILE_TOKEN = uid;
                if (!localStorage.PUSH_APP_KEY)
                    localStorage.PUSH_APP_KEY = uid;
                if (!localStorage.PUSH_DEVICE_TOKEN)
                    localStorage.PUSH_DEVICE_TOKEN = uid;
                //localStorage.PUSH_DEVICE_TOKEN = "75ba1639-92ae-0c4c-d423-4fad1e48a49d"
                localStorage.PUSH_APPID_ID = 'android.app.quiktrak.eu.prestart';
                localStorage.DEVICE_TYPE = self.device.ios ? 'iOS' : 'android';
            }
        },
        getFromStorage: function(name){
            var ret = [];
            var str = '';
            if (name) {
                switch (name){
                    case 'userInfo':
                        str = localStorage.getItem("COM.QUIKTRAK.PRESTART.USERINFO");
                        if(str) {
                            ret = JSON.parse(str);
                        }else {
                            ret = {}
                        }
                        break;

                    case 'assetList':
                        str = localStorage.getItem("COM.QUIKTRAK.PRESTART.ASSETLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;
                    case 'checkList':
                        str = localStorage.getItem("COM.QUIKTRAK.PRESTART.CHECKLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'additionalFlags':
                        str = localStorage.getItem("COM.QUIKTRAK.PRESTART.ADDIITIONALFLAGS");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
                        }
                        break;

                    default:
                        this.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                this.dialog.alert('Wrong query parameters!');
            }
            return ret;
        },
        setInStorage: function(params){
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    case 'userInfo':
                        localStorage.setItem("COM.QUIKTRAK.PRESTART.USERINFO", JSON.stringify(params.data));
                        break;
                    case 'assetList':
                        localStorage.setItem("COM.QUIKTRAK.PRESTART.ASSETLIST", JSON.stringify(params.data));
                        break;
                    case 'checkList':
                        localStorage.setItem("COM.QUIKTRAK.PRESTART.CHECKLIST", JSON.stringify(params.data));
                        break;

                    case 'additionalFlags':
                        let flags = this.methods.getFromStorage(params.name);
                        const keys = Object.keys(params.data);
                        for (const key of keys) {
                            flags[key] = params.data[key];
                        }
                        localStorage.setItem("COM.QUIKTRAK.PRESTART.ADDIITIONALFLAGS", JSON.stringify(flags));
                        break;

                    default:
                        this.dialog.alert('There is no function associated with this name - '+params.name);
                }   
            }else{
                this.dialog.alert('Wrong query parameters!');
            }
        },

        logout: function(){
            let self = this;
            console.log('logout');

            let deviceToken = localStorage.PUSH_DEVICE_TOKEN;
            let mobileToken = localStorage.PUSH_MOBILE_TOKEN;
            let additionalFlags = self.methods.getFromStorage('additionalFlags');

            localStorage.clear();

            if (deviceToken) {
                localStorage.PUSH_DEVICE_TOKEN = deviceToken;
            }
            if (mobileToken) {
                localStorage.PUSH_MOBILE_TOKEN = mobileToken;
            }
            if(!self.methods.isObjEmpty(additionalFlags)){
                self.methods.setInStorage({ name: 'additionalFlags', data: additionalFlags });
            }
            //console.log(this.views.get('view-main'))
            self.loginScreen.open('.login-screen');
            //this.views.main.router.navigate('/login-screen/');
        },
        login: function(){
            let self = this;
            /*self.dialog.progress();
            setTimeout(function(){
                self.loginScreen.close();
                self.dialog.close();
                localStorage.ACCOUNT = 'Demo';
                localStorage.PASSWORD = 'Demo';
            }, 1000);*/

            let username = $$("input[name='username']");
            let password = $$("input[name='password']");

            let data = {
                username: username.val() ? username.val() : localStorage.ACCOUNT,
                password: password.val() ? password.val() : localStorage.PASSWORD,

                appKey: localStorage.PUSH_APP_KEY,
                mobileToken: localStorage.PUSH_MOBILE_TOKEN,
                deviceToken: localStorage.PUSH_DEVICE_TOKEN,
                deviceType: localStorage.DEVICE_TYPE,
            };

            self.dialog.progress(LANGUAGE.COM_MSG12,'red');
            self.request.get(API_URL.LOGIN, data, function (result, xhr, status) {
                console.log(result)

                if(!self.methods.isObjEmpty(result) && result.MajorCode === '000') {
                    localStorage.ACCOUNT = data.username.trim().toLowerCase();
                    localStorage.PASSWORD = data.password;

                    self.data.MinorToken = result.Data.MinorToken;
                    self.data.MajorToken = result.Data.MajorToken;
                    self.methods.setInStorage({ name: 'userInfo', data: result.Data.User });
                    self.methods.setInStorage({
                        name: 'assetList',
                        data: self.methods.sortArrayByObjProps(result.Data.Devices, [
                            {
                                prop: 'Name',
                                direction: 1
                            }
                        ])
                    });
                    self.methods.setInStorage({
                        name: 'checkList',
                        data: self.methods.sortArrayByObjProps(result.Data.CheckList, [
                            {
                                prop:'Name',
                                direction: 1
                            }
                        ])
                    });
                    AppEvents.emit('signedIn', result.Data);


                    self.loginScreen.close();
                    self.dialog.close();

                }else{
                    self.utils.nextFrame(()=>{
                        self.dialog.close();
                        self.dialog.alert(LANGUAGE.PROMPT_MSG007);
                        self.loginScreen.open('.login-screen');
                    });
                }

            },
            function (xhr, status) {
                self.dialog.close();
                self.loginScreen.open('.login-screen');
                self.dialog.alert(LANGUAGE.PROMPT_MSG008);

            },
            'json');
        },
        createMap: function(option){
            var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { name: 'osm', attribution: '' });            
            var googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                maxZoom: 22,
                subdomains:['mt0','mt1','mt2','mt3']
            });           
            var googleSatelitte = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });  
             
            var map = L.map(option.target, { zoomControl: false, center: option.latLng, zoom: option.zoom, layers: [googleStreets] }); 
                            
            var layers = {
                "<span class='mapSwitcherWrapper googleSwitcherWrapper'><img class='layer-icon' src='resources/images/googleRoad.png' alt='' /> <p>Map</p></span>": googleStreets,
                "<span class='mapSwitcherWrapper satelliteSwitcherWrapper'><img class='layer-icon' src='resources/images/googleSatellite.png' alt='' />  <p>Satellite</p></span>": googleSatelitte,
                "<span class='mapSwitcherWrapper openstreetSwitcherWrapper'><img class='layer-icon' src='resources/images/openStreet.png' alt='' /> <p>OpenStreet</p></span>": osm,                 
            };           
            
            L.control.layers(layers).addTo(map);  

            return map;
        },
        getStars: function (Raiting){
            var ret = {
                Value: 0,
                Template: '',
                Color: '',
            };

            switch(true) {
                case ( Raiting >= 9 ):
                    ret.Value = 5;
                    ret.Color = 'text-color-green';
                    break;

                case ( Raiting >= 7 ):
                    ret.Value = 4;
                    ret.Color = 'text-color-green';
                    break;

                case ( Raiting >= 5 ):
                    ret.Value = 3;
                    ret.Color = 'text-color-orange';
                    break;

                case ( Raiting >= 3 ):
                    ret.Value = 2;
                    ret.Color = 'text-color-red';
                    break;

                default:
                    ret.Value = 1;
                    ret.Color = 'text-color-red';
            } 
            /*for (var i = ret.Value; i >= 1; i--) {
                ret.Template += '<i class="f7-icons icon-trip-star"></i>';
            }*/
            for (var i = 1; i <= 5; i++) {
                if (i <= ret.Value) {
                    ret.Template += '<i class="f7-icons icon-trip-star ' + ret.Color + '"></i>';
                }else{
                    ret.Template += '<i class="f7-icons icon-trip-star text-color-gray"></i>';
                }
                
            }

            return ret;
        },
        getGaugeRaitingDetails: function(Raiting){
            var ret = {
                Value: 0,
                BorderColor: '#BC2132',
                Raiting: 0,
            };

            ret.Raiting = Raiting;
            ret.Value = Raiting / 10;
            switch(true) {
                case ( Raiting >= 8 ):
                    ret.BorderColor = '#39B54A';
                    break;

                case ( Raiting >= 5 ):
                    ret.BorderColor = '#F7931E';
                    break;
            } 

            return ret;
        },
        getBooleanVal: function(val){
            return  val ? JSON.parse(val.toLowerCase()) : '';
        },
        customDialog: function(params){

            let buttons = !params.buttons ? [{ text: window.LANGUAGE.COM_MSG14 }] : params.buttons;
            let modalTex = '';
            if (params.title) {
                modalTex += '<div class="custom-modal-title text-color-red">'+ params.title +'</div>';
            }
            if (params.text) {
                modalTex += '<div class="custom-modal-text">'+ params.text +'</div>';
            }

            this.dialog.create({
                closeByBackdropClick: !!params.closeByBackdropClick,
                destroyOnClose: true,
                title: '<div class="custom-modal-logo-wrapper"><img class="custom-modal-logo" src="'+ this.data.logoModal +'" alt=""/></div>',
                text: modalTex,
                verticalButtons: buttons.length > 2,
                buttons: buttons
            }).open();
        },


        /*
          This method prevents back button tap to exit from app on android.
          In case there is an opened modal it will close that modal instead.
          In case there is a current view with navigation history, it will go back instead.
          */
        handleAndroidBackButton: function () {
            let f7 = this;
            const $ = f7.$;
            if (f7.device.electron) return;

            document.addEventListener('backbutton', function (e) {
                if ($('.actions-modal.modal-in').length) {
                    f7.actions.close('.actions-modal.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.dialog.modal-in').length) {
                    f7.dialog.close('.dialog.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.sheet-modal.modal-in').length) {
                    f7.sheet.close('.sheet-modal.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.popover.modal-in').length) {
                    f7.popover.close('.popover.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.popup.modal-in').length) {
                    if ($('.popup.modal-in>.view').length) {
                        const currentView = f7.views.get('.popup.modal-in>.view');
                        if (currentView && currentView.router && currentView.router.history.length > 1) {
                            currentView.router.back();
                            e.preventDefault();
                            return false;
                        }
                    }
                    f7.popup.close('.popup.modal-in');
                    e.preventDefault();
                    return false;
                }
                /*if ($('.login-screen.modal-in').length) {
                    f7.loginScreen.close('.login-screen.modal-in');
                    e.preventDefault();
                    return false;
                }*/

                if($('.searchbar-enabled').length){
                    f7.searchbar.disable();
                    e.preventDefault();
                    return false;
                }

                const currentView = f7.views.current;
                if (currentView && currentView.router && currentView.router.history.length > 1) {
                    currentView.router.back();
                    e.preventDefault();
                    return false;
                }

                if ($('.panel.panel-in').length) {
                    f7.panel.close('.panel.panel-in');
                    e.preventDefault();
                    return false;
                }

                if (currentView && currentView.router && currentView.router.url === '/') {
                    f7.dialog.confirm(LANGUAGE.PROMPT_MSG044, function() {
                        if(navigator){
                            navigator.app.exitApp();
                        }
                    });
                    e.preventDefault();
                    return false;
                }
            }, false);
        },
        /*
        This method does the following:
          - provides cross-platform view "shrinking" on keyboard open/close
          - hides keyboard accessory bar for all inputs except where it required
        */
        handleKeyboard: function () {
            let f7 = this;
            if (!window.Keyboard || !window.Keyboard.shrinkView || f7.device.electron) return;
            let $ = f7.$;
            window.Keyboard.shrinkView(false);
            window.Keyboard.disableScrollingInShrinkView(true);
            window.Keyboard.hideFormAccessoryBar(true);
            window.addEventListener('keyboardWillShow', () => {
                f7.input.scrollIntoView(document.activeElement, 0, true, true);
            });
            window.addEventListener('keyboardDidShow', () => {
                f7.input.scrollIntoView(document.activeElement, 0, true, true);
            });
            window.addEventListener('keyboardDidHide', () => {
                if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
                    return;
                }
                window.Keyboard.hideFormAccessoryBar(false);
            });
            window.addEventListener('keyboardHeightWillChange', (event) => {
                let keyboardHeight = event.keyboardHeight;
                if (keyboardHeight > 0) {
                    // Keyboard is going to be opened
                    document.body.style.height = `calc(100% - ${keyboardHeight}px)`;
                    $('html').addClass('device-with-keyboard');
                } else {
                    // Keyboard is going to be closed
                    document.body.style.height = '';
                    $('html').removeClass('device-with-keyboard');
                }

            });
            $(document).on('touchstart', 'input, textarea, select', function (e) {
                let nodeName = e.target.nodeName.toLowerCase();
                let type = e.target.type;
                let showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
                if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
                    window.Keyboard.hideFormAccessoryBar(false);
                } else {
                    window.Keyboard.hideFormAccessoryBar(true);
                }
            }, true);
        },
    },

    // App routes
    routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
    //url: app.view.pushStateRoot ? app.view.pushStateRoot : '/',
    url: '/',

    on: {
        init: function(){
            //console.log('inited')
        }

    }
});

$$('body').on('submit', '.login-form', function (e) {    
    e.preventDefault();     
    //preLogin(); 
    app.methods.login();
    return false;
});
$$('body').on('click', '.password-toggle', function(){
    let password = $$(this).siblings("input");
    if(password.prop("type") === "text"){
        password.prop("type", "password");
    }else{
        password.prop("type", "text");
    }
    $$(this).toggleClass('text-color-gray');
});

/*$(function(){
    if (localStorage.ACCOUNT) {
        app.methods.login();
    }else{
        app.methods.logout();
    }
});
*/


document.addEventListener("deviceready", onDeviceReady, false ); 

function onDeviceReady(){ 
    //AppDetails.appId = BuildInfo.packageName;

    //fix app images and text size
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);    
    }
    if (StatusBar) {
        StatusBar.styleDefault();
    } 
    
    configureBackgroundTracking();

    document.addEventListener("backbutton", backFix, false); 
    //alert(JSON.stringify(window.device));
}


function backFix(event){     
    if (app.views.main.router.currentRoute.url == "/" ){ 
        app.dialog.confirm(LANGUAGE.PROMPT_MSG006, function () {        
            navigator.app.exitApp();
        });
    }else{
        mainView.router.back();
    } 
}

function configureBackgroundTracking(){
    BackgroundGeolocation.configure({
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        debug: false,
        stopOnTerminate: false,
        startOnBoot: true,
        notificationsEnabled: true,
        startForeground: true,
        interval: 10000,
        fastestInterval: 5000,
        activitiesInterval: 10000,
        url: 'http://sinopacificukraine.com/test/prestart/locations.php',
        httpHeaders: {
            'X-FOO': 'bar'
        },
        // customize post properties
        /*postTemplate: {
          lat: '@latitude',
          lon: '@longitude',
          foo: 'bar' 
        }*/
        postTemplate: null,
    });

    

    BackgroundGeolocation.on('error', function(error) {
        console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
        alert('[ERROR] BackgroundGeolocation error:', error.code, error.message);
    });
}