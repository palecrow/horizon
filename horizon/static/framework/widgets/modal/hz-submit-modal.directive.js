/**
 * (c) Copyright 2016 Hewlett Packard Enterprise Development Company LP
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

(function () {
  'use strict';

  angular
    .module('horizon.framework.widgets.modal')
    .directive('hzSubmitModal', hzSubmitModal);

  hzSubmitModal.$inject = [
    'horizon.framework.widgets.basePath'
  ];

   /*
   * @ngdoc directive
   * @name horizon.framework.widgets.modal:hzSubmitModal
   * @description
   * A directive that provides the Horizon submit dialog modal. It includes a
   * title, a content area, and cancel and submit buttons.
   *
   * This can be used to pesent a simple confirmation dialog, or a complex
   * multi-field input form in the content area.
   *
   * @param title - Modal title
   * @param cancelLabel - Text to appear on the cancel button
   * @param submitLabel - Text to appear on the submit button
   * @param onCancel - Expression that is evaluated on the parent scope
   *    when the cancel button is pressed.
   * @param onSubmit - Expression that is evaluabed on the parent scope
   *    when the submit button is pressed.
   *
   * @example
   * <hz-submit-modal
   *      title="{$ 'Create Instance Snapshot' | translate $}"
   *      cancel-label="{$ 'Cancel' | translate $}"
   *      submit-label="{$ 'Create Snapshot' | translate $}"
   *      on-cancel="ctrl.cancel()"
   *      on-submit="ctrl.submit()">
   *        <!-- content -->
   *  </hz-submit-modal>
   */
  function hzSubmitModal(basePath) {

    var directive = {
      scope: {
        title: '@',
        cancelLabel: '@',
        submitLabel: '@',
        onCancel: '&',
        onSubmit: '&'
      },
      restrict: 'E',
      templateUrl: basePath + 'modal/hz-submit-modal.html',
      transclude: true,
      controller: "horizon.framework.widgets.modal.HzSubmitModalController as ctrl",
      bindToController: true
    };

    return directive;
  }
})();
