tau.mashups
    .addDependency('jQuery')
    .addDependency('tp/general/view')
    .addMashup(function ($, view) {
        view.onRender(function ($pageElement) {
            var entityType = document.querySelector("div.view-header__icon em.tau-entity-icon.tau-entity-icon-full").textContent;
            console.log("[DEBUG] Entiy Type: " + entityType);

            if (entityType === "Bug") {
                var newTab = '<li class="i-role-tabheader tab-item i-taus" data-label="config" taustype="view-entity" tauspref="tab" style="visibility: visible;"><div class="tau-container"><div class="ui-label-container"><span class="ui-label" data-title="Config">Config</span></div></div></li>';

                var $insertAfterTab = $pageElement.find("li div div span[data-title='History']");
                var $insertAfterTabContainer = $insertAfterTab.closest(".i-role-tabheader.tab-item.i-taus");
                console.log("[DEBUG] $insertAfterTab: " + $insertAfterTab + " | $insertAfterTabContainer: " + $insertAfterTabContainer);

                if ($insertAfterTabContainer.length) {
                    $insertAfterTabContainer.after(newTab);
                }
            }
        });
    });

// Dependencies Explained Here: https://dev.targetprocess.com/v1.0/docs/dependencies