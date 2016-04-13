/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use self file except in compliance with the License. You may obtain
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

  angular
    .module('horizon.app.core.instances')
    .factory('horizon.app.core.instances.actions.unpause.service', factory);

  factory.$inject = [
    '$q',
    'horizon.app.core.openstack-service-api.nova',
    'horizon.app.core.openstack-service-api.userSession',
    'horizon.app.core.openstack-service-api.policy',
    'horizon.framework.util.actions.action-promise.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.framework.util.q.extensions',
    'horizon.framework.widgets.modal-wait-spinner.service',
    'horizon.app.core.instances.resourceType'
  ];

  /**
   * @ngDoc factory
   * @name horizon.app.core.instances.actions.delete-instance.service
   *
   * @Description
   * Pauses the given server.
   */
  function factory(
    $q,
    nova,
    userSessionService,
    policy,
    actionPromiseService,
    gettext,
    $qExtensions,
    waitSpinner,
    instanceResourceType
  ) {
    var policyPromise;

    var service = {
      initScope: initScope,
      allowed: allowed,
      perform: perform
    };

    return service;

    //////////////

    function initScope() {
      policyPromise = policy.ifAllowed({rules: [['instance', 'unpause_instance']]});
    }

    function perform(item) {
      waitSpinner.showModalSpinner(gettext('Please Wait'));
      return nova.unpauseServer(item.id).then(onSuccess, onFailure);

      function onSuccess() {
        waitSpinner.hideModalSpinner();
        return actionPromiseService.getResolved()
          .updated(instanceResourceType, item.id)
          .result;
      }

      function onFailure() {
        waitSpinner.hideModalSpinner();
      }
    }

    function allowed(instance) {
      return $q.all([
        policyPromise,
        userSessionService.isCurrentProject(instance.owner),
        properState(instance)
      ]);

      function properState(instance) {
        var proper = !instance.protected && instance.status === 'PAUSED';
        return $qExtensions.booleanAsPromise(proper);
      }
    }
  }
})();
