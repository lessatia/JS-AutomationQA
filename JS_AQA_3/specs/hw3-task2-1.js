// made by Tanya Volynskaya.
let assertResponse = (actual, expected) => {
  if (actual !== expected) {
    throw new Error(`Failed: wrong personal data\n expected: '${expected}'\n actual:'${actual}'`);
  }
};
describe("Check app", function () {
  before(async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut/index.html?quick");
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
  it("should Create and check Managers", async function () {
    await $("//*[@id='first-nav-block']/li[8]/a").click();
    //personal data 1
    await $('//*[@id="email"]').setValue("tanua_shuleiko@mail.ru");
    await $('//*[@id="password"]').setValue("123");
    await $('//*[@id="address1"]').setValue("Pervomayskaya 18-221");
    await $('//*[@id="address2"]').setValue("Zoologycheskaya 1A");
    await $('//*[@id="zip"]').setValue("220088");
    await $("#state").selectByVisibleText("India");
    await $('//*[@id="description"]').setValue("loves animals");
    await $('//*[@id="city"]').scrollIntoView();
    await $('//*[@id="dashboard"]/div/div/div/form/div[9]/div').click();
    await $('//*[@id="city"]').setValue("Minsk");
    await $('//*[@id="autoComplete_result_1"]/mark').click();
    await $("//*[@id='dashboard']/div/div/div/form/button").click();
    //personal data 2
    await $("//*[@id='first-nav-block']/li[8]/a").click();
    await $('//*[@id="email"]').setValue("lessatea@mail.ru");
    await $('//*[@id="password"]').setValue("000");
    await $('//*[@id="address1"]').setValue("Independent 104-33");
    await $('//*[@id="address2"]').setValue("village house");
    await $('//*[@id="zip"]').setValue("221122");
    await $("#state").selectByVisibleText("Canada");
    await $('//*[@id="description"]').setValue("loves sport");
    await $('//*[@id="city"]').scrollIntoView();
    await $('//*[@id="dashboard"]/div/div/div/form/div[9]/div').click();
    await $('//*[@id="city"]').setValue("Minsk");
    await $('//*[@id="autoComplete_result_1"]/mark').click();
    await $("//*[@id='dashboard']/div/div/div/form/button").click();
    await browser.pause(1000);
    // Checking
    const tableUserString = await $$("//*[@id='users-table']/div[2]/div/div");
    let j = 1;
    assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[1]").getText(), "tanua_shuleiko@mail.ru");
    for (const userString of tableUserString) {
      await userString.moveTo();
      let textCell = await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[1]").getText();
      if (textCell === "tanua_shuleiko@mail.ru") {
        console.log(" check  " + j + " tanua_shuleiko@mail.ru ");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[2]").getText(), "manager");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[3]").getText(), "Pervomayskaya 18-221");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[4]").getText(), "Zoologycheskaya 1A");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[5]").getText(), "Minsk");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[6]").getText(), "IN");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[7]").getText(), "220088");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[8]").getText(), "loves animals");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[9]").getText(), " ");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[10]").getText(), " ");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[11]").getText(), "country");
      }
      if (textCell === "lessatea@mail.ru") {
        console.log(" check " + j + " lessatea@mail.ru ");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[2]").getText(), "manager");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[3]").getText(), "Independent 104-33");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[4]").getText(), "village house");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[5]").getText(), "Minsk");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[6]").getText(), "CA");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[7]").getText(), "221122");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[8]").getText(), "loves sport");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[9]").getText(), " ");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[10]").getText(), " ");
        assertResponse(await $("//*[@id='users-table']/div[2]/div/div[" + j + "]/div[11]").getText(), "country");
      } else {
        j = j + 1;
      }
    }
  });
});
