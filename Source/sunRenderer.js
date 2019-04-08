function SunRenderer(sunVertices, gl) {
  this.program = initShaders(gl, 'sunVShader', 'sunFShader');

  //Create the vertexBuffer.
  this.vertexBuffer = gl.createBuffer();

  //Bind the vBuffer and write to it.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sunVertices), gl.STATIC_DRAW);

  this.render = function (isDay) {
    //Use the program.
    gl.useProgram(this.program);

    //Bind the vBuffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    //Get the location of attribute vPosition and write to that attribute.
    var positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(positionAttribLocation);

    //Send a uniform float to the shaders.
    var isDayLocation = gl.getUniformLocation(this.program, 'isDay');
    gl.uniform1f(isDayLocation, isDay);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, sunVertices.length / 2);
  };
}