"use strict";

window.addEventListener("load", () => {
    const seiteTauschen = (id, titel) => {
        document.querySelectorAll("div").forEach(mainElement => {
            mainElement.classList.add("versteckt");
        });

        const element = document.querySelector(`#${id}`);
        if (element) {
            element.classList.remove("versteckt");
        }

        document.title = titel;
    };

    const routes = [
        {
            url: "^/$",
            show: () => seiteTauschen("seite-haupt", "SPA: Hauptseite")
        }, {
            url: "^/seite2/$",
            show: () => seiteTauschen("seite-2", "SPA: Seite 2")
        }, {
            url: "^/seite3/$",
            show: () => seiteTauschen("seite-3", "SPA: Seite 3")
        }, {
            url: ".*",
            show: () => seiteTauschen("seite-nicht-gefunden", "SPA: Seite nicht gefunden")
        }
    ];

    const router = new Router(routes);
    router.start();
});
