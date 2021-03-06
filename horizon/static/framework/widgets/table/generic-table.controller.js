/*
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
    .module('horizon.framework.widgets.table')
    .controller('GenericTableController', controller);

  controller.$inject = [
    '$routeParams',
    '$scope',
    'horizon.framework.conf.resource-type-registry.service'
  ];

  function controller($routeParams, $scope, registry) {
    var ctrl = this;

    var resourceTypeName = registry.getTypeNameBySlug($routeParams.slug);
    ctrl.resourceType = registry.getResourceType(resourceTypeName);
    ctrl.resourceType.listFunction().then(onLoad);
    ctrl.items = [];
    ctrl.itemsSrc = [];
    ctrl.searchFacets = [];
    registry.initActions(resourceTypeName, $scope);
    function onLoad(response) {
      ctrl.itemsSrc = response.data.items;
    }
    ctrl.config = {
        //detailsTemplateUrl: rowDetailsTemplate,
        selectAll: true,
        expand: true,
        trackId: 'id',
        columns: registry.getResourceType(resourceTypeName).getTableColumns()
      };
  }
})();
