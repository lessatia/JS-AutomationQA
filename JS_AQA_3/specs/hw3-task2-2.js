const user ='{"Email": "tanya_shuleiko@mail.ru", "Password": "123", "Addres": "Pervomayskaya 18-221",  "Addres2": "Zoologycheskaya 1A",  "City": "Minsk",  "Zip": "220088",  "Description": "too optimistics"}';

describe("Check app", function () {
  before(async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut/index.html");
    const loginName = "walker@jw.com";
    await $("#login").setValue(loginName);
    await $("#password").setValue("password");
    await $("button").click();
    await $("#spinner").waitForDisplayed({ reverse: false, timeout: 1000 });
    await $("#spinner").waitForDisplayed({ reverse: true, timeout: 15000 });
    const title = await browser.getTitle();
    if (title !== "Report portal") {
      throw new Error("You don`t login into system!!!");
    }
  });
  it("should Create User", async function () {
    await $("//*[@id='first-nav-block']/li[7]/a").click();
    const userPars = JSON.parse(user);
    async function fillFormUsingJson(jsonStr) {
      cell = Object.values(jsonStr);
    }
    fillFormUsingJson(userPars);

    await $('//*[@id="email"]').setValue(cell[0]);
    await $('//*[@id="password"]').setValue(cell[1]);
    await $('//*[@id="address1"]').setValue(cell[2]);
    await $('//*[@id="address2"]').setValue(cell[3]);
    await $('//*[@id="city"]').setValue(cell[4]);
    await $('//*[@id="zip"]').setValue(cell[5]);
    await $('//*[@id="description"]').setValue(cell[6]);
    await $("//*[@id='dashboard']/div/div/div/form/button").click();
    await browser.pause(2000);
  });
});
