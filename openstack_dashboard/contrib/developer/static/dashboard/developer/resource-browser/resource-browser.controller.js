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
    ctrl.onActionSelected = onActionSelected;
    ctrl.resourceId = undefined;

    ctrl.fullySupported = fullySupported;

    ctrl.supportsGenericTableView = supportsGenericTableView;
    ctrl.getName = getName;
    ctrl.getSlug = getSlug;
    ctrl.hasListFunction = hasListFunction;
    ctrl.hasProperties = hasProperties;
    ctrl.hasTableColumns = hasTableColumns;
    ctrl.hasDrawerView = hasDrawerView;
    ctrl.getTableUrl = getTableUrl;
    ctrl.getTableColumnsLabel = getTableColumnsLabel;
    ctrl.getPropertiesLabel = getPropertiesLabel;

    ctrl.supportsGenericDetailsView = supportsGenericDetailsView;
    ctrl.hasLoadFunction = hasLoadFunction;
    ctrl.hasDetailView = hasDetailView;
    ctrl.getDetailsViewsLabel = getDetailsViewsLabel;

    ctrl.hasGlobalActions = hasGlobalActions;

    ctrl.hasItemActions = hasItemActions;

    function fullySupported(typeData) {
      return (supportsGenericDetailsView(typeData) &&
          supportsGenericTableView(typeData) &&
          hasDrawerView(typeData) &&
          hasGlobalActions(typeData) &&
          hasItemActions(typeData));
    }

    function getName(typeData) {
      return typeData.getName();
    }
    
    function getSlug(type) {
      return registryService.getSlug(type);
    }
    
    function supportsGenericTableView(typeData) {
      return (getSlug(typeData.type) &&
        getName(typeData) &&
        hasListFunction(typeData) &&
        hasProperties(typeData) &&
        hasTableColumns(typeData) &&
        hasDrawerView(typeData));
    }

    function hasListFunction(typeData) {
      return typeData.listFunctionSet;
    }
    
    function hasProperties(typeData) {
      return getProperties(typeData).length > 0;
    }
    
    function hasTableColumns(typeData) {
      return typeData.tableColumns.length > 0;
    }

    function getProperties(typeData) {
      return Object.keys(typeData.getProperties());
    }

    function getPropertiesLabel(typeData) {
      var properties = typeData.getProperties();
      var keys = Object.keys(properties);
      return keys.map(getLabel).join(", ");

      function getLabel(item) {
        return properties[item].label;
      }
    }
    
    function getTableColumnsLabel(typeData) {
      return typeData.tableColumns.map(getColumnId).join(", ");

      function getColumnId(item) {
        return item.id;
      }
    }
    
    function getTableUrl(type, typeData) {
      var url = 'developer/resource_browser/';
      var slug = getSlug(type);
      if ( slug ) {
        url = url + registryService.getSlug(type);
      }
      return url;
    }
    
    function supportsGenericDetailsView(typeData) {
      return (hasDetailView(typeData) &&
        hasLoadFunction(typeData));
    }
    
    function hasDetailView(typeData) {
      return typeData.detailsViews.length > 0 
    }

    function getDetailsViewsLabel(typeData) {
      return typeData.detailsViews.map(getName).join(", ");

      function getName(item) {
        return item.name;
      }
    }

    function hasLoadFunction(typeData) {
      return typeData.loadFunctionSet;
    }
    
    function hasGlobalActions(typeData) {
      return typeData.globalActions.length != 0 
    }
    
    function hasItemActions(typeData) {
      return typeData.itemActions.length != 0;
    }
    
    function hasDrawerView(typeData) {
      return typeData.drawerTemplateUrl;
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
  }

})();
