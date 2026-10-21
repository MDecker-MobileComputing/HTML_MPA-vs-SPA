"use strict";


window.addEventListener( "load", ( ) => {

    const switchPage = ( id, titel ) => {

        document.querySelectorAll( "div" ).forEach( mainElement => {

            mainElement.classList.add( "hidden" );
        });

        const element = document.querySelector( `#${id}` );
        if ( element ) {

            element.classList.remove( "hidden" );
        }

        document.title = titel;
    };

    const routes = [
        {
            url: "^/$",
            show: ( ) => switchPage( "page-main", "SPA: Main Page" )
        }, {
            url: "^/page2/$",
            show: ( ) => switchPage( "page-2", "SPA: Page 2" )
        }, {
            url: "^/page3/$",
            show: ( ) => switchPage( "page-3", "SPA: Page 3" )
        }, {
            url: ".*",
            show: ( ) => switchPage( "page-not-found", "SPA: Page not found" )
        }
    ];

    const router = new Router( routes );
    router.start( );
});
