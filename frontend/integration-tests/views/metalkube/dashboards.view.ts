import { browser, element, by, $, $$ } from 'protractor';
import { waitForNone } from '../../protractor.conf';

export const untilNoLoadersPresent = waitForNone($$('.co-m-loader'));
export const isLoaded = () => browser.wait(untilNoLoadersPresent).then(() => browser.sleep(2000));

export const inventoryNodesItemLabel = $('[data-test-id="console-dashboard-inventory-node"]').$(
  '.co-inventory-card__item-title',
);
export const inventoryNodesUpCounter = $('[data-test-id="console-dashboard-inventory-node"]').$(
  '[data-test-id="console-dashboard-inventory-count-ready"]',
);
export const inventoryNodesDownCounter = $('[data-test-id="console-dashboard-inventory-node"]').$(
  '[data-test-id="console-dashboard-inventory-count-notready"]',
);

export const inventoryPodsItemLabel = $('[data-test-id="console-dashboard-inventory-pod"]').$(
  '.co-inventory-card__item-title',
);
export const inventoryPodsUpCounter = $('[data-test-id="console-dashboard-inventory-pod"]').$(
  '[data-test-id="console-dashboard-inventory-count-running-succeeded"]',
);
export const inventoryPodsDownCounter = $('[data-test-id="console-dashboard-inventory-pod"]').$(
  '[data-test-id="console-dashboard-inventory-count-crashloopbackoff-failed"]',
);

export const inventoryHostsItemLabel = $(
  '[data-test-id="console-dashboard-inventory-baremetalhost"]',
).$('.co-inventory-card__item-title');
export const inventoryHostsUpCounter = $(
  '[data-test-id="console-dashboard-inventory-baremetalhost"]',
).$('[data-test-id="console-dashboard-inventory-count-other"]');
export const inventoryHostsDownCounter = $(
  '[data-test-id="console-dashboard-inventory-baremetalhost"]',
).$('[data-test-id="console-dashboard-inventory-count-notready"]');

/**
 * Get time of (nth) system event
 * @example
 * await dashboardView.sysEventTime(0).getText()
 */
export function sysEventTime(rowNumber) {
  return element(by.xpath(`(//div[@class="co-sysevent__header"])[${rowNumber + 1}]/small`));
}

/**
 * Get icon of (nth) system event
 * @example
 * await dashboardView.sysEventIcon(0).getAttribute('class')
 */
export function sysEventIcon(rowNumber) {
  return element(by.xpath(`(//div[@class="co-sysevent__subheader"])[${rowNumber + 1}]/span[1]`));
}

/**
 * Get the resource icon of (nth) system event
 * @example
 * await dashboardView.sysEventResourceIcon(0).getAttribute('class')
 */
export function sysEventResourceIcon(rowNumber) {
  return element(
    by.xpath(
      `(//div[@class="co-sysevent__subheader"])[${rowNumber + 1}]` +
        '/span[contains(@class, "co-sysevent__resourcelink")]' +
        '/span[contains(@class, "co-m-resource-icon")]',
    ),
  );
}

/**
 * Get the resource name of (nth) system event
 * @example
 * await dashboardView.sysEventResourceName(0).getText()
 */
export function sysEventResourceName(rowNumber) {
  return element(
    by.xpath(
      `(//div[@class="co-sysevent__subheader"])[${rowNumber + 1}]` +
        '/span[contains(@class, "co-sysevent__resourcelink")]' +
        '/a[@class="co-resource-item__resource-name"]',
    ),
  );
}

/**
 * Get the source of (nth) system event
 * @example
 * await dashboardView.sysEventSource(0).getText()
 */
export function sysEventSource(rowNumber) {
  return element(
    by.xpath(
      `(//div[@class="co-sysevent__header"])[${rowNumber + 1}]` +
        '/div[@class="co-sysevent__details"]' +
        '/small[@class="co-sysevent__source"]',
    ),
  );
}

/**
 * Get the message text of (nth) system event
 * @example
 * await dashboardView.sysEventMessage(0).getText()
 */
export function sysEventMessage(rowNumber) {
  return element(by.xpath(`(//div[contains(@class, "co-sysevent__message")])[${rowNumber + 1}]`));
}

/**
 * Get the alert item icon of (nth) alert
 * @example
 * await dashboardView.alertItemIcon(0).getAttribute('class')
 */
export function alertItemIcon(rowNumber) {
  return element(
    by.xpath(
      '//div[@class="kubevirt-alert__alerts-body"]' +
        `/div[@class="kubevirt-alert__item"][${rowNumber + 1}]` +
        '/span',
    ),
  );
}

/**
 * Get the alert message text (nth) alert
 * @example
 * await dashboardView.alertItemMessage(0).getText()
 */
export function alertItemMessage(rowNumber) {
  return element(
    by.xpath(
      '//div[@class="kubevirt-alert__alerts-body"]' +
        `/div[@class="kubevirt-alert__item"][${rowNumber + 1}]` +
        '/div[@class="kubevirt-alert__item-message"]',
    ),
  );
}

// Utility function: getTextIfPresent
export async function getTextIfPresent(elem, textIfNotPresent = '') {
  if (await elem.isPresent()) {
    return elem.getText();
  }
  return new Promise((resolve) => {
    resolve(textIfNotPresent);
  });
}
