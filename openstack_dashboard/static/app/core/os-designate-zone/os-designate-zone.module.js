/**
 * (c) Copyright 2015 Hewlett-Packard Development Company, L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @ngname horizon.app.core.os-designate-zone
   *
   * @description
   * Provides all of the services and widgets required
   * to support and display DNS (designate) zone related content.
   */
  angular
    .module('horizon.app.core.os-designate-zone', ['ngRoute',
      'horizon.app.core.os-designate-zone.actions', 'horizon.app.core.os-designate-zone.details'])
    .constant('horizon.app.core.os-designate-zone.resourceType', 'OS::Designate::Zone')
    .config(config)
    .run(run);

  config.$inject = [ '$provide', '$windowProvider' ];

  function config($provide, $windowProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'app/core/os-designate-zone/';
    $provide.constant('horizon.app.core.os-designate-zone.basePath', path);
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.designate',
    'horizon.app.core.os-designate-zone.resourceType'
  ];

  function run(registry, designate, resourceTypeString) {
    registry.setSlug(resourceTypeString, resourceTypeString).getResourceType(resourceTypeString)
      .setNames(gettext('DNS Zone'), gettext('DNS Zones'))
      .setListFunction(listZones)
      .setProperty('name', {
        label: gettext('Name')
      })
      .tableColumns
      .append({
        id: 'name',
        priority: 1,
        sortDefault: true,
        template: '<a ng-href="{$ \'project/ngdetails/OS::Designate::Zone/\' + item.id $}">{$ item.name $}</a>'
      });

    function listZones() {
      return designate.listZones();
    }
  }

})();
