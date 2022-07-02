const { When, Then, Given } = require("@cucumber/cucumber");

When(/^I go to website "([^"]*)"$/, async function (url) {
  await browser.url(url);
});

When("I log in as: {string}, {string}", async function (login, password) {
  await $("#login").setValue(login);
  await $("#password").setValue(password);
  await $("button").click();
});

When("I wait about {string} second", async function (ms) {
  console.log({ ms });
  await browser.pause(parseInt(ms, 10) * 1000);
});

Then(/^I get "([^"]*)" answer$/, async function (message) {
  const user = await $("#login");
  const pass = await $("#password");
  let logMessage = "Fail to login";
  if ((await user.getValue()) === "") {
    logMessage = "Login is empty";
  } else if ((await pass.getValue()) === "") {
    logMessage = "Password is empty";
  } else if ((await user.getValue()) === "old_walker@jw.com" && (await pass.getValue()) === "password1") {
    logMessage = "The user is suspended";
  }
  await expect(logMessage).toEqual(message);
});
