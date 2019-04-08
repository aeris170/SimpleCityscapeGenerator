function TerrainRenderer(gl) {
  //Vertices of a simple quad
  this.terrainVertices = [
    -1.0, -0.36,
    -1.0, -1.0,
    1.0, -0.36,

    1.0, -0.36,
    -1.0, -1.0,
    1.0, -1.0,
  ];
  this.program = initShaders(gl, 'terrainVShader', 'terrainFShader');

  //Create the vertexBuffer.
  this.vertexBuffer = gl.createBuffer();

  //Bind the vBuffer and write to it.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.terrainVertices), gl.STATIC_DRAW);

  this.render = function (isDay) {
    //Use the shader program.
    gl.useProgram(this.program);

    //Bind vBuffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    //Get the location of attribute vPosition and write it.
    var positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(positionAttribLocation);

    //Send a uniform float to the shaders.
    var isDayLocation = gl.getUniformLocation(this.program, 'isDay');
    gl.uniform1f(isDayLocation, isDay);

    gl.drawArrays(gl.TRIANGLES, 0, this.terrainVertices.length / 2);
  };
}