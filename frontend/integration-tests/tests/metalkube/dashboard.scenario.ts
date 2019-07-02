import { browser } from 'protractor';
const execSync = require('child_process').execSync;

import { appHost } from '../../protractor.conf';
import * as dashboardView from '../../views/metalkube/dashboards.view';

async function compareCounters(elem, expectedValue) {
  const displayedValue = Number(await dashboardView.getTextIfPresent(elem, '0'));
  expect(displayedValue).toEqual(expectedValue);
}

describe('Inventory card', () => {
  beforeAll(async () => {
    await browser.get(`${appHost}/dashboards`);
    await dashboardView.isLoaded();
    browser.sleep(10000); // the counters on the page start updating late...
  });

  it('Node count is displayed', async () => {
    // get the number of ready and not ready nodes from the CLI
    let readyNodes = 0;
    let notReadyNodes = 0;
    const output = execSync('oc get nodes', { encoding: 'utf-8' });
    const lines = output.split('\n');
    lines.forEach(function(line) {
      if (line.indexOf(' Ready ') > 0) {
        readyNodes++;
      }
      if (line.indexOf(' NotReady ') > 0) {
        notReadyNodes++;
      }
    });
    const displayedLabel = await dashboardView.inventoryNodesItemLabel.getText();
    expect(displayedLabel).toEqual(`${readyNodes + notReadyNodes} Nodes`);
    compareCounters(dashboardView.inventoryNodesUpCounter, readyNodes);
    compareCounters(dashboardView.inventoryNodesDownCounter, notReadyNodes);
  });

  it('Host count is displayed', async () => {
    // get the hosts and their statuses from the CLI
    let readyHosts = 0;
    let notReadyHosts = 0;
    const output = execSync('oc get baremetalhosts -n openshift-machine-api', {
      encoding: 'utf-8',
    });
    const lines = output.split('\n').slice(1); // slice(1) to ignore the 1st line of output
    lines.forEach(function(line) {
      if (line.trim().length > 1) {
        if (line.indexOf(' OK ') > 0) {
          readyHosts++;
        } else {
          notReadyHosts++;
        }
      }
    });
    const displayedLabel = await dashboardView.inventoryHostsItemLabel.getText();
    expect(displayedLabel).toEqual(`${readyHosts + notReadyHosts} Bare Metal Hosts`);
    compareCounters(dashboardView.inventoryHostsUpCounter, readyHosts);
    compareCounters(dashboardView.inventoryHostsDownCounter, notReadyHosts);
  });
});
