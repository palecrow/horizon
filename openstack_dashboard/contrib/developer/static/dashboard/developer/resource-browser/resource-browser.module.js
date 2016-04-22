/*
 * (c) Copyright 2015 Hewlett Packard Enterprise Development Company LP
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {
  'use strict';

  /**
   * @ngdoc module
   * @ngname horizon.dashboard.developer.resource-browser
   * @description
   * Dashboard module for the resource-browser panel.
   */
  angular
      .module('horizon.dashboard.developer.resource-browser', [], config);

  config.$inject = ['$provide', '$windowProvider', '$routeProvider'];

  function config($provide, $windowProvider, $routeProvider) {
    $routeProvider
        .when('/developer/resource_browser', {
          templateUrl: $windowProvider.$get().STATIC_URL +
          'dashboard/developer/resource-browser/resources.html'
        })
        .when('/developer/resource_browser/:slug', {
        templateUrl: $windowProvider.$get().STATIC_URL +
        'framework/widgets/table/generic-table.html'
      });
  }

})();