/**
 * (c) Copyright 2016 Hewlett-Packard Development Company, L.P.
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
   * @ngname horizon.app.core.os-designate-zone.details
   *
   * @description
   * Provides details features for instances.
   */
  angular.module('horizon.app.core.os-designate-zone.details',
    ['horizon.framework.conf', 'horizon.app.core'])
    .run(run);

  run.$inject = [
    'horizon.app.core.os-designate-zone.resourceType',
    'horizon.app.core.openstack-service-api.designate',
    'horizon.app.core.os-designate-zone.basePath',
    'horizon.framework.conf.resource-type-registry.service'
  ];

  function run(
    zoneResourceType,
    designateApi,
    basePath,
    registry
  ) {
    var resourceType = registry.getResourceType(zoneResourceType);
    resourceType
      .setLoadFunction(loadFunction)
      .setDrawerTemplateUrl(basePath + 'details/drawer.html');

    resourceType.detailsViews
      .append({
        id: 'zoneDetailsOverview',
        name: gettext('Overview'),
        template: basePath + 'details/overview.html'
      });

    function loadFunction(identifier) {
      return designateApi.getZome(identifier);
    }
  }

})();
