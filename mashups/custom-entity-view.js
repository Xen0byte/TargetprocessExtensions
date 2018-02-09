tau.mashups
    .addDependency('jQuery')
    .addDependency('tp/general/view')
    .addDependency('tp3/mashups/topmenu')
    .addDependency('tp3/mashups/popup')
    .addMashup(function ($, view, topmenu, popup) {
        view.onRender(function () {
            var entityIdentifier = "div.view-header__icon em.tau-entity-icon.tau-entity-icon-full";
            var menuItem = topmenu.addItem({ title: 'Coming Soon™', icon: 'global-settings' });

            var entityType = $(entityIdentifier).is(":visible") ? document.querySelector(entityIdentifier).textContent : "NONE";

            menuItem.addItem('Customize View').onClick(function () {
                if (entityType === "Bug") {
                    popup = new popup('<div style="position: absolute; height: 150px; width: 100%; top: calc((100% - 150px) / 2);">' +
                        '<h1 align="center"><span style="color: #00A591;">Coming Soon™</span></h1>' +
                        '</div>');
                    popup.show();
                }
                else {
                    popup = new popup('<div style="position: absolute; height: 150px; width: 100%; top: calc((100% - 150px) / 2);">' +
                        '<h1 align="center" style="color: #E94B3C;">This entity is currently not supported.</h1>' +
                        '<h1 align="center" style="color: #E94B3C;">The currently supported entities are: <span style="color: #00A591;">Bugs</span></h1>' +
                        '</div>');
                    popup.show();
                }
            });
        });
    });

// Dependencies Explained Here: https://dev.targetprocess.com/v1.0/docs/dependencies

/*
TODOs:
1. Fix - Menu displays on boards after navigating away from an entity view.
2. Fix - Unable to re-open the popup. if !exists then create else show
*/