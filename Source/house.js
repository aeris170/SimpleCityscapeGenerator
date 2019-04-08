function House(gl, color, storeyCount) {
  //Create a vertexBuffer, a colorBuffer and a nightWindowColorBuffer
  this.vertexBuffer = gl.createBuffer();
  this.colorBuffer = gl.createBuffer();
  this.nightWindowColorBuffer = gl.createBuffer();

  this.vertexCount = 0;
  this.initializeHouse = function (x, y, xOffset, yOffset) {
    //Vertices of the mainframe of the house.
    var vertices = [
      x, y,
      x + xOffset, y + yOffset,
      x, y + yOffset,
      x, y,
      x + xOffset, y,
      x + xOffset, y + yOffset,
      x, y + yOffset,
      x + xOffset, y + yOffset,
      x + xOffset / 2, y + yOffset + 0.25,
    ];
    this.vertexCount = 9;

    var colors = [
      color, color, color, color, color, color, vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0),
    ];

    var nightWindowColors = [
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ];

    //Add 2 * storeyCount windows to the house.
    var wXOffset = 0.1;
    var wYOffset = 0.13;
    var wXOffsetFromBuilding = 0.025;
    var wYOffsetFromBuilding = 0.06;
    var wXOffsetFromAnotherWindow = 0.15;
    for (var i = 0; i < storeyCount; i++) {
      vertices.push(x + wXOffsetFromBuilding);
      vertices.push(y + wYOffsetFromBuilding + i * 0.23); // x, y,
      vertices.push(x + wXOffsetFromBuilding + wXOffset);
      vertices.push(y + wYOffsetFromBuilding + wYOffset + i * 0.23); // x + xOffset, y + yOffset,
      vertices.push(x + wXOffsetFromBuilding);
      vertices.push(y + wYOffsetFromBuilding + wYOffset + i * 0.23); // x, y + yOffset,
      vertices.push(x + wXOffsetFromBuilding);
      vertices.push(y + wYOffsetFromBuilding + i * 0.23); // x, y,
      vertices.push(x + wXOffsetFromBuilding + wXOffset);
      vertices.push(y + wYOffsetFromBuilding + i * 0.23); // x + xOffset, y,
      vertices.push(x + wXOffsetFromBuilding + wXOffset);
      vertices.push(y + wYOffsetFromBuilding + wYOffset + i * 0.23); // x + xOffset, y + yOffset,

      vertices.push(x + wXOffsetFromBuilding + wXOffsetFromAnotherWindow);
      vertices.push(y + wYOffsetFromBuilding + i * 0.23); // x, y,
      vertices.push(x + wXOffsetFromBuilding + wXOffsetFromAnotherWindow + wXOffset);
      vertices.push(y + wYOffsetFromBuilding + wYOffset + i * 0.23); // x + xOffset, y + yOffset,
      vertices.push(x + wXOffsetFromBuilding + wXOffsetFromAnotherWindow);
      vertices.push(y + wYOffsetFromBuilding + wYOffset + i * 0.23); // x, y + yOffset,
      vertices.push(x + wXOffsetFromBuilding + wXOffsetFromAnotherWindow);
      vertices.push(y + wYOffsetFromBuilding + i * 0.23); // x, y,
      vertices.push(x + wXOffsetFromBuilding + wXOffsetFromAnotherWindow + wXOffset);
      vertices.push(y + wYOffsetFromBuilding + i * 0.23); // x + xOffset, y,
      vertices.push(x + wXOffsetFromBuilding + wXOffsetFromAnotherWindow + wXOffset);
      vertices.push(y + wYOffsetFromBuilding + wYOffset + i * 0.23); // x + xOffset, y + yOffset,

      //Determine which windows will be black and which windows will be yellow at night mode.
      var num = Math.random();
      var random = Math.random();
      for (var j = 0; j < 12; j++) {
        if (j === 6) {
          num = Math.random();
          random = Math.random();
        }
        colors.push(vec4(0.7, 0.8, 0.9, 1.0));
        if (num < 0.5) {
          nightWindowColors.push(random);
        } else {
          nightWindowColors.push(1 - random);
        }

        //Up the vertexCount.
        this.vertexCount++;
      }
    }

    //Bind the vBuffer, and write the vertices array to it.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //Bind the cBuffer, and write the colors array to it.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    //Bind the ncBuffer, and write the nightWindowColors array to it.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.nightWindowColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nightWindowColors), gl.STATIC_DRAW);
  };

  this.getVertexCount = function () {
    return this.vertexCount;
  };

  this.getVertexBuffer = function () {
    return this.vertexBuffer;
  };

  this.getColorBuffer = function () {
    return this.colorBuffer;
  };

  this.getNightWindowColorBuffer = function () {
    return this.nightWindowColorBuffer;
  };

  this.getData = function () {
    //Return the color and the storeys of the house in string.
    return color[0] + ' ' + color[1] + ' ' + color[2] + ' ' + color[3] + ' ' + storeyCount;
  };
}