(function()
{

    var homeBuilderApp = angular.module('homeBuilderApp');

    homeBuilderApp.filter('unsafe', function($sce) {
        return function(val) {
            if(val) val = val.replace( /\r/m, '').replace( /\n/m, '<br>');

            return $sce.trustAsHtml(val);
        };
    });
})();