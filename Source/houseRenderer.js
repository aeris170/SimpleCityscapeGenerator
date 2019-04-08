function HouseRenderer(gl, numberOfHouses, maxStoreys) {
  this.colors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.8, 0.0, 1.0), // yellow
    vec4(0.0, 0.7, 0.3, 1.0), // green
    vec4(0.0, 0.5, 0.7, 1.0), // blue
    vec4(0.6, 0.2, 0.7, 1.0), // purple
  ];

  //List of all houses.
  this.houses = [];
  this.program = initShaders(gl, 'houseVShader', 'houseFShader');

  this.createHouses = function (canvas) {
    //Create house numberOfHouses times.
    for (var i = 0; i < numberOfHouses; i++) {
      //A random number between 1 and maxStoreys.
      var storey = Math.floor(Math.random() * maxStoreys) + 1;

      //Instantiate a House object with a random color and with a random storey.
      var house = new House(gl, this.colors[Math.floor(Math.random() * this.colors.length)], storey);

      //Set the contents of the house.
      house.initializeHouse(-0.85 + i * 0.48, -0.8, 0.3, 0.25 * storey);
      this.houses.push(house);
    }
  };

  this.deleteHouses = function () {
    //Delete all houses. Called before loading a state.
    this.houses = [];
  };

  this.setHouse = function (index, color, storey) {
    //Set the house at index. Called after deleting all houses to load a state.
    var house = new House(gl, color, storey);
    house.initializeHouse(-0.85 + index * 0.48, -0.8, 0.3, 0.25 * storey);
    this.houses[index] = house;
  };

  this.getHouseData = function (index) {
    return this.houses[index].getData();
  };

  this.render = function (isDay) {
    //Use the shader program.
    gl.useProgram(this.program);

    //For each house in houseList
    for (var i = 0; i < this.houses.length; i++) {
      //Bind the vBuffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.houses[i].getVertexBuffer());

      //Write to vPosition attribute
      var positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
      gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(positionAttribLocation);


      //Bind the cBuffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.houses[i].getColorBuffer());

      //Write to vColor attribute
      var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
      gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(colorAttribLocation);


      //Bind the ncBuffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.houses[i].getNightWindowColorBuffer());

      //Write to nightWindowColorFlag attribute.
      var nightWindowColorAttribLocation = gl.getAttribLocation(this.program, 'nightWindowColorFlag');
      gl.vertexAttribPointer(nightWindowColorAttribLocation, 1, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(nightWindowColorAttribLocation);

      //Send a uniform float to the shaders.
      var isDayLocation = gl.getUniformLocation(this.program, 'isDay');
      gl.uniform1f(isDayLocation, isDay);

      gl.drawArrays(gl.TRIANGLES, 0, this.houses[i].getVertexCount());
    }
  };
}