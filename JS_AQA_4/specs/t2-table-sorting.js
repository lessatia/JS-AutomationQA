describe("Table sorting", function () {
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
  it("Check sorting ID column", async function () {
    await $(".table-responsive").scrollIntoView();
    await browser.pause(400);
    const arrIdBase = [];
    await $("div.tabulator-col[tabulator-field=id]").click();
    await browser.pause(500);
    const tableColumns = await $$("div.tabulator-cell[tabulator-field=id]");
    for (const cell of tableColumns) {
      let text = await cell.getText();
      arrIdBase.push(text);
    }
    console.log(arrIdBase + "   is base");
    const arrIdSort = Array.from(arrIdBase);
    arrIdSort.sort((a, b) => a - b);
    console.log(arrIdSort + "   is sort");
    const arrIdRev = Array.from(arrIdSort);
    arrIdRev.reverse();
    console.log(arrIdRev + "   is reverse");
    (await expect(arrIdBase).toEqual(arrIdSort)) && (await $("[aria-sort=asc]").isDisplayed());
  });
  it("Check sorting NAME column", async function () {
    await $(".table-responsive").scrollIntoView();
    await browser.pause(400);
    const arrNameBase = [];
    await $("div.tabulator-col[tabulator-field=name]").click();
    await browser.pause(500);
    const tableColumns = await $$("div.tabulator-cell[tabulator-field=name]");
    for (const cell of tableColumns) {
      let text = await cell.getText();
      arrNameBase.push(text);
    }
    console.log(arrNameBase + "   is base");
    const arrNameSort = Array.from(arrNameBase);
    arrNameSort.sort();
    console.log(arrNameSort + "   is sort");
    const arrNameRev = Array.from(arrNameSort);
    arrNameRev.reverse();
    console.log(arrNameRev + "   is reverse");
    (await expect(arrNameBase).toEqual(arrNameSort)) && (await $("[aria-sort=asc]").isDisplayed());
  });

  it("Check sorting in AGE column", async function () {
    await $(".table-responsive").scrollIntoView();
    await browser.pause(400);
    const arrAgeBase = [];
    await $("div.tabulator-col[tabulator-field=age]").click();
    await browser.pause(500);
    const tableColumns = await $$("div.tabulator-cell[tabulator-field=age]");
    for (const cell of tableColumns) {
      let text = await cell.getText();
      arrAgeBase.push(text);
    }
    console.log(arrAgeBase + "   is base");
    const arrAgeSort = Array.from(arrAgeBase);
    arrAgeSort.sort((a, b) => a - b);
    console.log(arrAgeSort + "   is sort");
    const arrAgeRev = Array.from(arrAgeSort);
    arrAgeRev.reverse();
    console.log(arrAgeRev + "   is reverse");
    (await expect(arrAgeBase).toEqual(arrAgeSort)) && (await $("[aria-sort=asc]").isDisplayed());
  });
});
