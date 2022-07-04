// made by Tanya Volynskaya.

describe("Check app", function () {
  it("should login with user name", async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut");
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
  });
  it("should remove sticky header", async function () {
    browser.execute(() => {
      const elemToRemove = document.querySelector("#dashboard > header");
      elemToRemove.remove();
    });
  });
  it("should click secret button", async function () {
    await browser.pause(1000);

    browser.execute(
      "const elemToClick = document.querySelector('.btn-danger');\
      elemToClick.click()"
    );
    await browser.pause(1000);
  });
  it("should accept Alert", async function () {
    await browser.acceptAlert();
    await browser.pause(3000);
  });
});
