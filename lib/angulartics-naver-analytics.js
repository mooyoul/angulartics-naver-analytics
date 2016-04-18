(function(window, angular, undefined) {'use strict';

    /**
     * @ngdoc overview
     * @name angulartics.naver.analytics
     * Enables analytics support for Naver Analytics (http://analytics.naver.com)
     */
    angular.module('angulartics.naver.analytics', ['angulartics'])
        .config(['$analyticsProvider', function ($analyticsProvider) {
            // Naver Analytics (WCS) doesn't support Buffered Invocation.
            // So, we wait for script until loaded using `angulartics.waitForVendorApi`.
            angulartics.waitForVendorApi('wcs', 1000, function(wcs) {

                // Naver Analytics (WCS) dosen't provide setting user information into analytics session.
                // So, we doesn't need to set default settings.
                $analyticsProvider.registerPageTrack(function (path) {
                    var origin = location.protocol + '//' + location.host;
                    wcs.setHref(origin + path);
                    window._nasa ?
                        wcs.pageview(_nasa) : wcs.pageview();
                    wcs.setRefererHref(origin + path);
                });

                $analyticsProvider.registerEventTrack(function (action, properties) {
                    if (!properties) {
                        properties = {};
                    }

                    wcs.event(action, properties.value);
                });
            });
        }]);
})(window, window.angular);