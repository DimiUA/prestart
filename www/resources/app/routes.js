routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html',
        name: 'home',
         
    },
    {
        path: '/panel-left/',
        panel: {
            componentUrl: './resources/pages/panel-left.html?v=1.3',
        },
        name: 'panel-left'
    },
    {
        path: '/login-screen/',        
        name: 'login-screen',
        loginScreen:{
            componentUrl: './resources/pages/login-screen.html',
        }
    },
    {
        path: '/questions/',
        componentUrl: './resources/pages/questions.html',
        name: 'questions',
         
    },
    {
        path: '/trips/',
        componentUrl: './resources/pages/trips.html',
        name: 'trips',
         
    },
    {
        path: '/trip-info/:raiting/:name/',
        componentUrl: './resources/pages/trip-info.html',
        name: 'trip-info',
         
    },
    {
        path: '/fault-history/',
        componentUrl: './resources/pages/fault-history.html',
        name: 'fault-history',
         
    },
    {
        path: '/fault-details/',
        componentUrl: './resources/pages/fault-details.html',
        name: 'fault-details',
         
    },    
    {
        path: '/user-settings/',
        componentUrl: './resources/pages/user-settings.html',
        name: 'user-settings',
         
    },
   
  
 
  
      // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './resources/pages/404.html',
    },
];
