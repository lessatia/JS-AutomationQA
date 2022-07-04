const {
  startClientPC,
  startSatelite,
  stopClientPC,
  stopEarthServer,
  stopSatelite,
  stopMarsServer,
  startEarthServer,
  startMarsServer,
  sendMessage,
  assertResponse,
} = require("./stubs/messageservice.stubs");

// made by Tanya Volynskaya.

function startMarsNodes() {
  const marsToken = startMarsServer();
  startSatelite();
  return {
    mars: marsToken,
  };
}
function startEarthNodes() {
  const earthToken = startEarthServer();
  return {
    earth: earthToken,
  };
}
function stopMarsNodes() {
  stopMarsServer();
  stopSatelite();
}

describe("Message Sending", function () {
  before(function () {
    startClientPC();
  });
  after(function () {
    stopClientPC();
  });

  context("Earth server", function () {
    it("should send message to Earth without error", function () {
      //given
      let tokens = startEarthNodes();
      //when
      const response = sendMessage("Hello", "Earth", tokens.earth);
      //then
      assertResponse(response, "Success");
      stopEarthServer();
    });
    it('should send message to Earth with an invalid token "Security Error"', function () {
      //given
      startEarthNodes();
      //when
      const response = sendMessage("Hello", "Earth", "X0000");
      //then
      assertResponse(response, "Security Error");
      stopEarthServer();
    });
  });
  context(" Mars server", function () {
    it("should send message to Mars without error", function () {
      //given
      let tokens = startMarsNodes();
      //when
      const response = sendMessage("Hello", "Mars", tokens.mars);
      //then
      assertResponse(response, "Success");
      stopMarsNodes();
    });
    it('should send message to Mars with an invalid token "Security Error"', function () {
      //given
      startMarsNodes();
      //when
      const response = sendMessage("Hello", "Mars", "X1111");
      //then
      assertResponse(response, "Security Error");
      stopMarsNodes();
    });
    it('should send message to Mars with a disabled satellite "Service is unavailable"', function () {
      //given
      let tokens = startMarsNodes();
      stopSatelite();
      //when
      const response = sendMessage("Hello", "Mars", tokens.mars);
      //then
      assertResponse(response, "Service is unavailable");
      stopMarsServer();
    });
    it('should send message to Mars with with an invalid token and a disabled satellite "Service is unavailable"', function () {
      //given
      startMarsServer();
      //when
      const response = sendMessage("Hello", "Mars", "X1111");
      //then
      assertResponse(response, "Service is unavailable");
      startMarsServer();
    });
  });
});
