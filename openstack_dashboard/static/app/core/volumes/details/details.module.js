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
   * @ngname horizon.app.core.instances.details
   *
   * @description
   * Provides details features for instances.
   */
  angular.module('horizon.app.core.volumes.details',
    ['horizon.framework.conf', 'horizon.app.core'])
    .run(run);

  run.$inject = [
    'horizon.app.core.volumes.resourceType',
    'horizon.app.core.openstack-service-api.cinder',
    'horizon.app.core.volumes.basePath',
    'horizon.framework.conf.resource-type-registry.service'
  ];

  function run(
    resourceType,
    cinderApi,
    basePath,
    registry
  ) {
    registry.getResourceType(resourceType)
      .setLoadFunction(loadFunction)
      .setDrawerTemplateUrl(basePath + 'details/drawer.html');

    function loadFunction(identifier) {
      return cinderApi.getVolume(identifier);
    }
  }

})();
