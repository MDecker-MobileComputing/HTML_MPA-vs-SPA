"use strict";

/*
 * Source of this page
 * https://github.com/DennisSchulmeister/dhbwka-wwi-webprog-quellcodes/blob/5accf90fb94319568a85d764fe94327a4bec599c/3%20JavaScript/Aufgaben/SPA-Router/Aufgabe/router.js
 * Shortlink: https://bit.ly/simple-spa-router
 * Comments were translated from German to English using AI.
 * The original comments can be found in the source code above.
 */

/**
 * This class implements a so-called single-page router. It monitors the
 * currently active URL (which can change whenever a link is clicked or
 * window.location.href is set in JavaScript) and ensures that the content
 * corresponding to that URL is displayed.
 *
 * When instantiated, the class must be given a list of routes. Each route
 * contains a regular expression for matching the URL and a function for
 * displaying the corresponding content.
 */
class Router {

    /**
     * Constructor. The "routes" parameter must contain a list of the app's
     * URL routes in the following format:
     *
     *      [
     *          {
     *              url: "^/$"              // Regular expression for the URL
     *              show: matches => {...}  // Function to display the content
     *          }, {
     *              url: "^/Details/(.*)$"  // Regular expression for the URL
     *              show: matches => {...}  // Function to display the content
     *          },
     *          ...
     *      ]
     *
     * @param {List} routes List of pages available in the app
     */
    constructor( routes ) {

        this._routes = routes;
        this._started = false;

        window.addEventListener( "hashchange", ( ) => this._handleRouting( ) );
    }


    /**
     * Start routing and immediately activate the initial route.
     */
    start( ) {

        this._started = true;
        this._handleRouting( );
    }


    /**
     * Stop routing so the router no longer responds when a link is clicked
     * or the page URL changes in any other way.
     */
    stop( ) {

        this._started = false;
    }


    /**
     * This method evaluates the current URL and displays the corresponding
     * content. For simplicity, it uses a so-called hash URL, where the page
     * to be displayed must follow a # character. For example:
     *
     *   http://localhost:8080/index.html#/Detail/1234
     *
     * Here, "/Detail/1234" is the part of the URL that identifies the page to
     * display. The advantage of this technique is that a link with such a URL
     * does not load a new page from the server as long as the part of the URL
     * before the # character remains unchanged. Instead, a "hashchange" event
     * is fired, which the router can respond to.
     *
     * The History API and the "popstate" event can be used to build a more
     * sophisticated single-page router that can work without the # character
     * in the URL. However, this requires more code and special server
     * configuration to work reliably. The router can only run after the page
     * has loaded, so opening a so-called "deep link" directly—one that does not
     * point to the application's home page—may result in a "404 Not Found"
     * error. In that case, the server must be configured to return the home
     * page even when it was not requested directly. We avoid that extra
     * complexity here. :-)
     */
    _handleRouting( ) {

        let url = location.hash.slice( 1 );

        if ( url.length === 0 ) {

            url = "/";
        }

        let matches = null;
        let route = this._routes.find( p => matches = url.match( p.url ) );

        if ( !route ) {

            console.error( `No route found for URL ${url}!` );
            return;
        }

        route.show( matches );
    }

}
