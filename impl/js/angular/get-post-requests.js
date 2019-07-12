(function()
{
    var homeBuilderApp = angular.module('homeBuilderApp');

    homeBuilderApp.factory('sendPostRequest', ['$http', function($http)
    {
        return function(url, params, callback)
        {
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            $http.post(url, $.param(params), config).success(callback);
        }
    }]);

    homeBuilderApp.factory('sendGetRequest', ['$http', function($http)
    {
        return function(url, params, callback)
        {
            if (params) {
                var sign = url.indexOf('?') == -1 ? '?' : '&';
                url += sign + $.param(params);
            }
            $http.get(url).success(callback);
        }
    }]);
})();