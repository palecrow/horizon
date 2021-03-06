/**
 * (c) Copyright 2016 Hewlett Packard Enterprise Development Company LP
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
   * @ngname horizon.app.core.os-designate-recordset.actions
   *
   * @description
   * Provides all of the actions for DNS Zones.
   */
  angular.module('horizon.app.core.os-designate-recordset.actions',
    ['horizon.framework.conf', 'horizon.app.core'])
    .run(run);

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.actions.redirect-action.service',
    'horizon.app.core.os-designate-recordset.resourceType'
  ];

  function run(
    registry,
    redirectService,
    zoneResourceTypeCode)
  {
    var zoneResourceType = registry.getResourceType(zoneResourceTypeCode);
  }

})();
