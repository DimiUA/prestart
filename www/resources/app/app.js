var API_URL = {};
API_URL.LOGIN = '';

// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
    root: '#app', // App root element
    id: 'com.sinopacific.prestart', // App bundle ID
    name: 'PreStart', // App name
    theme: 'auto', // Automatic theme detection
    /*view: {
        pushState: true,
        pushStateRoot: document.location.pathname,
    },*/
    // App root data
    preroute: function (view, options) {
        console.log('preroute');
    },
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    on: {
        routerAjaxStart: function () {          
            app.progressbar.show();
        },
        routerAjaxComplete: function () {           
            app.progressbar.hide();
        },
        
    },
    // App root methods
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
        getFromStorage: function(name){
            var ret = [];
            var str = '';
            if (name) {
                switch (name){
                    /*case 'hotels':
                        str = localStorage.getItem("COM.UBS.HS.HOTELS");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;*/                

                    default:
                        app.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                app.dialog.alert('Wrong query parameters!');
            }
            return ret;
        },
        setInStorage: function(params){
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    /*case 'hotels':
                            localStorage.setItem("COM.UBS.HS.HOTELS", JSON.stringify(params.data));
                        break;*/

                    default:
                        app.dialog.alert('There is no function associated with this name - '+params.name);
                }   
            }else{
                app.dialog.alert('Wrong query parameters!');
            }
        },

        logout: function(){
            console.log('logout');
            localStorage.ACCOUNT = '';
            mainView.router.navigate('/login-screen/');
        },
        login: function(){

            app.dialog.progress();
            setTimeout(function(){
                app.loginScreen.close();
                app.dialog.close();
                localStorage.ACCOUNT = 'Demo';
            }, 1000);
                    /*app.dialog.progress();
                    app.request.get(API_URL.LOGIN, {}, function (data, xhr, status) { 
                                             

                        app.dialog.close();
                    },
                    function (xhr, status) {            
                        app.dialog.close();
                        //app.dialog.alert('Error occurred during get categories request!');
                        app.dialog.alert('Error occured');             
                    },
                    'json');   */
        },
        createMap: function(option){
            var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { name: 'osm', attribution: '' });            
            var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                maxZoom: 22,
                subdomains:['mt0','mt1','mt2','mt3']
            });           
            var googleSatelitte = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
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
    },

    // App routes
    routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
    //url: app.view.pushStateRoot ? app.view.pushStateRoot : '/',
    url: '/',

    on: {
        
    }
});

$$('body').on('submit', '.login-form', function (e) {    
    e.preventDefault();     
    //preLogin(); 
    app.methods.login();
    return false;
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

    BackgroundGeolocation.checkStatus(function(status) {
        console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
        console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
        console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
     
        // you don't need to check status before start (this is just the example)
        if (!status.isRunning) {
            BackgroundGeolocation.start(); //triggers start on start event
        }
    });

    BackgroundGeolocation.on('error', function(error) {
        console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
    });
}