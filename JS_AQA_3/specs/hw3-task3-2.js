// made by Tanya Volynskaya.

describe("Check app", function () {
  before(async function () {
    await browser.url(
      "https://viktor-silakov.github.io/course-sut/index.html?quick"
    );
    const loginName = "walker@jw.com";
    await $("#login").setValue(loginName);
    await $("#password").setValue("password");
    await $("button").click();
    await $("#spinner").waitForDisplayed({ reverse: false, timeout: 5000 });
    await $("#spinner").waitForDisplayed({ reverse: true, timeout: 15000 });
    const title = await browser.getTitle();
    if (title !== "Report portal") {
      throw new Error("You don`t login into system!!!");
    }
    browser.addCommand(
      "waitForText",
      async function (text, time) {
        await browser.waitUntil(
          async () => {
            return ((await this.isDisplayed()) && (await this.getText()) === text);
          },
          {
            timeout: time,
            timeoutMsg: "expected text was the same after 10s",
          }
        );
      },
      true
    );
  });
  it('should click to "Check Status"', async function () {
    await $('//*[@id="status"]').scrollIntoView();
    await $("#status").click();
    await $("#status").waitForText("Active", 10000);
   console.log("status now - " + (await $("#status").getText()));
  });
});
