/**
 * Copyright 2015 IBM Corp.
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

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.designate', designateAPI);

  designateAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  /**
   * @ngdoc service
   * @param {Object} apiService
   * @param {Object} toastService
   * @name cinder
   * @description Provides direct access to Cinder APIs.
   * @returns {Object} The service
   */
  function designateAPI(apiService, toastService) {
    var service = {
      getZone: getZone,
      listZones: listZones
    };

    return service;

    ///////////////

    // Volumes

    /**
     * @name getVolumes
     * @description
     * Get a list of volumes.
     *
     * The listing result is an object with property "items." Each item is
     * a volume.
     *
     * @param {Object} params
     * Query parameters. Optional.
     *
     * @param {boolean} params.paginate
     * True to paginate automatically.
     *
     * @param {string} params.marker
     * Specifies the image of the last-seen image.
     *
     * The typical pattern of limit and marker is to make an
     * initial limited request and then to use the last
     * image from the response as the marker parameter
     * in a subsequent limited request. With paginate, limit
     * is automatically set.
     *
     * @param {string} params.sort_dir
     * The sort direction ('asc' or 'desc').
     *
     * @param {string} param.search_opts
     * Filters to pass through the API.
     * For example, "status": "available" will show all available volumes.
     * @returns {Object} The result of the API call
     */
    function listZones(params) {
      var config = params ? {'params': params} : {};
      return apiService.get('/api/designate/zones/', config)
        .error(function () {
          toastService.add('error', gettext('Unable to retrieve the zone.'));
        });
    }

    /**
     * @name getVolume
     * @description
     * Get a single Volume by ID.
     *
     * @param {string} id
     * Specifies the id of the Volume to request.
     *
     * @returns {Object} The result of the API call
     */
    function getZone(id) {
      return apiService.get('/api/designate/zone/' + id + '/')
        .error(function () {
          toastService.add('error', gettext('Unable to retrieve the zone.'));
        });
    }
  }
}());
