describe("Сurrency exchange test", function () {
  before("User login", async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut/?quick");
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

  it("check rate", async function () {
    const num = [];
    await $("[onclick='withdraw()']").scrollIntoView();
    await browser.pause(700);
    async function waitForNum() {
      await browser.waitUntil(
        async () => {
          await browser.pause(1000);
          const numPars = await JSON.parse(await $("//*[@id='database']").getHTML(false));
          try {
            await expect(num).toEqual(numPars);
            return true;
          } catch (err) {
            console.log("err");
            console.log(num, numPars);
            console.log(err);
            return false;
          }
        },
        {
          timeout: 5000,
          timeoutMsg: "your number the same",
        }
      );
    }
    await $("//*[@id='sum-to-buy']").setValue(1);
    num.push({ num: "1" });
    await waitForNum();
    await $("//*[@id='sum-to-buy']").setValue(2);
    num.push({ num: "2" });
    await waitForNum();
    await $("//*[@id='sum-to-buy']").setValue(3);
    num.push({ num: "3" });
    await waitForNum();
    await $("//*[@id='sum-to-buy']").setValue(4);
    num.push({ num: "4" });
    await waitForNum();
    await $("[onclick='withdraw()']").click();
    const rate = +(await $('//*[@id="currency-rate"]').getText());
    const expRes = await $('//*[@id="withdrew"]').getText();
    const result = 1234 * rate;
    await expect(expRes).toEqual("1234 => " + result);
    console.log("You'll get " + result);
    await browser.pause(3000);
  });
});
