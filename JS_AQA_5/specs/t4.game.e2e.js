describe("Check the game", function () {
  it("should get more than 100 points ", async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut/arkanoid.html");
    await browser.pause(1000);
    await $("button=PLAY").click();
    await browser.keys("D");
    await browser.keys("D");
    await browser.keys("D");
    await browser.keys("D");
    await browser.keys("D");
    await browser.keys("D");
    await browser.pause(1000);
    await browser.waitUntil(
      async () => {
        const ballLocat = await $("#ball").getLocation("x");
        const padLocat = await $("#pad").getLocation("x");
        if (ballLocat > padLocat + 60) {
          await browser.keys("D");
          await browser.keys("D");
          await browser.keys("D");
          await browser.keys("D");
          await browser.keys("D");
          await browser.keys("D");
        } else if (ballLocat <= padLocat - 60) {
          await browser.keys("A");
          await browser.keys("A");
          await browser.keys("A");
          await browser.keys("A");
          await browser.keys("A");
          await browser.keys("A");
          await browser.keys("A");
        }
        const points = parseInt(await $("#points").getText(), 10);
        if (points > 100) return true;
        console.log({ points });
      },
      { timeout: 60000, interval: 10 }
    );
  });
});
