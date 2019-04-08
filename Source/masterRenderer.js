function MasterRenderer(gl, canvas, houseCountSlider, maxStoreyCountSlider) {
  //List of renderers.
  this.renderers = [];

  //Initially, it is day. day = 1 denotes night.
  var day = 0.0;

  //Initial Renderers.
  this.cloudRenderer = new CloudRenderer(gl);
  this.sunRenderer = new SunRenderer(generateCircleVerticesForTriangleFan(canvas, -0.85, 0.8, 0.1, 36), gl);
  this.terrainRenderer = new TerrainRenderer(gl);
  this.pineRenderer = new PineRenderer(gl);
  this.houseRenderer = new HouseRenderer(gl, houseCountSlider.value, maxStoreyCountSlider.value);
  this.bobbleRenderer = new BobbleRenderer(gl);
  this.pineRenderer.createPines();
  this.houseRenderer.createHouses();
  this.bobbleRenderer.createBobbles(canvas, houseCountSlider.value);
  this.renderers.push(this.terrainRenderer);
  this.renderers.push(this.sunRenderer);
  this.renderers.push(this.cloudRenderer);
  this.renderers.push(this.pineRenderer);
  this.renderers.push(this.houseRenderer);
  this.renderers.push(this.bobbleRenderer);

  this.reset = function () {
    //Delete all renderers and reinitialize them.
    this.renderers = [];
    this.cloudRenderer = new CloudRenderer(gl);
    this.sunRenderer = new SunRenderer(generateCircleVerticesForTriangleFan(canvas, -0.85, 0.8, 0.1, 36), gl);
    this.terrainRenderer = new TerrainRenderer(gl);
    this.pineRenderer = new PineRenderer(gl);
    this.houseRenderer = new HouseRenderer(gl, houseCountSlider.value, maxStoreyCountSlider.value);
    this.bobbleRenderer = new BobbleRenderer(gl);
    this.pineRenderer.createPines();
    this.houseRenderer.createHouses();
    this.bobbleRenderer.createBobbles(canvas, houseCountSlider.value);
    this.renderers.push(this.terrainRenderer);
    this.renderers.push(this.sunRenderer);
    this.renderers.push(this.cloudRenderer);
    this.renderers.push(this.pineRenderer);
    this.renderers.push(this.houseRenderer);
    this.renderers.push(this.bobbleRenderer);
  };

  this.render = function () {
    //Invoke each and every renderer's render function.
    this.renderers.forEach(function (renderer) {
      renderer.render(day);
    });
  };

  this.setDayNight = function () {
    //Toggle day night.
    if (day === 1.0) {
      day = 0.0;
      gl.clearColor(0.0, 0.7, 0.95, 1.0);
    } else {
      day = 1.0;
      gl.clearColor(0.0, 0.2, 0.45, 1.0);
    }
  };

  this.getCloudRenderer = function () {
    return this.cloudRenderer;
  };

  this.getHouseRenderer = function () {
    return this.houseRenderer;
  };

  this.getBobbleRenderer = function () {
    return this.bobbleRenderer;
  };
}