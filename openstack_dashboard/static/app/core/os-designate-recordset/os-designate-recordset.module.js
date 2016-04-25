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
   * @ngname horizon.app.core.os-designate-recordset
   *
   * @description
   * Provides all of the services and widgets required
   * to support and display DNS (designate) zone related content.
   */
  angular
    .module('horizon.app.core.os-designate-recordset', ['ngRoute',
      'horizon.app.core.os-designate-recordset.actions', 'horizon.app.core.os-designate-recordset.details'])
    .constant('horizon.app.core.os-designate-recordset.resourceType', 'OS::Designate::RecordSet')
    .config(config)
    .run(run);

  config.$inject = [ '$provide', '$windowProvider' ];

  function config($provide, $windowProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'app/core/os-designate-recordset/';
    $provide.constant('horizon.app.core.os-designate-recordset.basePath', path);
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.designate',
    'horizon.app.core.os-designate-recordset.resourceType'
  ];

  function run(registry, designate, resourceTypeString) {
    registry.setSlug(resourceTypeString, resourceTypeString).getResourceType(resourceTypeString)
      .setNames(gettext('DNS Record Set'), gettext('DNS Record Sets'))
      .setListFunction(listFunction)
      .setProperty('name', {
        label: gettext('Name')
      })
      .tableColumns
      .append({
        id: 'name',
        priority: 1,
        sortDefault: true,
        template: '<a ng-href="{$ \'project/ngdetails/OS::Designate::RecordSet/\' + item.id $}">{$ item.name $}</a>'
      });

    function listFunction() {
      return designate.getRecordSets();
    }
  }

})();
