/**
 * @author Anthony Altieri on 8/26/16.
 */

export function performTests(fileName, tests) {
  console.log('======================');
  console.log(`begin testing ${fileName} with ${tests.length} tests`);
  tests.forEach(t => { t() });
  console.log('tests successful!');
  console.log('======================');
}
