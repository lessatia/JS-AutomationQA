// made by Tanya Volynskaya

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

  it("check such user logged", async () => {
    const inputUser = await $(
      "#dashboard > header > div > div > a:nth-child(1)"
    );
    const userName = await inputUser.getText();
    console.log(await userName);
  });

  it("check if items have red color", async function () {
    const tableHeaders = await $$("// *[@id='first-nav-block']/li");

    for (const header of tableHeaders) {
      const text = await header.getText();
      console.log(text);

      await header.moveTo();
      const color = await header.getCSSProperty("background-color");
      console.log(color.value);

      if (color.value == "rgba(255,0,0,1)") {
        throw new Error("The menu Item " + text + " has wrong color!");
      }
      await browser.pause(500);
    }
  });
});
