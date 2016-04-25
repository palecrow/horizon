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
    .controller('horizon.dashboard.developer.resource-browser.ResourceBrowserItemController', ResourceBrowserItemController);

  ResourceBrowserItemController.$inject = [
    '$location',
    '$scope',
    'horizon.framework.conf.resource-type-registry.service',
  ];

  /**
   * @ngdoc controller
   * @name horizon.dashboard.developer.resource-browser:ResourceBrowserItemController
   * @description
   * This controller allows the launching of any actions registered for resource types
   */
  function ResourceBrowserItemController($location, $scope, registryService) {

    /**
     * Directive data (Private)
     */
    var ctrl = this;
    var typeData = ctrl.registryResourceType;
    var type = typeData.type;

    /**
     * View-specific model (Public)
     */
    ctrl.collapsed = true;
    ctrl.resourceId = undefined;
    ctrl.fullySupported = fullySupported();
    ctrl.typeLabel = type;
    ctrl.nameLabel = typeData.getName();
    ctrl.allNameLabels = [typeData.getName(1), typeData.getName(2)];
    ctrl.supportsGenericTableView = supportsGenericTableView();
    ctrl.typeName = getName();
    ctrl.slug = getSlug();
    ctrl.hasListFunction = hasListFunction();
    ctrl.listFunctionNameLabel = listFunctionNameLabel();
    ctrl.hasProperties = hasProperties();
    ctrl.hasTableColumns = hasTableColumns();
    ctrl.hasDrawerView = hasDrawerView();
    ctrl.drawerTemplateUrl = typeData.drawerTemplateUrl;
    ctrl.tableUrl = getTableUrl();
    ctrl.tableColumnLabels = getTableColumnLabels();
    ctrl.propertyLabels = getProperties();
    ctrl.supportsGenericDetailsView = supportsGenericDetailsView();
    ctrl.hasLoadFunction = hasLoadFunction();
    ctrl.loadFunctionNameLabel = loadFunctionNameLabel();
    ctrl.hasDetailView = hasDetailView();
    ctrl.detailViewLabels = getDetailViewLabels();
    ctrl.hasGlobalActions = hasGlobalActions();
    ctrl.globalActions = typeData.globalActions;
    ctrl.hasItemActions = hasItemActions();
    ctrl.itemActions = typeData.itemActions;

    /**
     * View-specific behavior (Public)
     */
    ctrl.onActionSelected = onActionSelected;

    //////////////

    /**
     * Implementation
     */
    function fullySupported() {
      return (supportsGenericDetailsView() &&
          supportsGenericTableView() &&
          hasDrawerView() &&
          hasGlobalActions() &&
          hasItemActions());
    }

    function getName() {
      return typeData.getName();
    }
    
    function getSlug() {
      return registryService.getSlug(type);
    }
    
    function supportsGenericTableView() {
      return (getSlug(type) &&
        getName() &&
        hasListFunction() &&
        hasProperties() &&
        hasTableColumns() &&
        hasDrawerView());
    }

    function hasListFunction() {
      return typeData.listFunctionSet;
    }

    function listFunctionNameLabel() {
      var label = gettext("Not Set");
      if ( typeData.listFunction.name ) {
        label = typeData.listFunction.name;
      }
      return label;
    }
    
    function hasProperties() {
      return getProperties().length > 0;
    }
    
    function hasTableColumns() {
      return typeData.tableColumns.length > 0;
    }

    function getProperties() {
      return Object.keys(typeData.getProperties());
    }

    function getProperties() {
      var properties = typeData.getProperties();
      var keys = Object.keys(properties);
      return keys.map(getLabel);

      function getLabel(item) {
        return properties[item].label;
      }
    }
    
    function getTableColumnLabels() {
      return typeData.tableColumns.map(getColumnId);

      function getColumnId(item) {
        return item.id;
      }
    }
    
    function getTableUrl(type, typeData) {
      var url, slug = getSlug();
      if ( slug ) {
        url = 'developer/resource_browser/' + slug;
      } else {
        url = undefined;
      }
      return url;
    }
    
    function supportsGenericDetailsView() {
      return (hasDetailView() &&
        hasLoadFunction());
    }
    
    function hasDetailView() {
      return typeData.detailsViews.length > 0 
    }

    function getDetailViewLabels() {
      return typeData.detailsViews.map(getName);

      function getName(item) {
        return item.name;
      }
    }

    function hasLoadFunction() {
      return typeData.loadFunctionSet;
    }

    function loadFunctionNameLabel() {
      var label = gettext("Not Set");
      if ( typeData.loadFunction.name ) {
        label = typeData.loadFunction.name
      }
      return label;
    }
    
    function hasGlobalActions() {
      return typeData.globalActions.length != 0 
    }
    
    function hasItemActions() {
      return typeData.itemActions.length != 0;
    }
    
    function hasDrawerView() {
      return typeData.drawerTemplateUrl;
    }

    function onActionSelected(action) {
      // First, attempt to load the requested resource. Assume the user
      // typed in an ID object that is compatible with the load function.
      typeData.load(ctrl.resourceId).then(checkAllowed, loadFailed);

      function checkAllowed(resource) {
        // TODO Now that we have a resource, check if the action is allowed

        // Since we have an object, use the registered id generator to get
        // the correct data needed by the perform function.
        var id = typeData.getId(resource);

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
