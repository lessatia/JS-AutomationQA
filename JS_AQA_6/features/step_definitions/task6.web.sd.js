// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require("@cucumber/cucumber");
const YAML = require("yaml");
When("I wait somewhere {string} second", async function (ms) {
  console.log({ ms });
  await browser.pause(parseInt(ms, 10) * 1000);
});

When(/^I go to site "([^"]*)"$/, async function (url) {
  await browser.url(url);
});

When("I log In as: {string}, {string}", async function (login, password) {
  await $("#login").setValue(login);
  await $("#password").setValue(password);
  await $("button").click();
});

When("I go to {string} menue item", async function (item) {
  const createUser = await $("//*[@id='first-nav-block']/li[7]/a");
  expect(await createUser.getText()).toEqual(item);
});

When(/^I enter data in user form:$/, async function (formYaml) {
  await $("//*[@id='first-nav-block']/li[7]/a").click();
  await browser.pause(500);
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
  await $('//*[@id="anual"]').setValue(cell[7]);
  await $("//*[@id='dashboard']/div/div/div/form/button").click();
  await browser.pause(3000);

  await $("//*[@id='first-nav-block']/li[9]/a").click();
  await $('//*[@id="years"]').setValue(cell[8]);
  await $('//*[@id="description"]').setValue(cell[9]);
  await $("//*[@id='suspend']").click();
  const selectUser = await $("#user");
  await selectUser.selectByVisibleText(cell[0]);
  const selectPlan = await $("#plan");
  await selectPlan.selectByVisibleText(cell[10]);
  await $("//*[@id='dashboard']/div/div/div/form/button").click();
  await browser.pause(3000);

  await $("//*[@id='dashboard']/header/div/div/a[2]").click();
  await browser.pause(2000);
});

Then(/^I expect title have text: "([^"]*)"$/, async function (text) {
  await expect(await $("h3").getText()).toEqual(text);
});

Given(/^user payment time is "([^"]*)"$/, async function (years) {
  this.state.years = parseInt(years, 10);
});

Given(/^amount annual is "([^"]*)"$/, async function (moneyAmount) {
  this.state.userMoney = parseInt(moneyAmount, 10);
});

Then("I check Total amount in the tables in: {string}, {string}", async function (login, password) {
  await $("#login").setValue(login);
  await $("#password").setValue(password);
  await $("button").click();
  await browser.pause(9000);
  await $("//*[@id='first-nav-block']/li[11]/a").click();
  await browser.pause(2000);
  let text;
  const tableColumns = await $$("div.tabulator-cell[tabulator-field=total]");
  for (const cell of tableColumns) {
    text = await cell.getText();
  }
  const summPay = this.state.userMoney * this.state.years;
  await expect(summPay).toEqual(+text);
  await $("//*[@id='dashboard']/header/div/div/a[2]").click();
  await browser.pause(2000);
});
