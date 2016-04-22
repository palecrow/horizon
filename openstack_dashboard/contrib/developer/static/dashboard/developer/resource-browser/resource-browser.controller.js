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

(function() {
  'use strict';

  angular
    .module('horizon.dashboard.developer.resource-browser')
    .controller('horizon.dashboard.developer.resource-browser.ResourceBrowserController', ResourceBrowserController);

  ResourceBrowserController.$inject = [
    '$location',
    '$scope',
    'horizon.framework.conf.resource-type-registry.service',
  ];

  /**
   * @ngdoc controller
   * @name horizon.dashboard.developer.resource-browser:ResourceBrowserController
   * @description
   * This controller allows the launching of any actions registered for resource types
   */
  function ResourceBrowserController($location, $scope, registryService) {
    var ctrl = this;
    ctrl.testMode = true;
    ctrl.resourceTypes = registryService.getAllResourceTypes();
    ctrl.toggleTestMode = toggleTestMode;
    ctrl.onActionSelected = onActionSelected;
    ctrl.onSelectItems = onSelectItems;
    ctrl.resourceId = undefined;
    ctrl.hasTableUrl = hasTableUrl;
    ctrl.getTableUrl = getTableUrl;
    ctrl.getSlug = getSlug;

    function hasTableUrl(type) {
      return getSlug(type);
    }

    function getSlug(type) {
      return registryService.getSlug(type);
    }
    
    function getTableUrl(type, typeData) {
      var url = 'developer/resource_browser/';
      var slug = getSlug(type);
      if ( slug ) {
        url = url + registryService.getSlug(type);
      }
      return url;
    }

    function toggleTestMode() {
      ctrl.testMode = !ctrl.testMode;
    }

    function onActionSelected(resourceType, action) {
      // First, attempt to load the requested resource. Assume the user
      // typed in an ID object that is compatible with the load function.
      resourceType.load(ctrl.resourceId).then(checkAllowed, loadFailed);

      function checkAllowed(resource) {
        // TODO Now that we have a resource, check if the action is allowed

        // Since we have an object, use the registered id generator to get
        // the correct data needed by the perform function.
        var id = resourceType.getId(resource);

        // Finally, perform the given action
        if (action.service.initScope) {
          action.service.initScope($scope.$new());
        }

        // Workaround the fact that images don't current accept IDs
        var actionResult = action.service.perform(resource);
      }

      function loadFailed(reason) {
        window.alert(gettext("resource load failed" + ":" + reason));
      }
    }

    function onSelectItems(resourceType) {
      var url = getTableUrl(resourceType.type);
      $location.path(url);
    }
  }

})();
