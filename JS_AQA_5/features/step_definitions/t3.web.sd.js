// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require("@cucumber/cucumber");
const YAML = require("yaml");

When(/^I go to "([^"]*)"$/, async function (url) {
  await browser.url(url);
});
When("I login as: {string}, {string}", async function (login, password) {
  await $("#login").setValue(login);
  await $("#password").setValue(password);
  await $("button").click();
});
When("I go to {string} menu item", async function (item) {
  const createUser = await $("//*[@id='first-nav-block']/li[7]/a");
  expect(await createUser.getText()).toEqual(item);
  await createUser.click();
});
When(/^I fill user form:$/, async function (formYaml) {
  const formData = await YAML.parse(formYaml);
  console.log({ formData });
  const cell = Object.values(formData);
  await $('//*[@id="email"]').setValue(cell[0]);
  await $('//*[@id="password"]').setValue(cell[1]);
  await $('//*[@id="address1"]').setValue(cell[2]);
  await $('//*[@id="address2"]').setValue(cell[3]);
  await $('//*[@id="city"]').setValue(cell[4]);
  await $('//*[@id="zip"]').setValue(cell[5]);
  await $('//*[@id="description"]').setValue(cell[6]);
  await $("//*[@id='dashboard']/div/div/div/form/button").click();
});
Then(/^I expect title have text: "([^"]*)"$/, async function (text) {
  await expect(await $("h3").getText()).toEqual(text);
});
