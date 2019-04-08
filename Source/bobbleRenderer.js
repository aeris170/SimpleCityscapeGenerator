function BobbleRenderer(gl) {
  //List of all bobbles.
  this.trees = [];

  //Shader programs for trunk and leaves.
  this.trunkProgram = initShaders(gl, 'bobbleTrunkVShader', 'bobbleTrunkFShader');
  this.leafProgram = initShaders(gl, 'bobbleLeafVShader', 'bobbleLeafFShader');

  this.createBobbles = function (canvas, houseCount) {
    //Create exactly houseCount - 1 bobbles. A bobble between each house.
    for (var i = 0; i < houseCount - 1; i++) {
      var tree = new Bobble(gl);
      tree.initializeBobble(-0.475 + i * 0.48, -0.8, 0.016, 0.2, generateCircleVerticesForTriangleFan(canvas, -0.47 + i * 0.48, -0.6, 0.1, 36));
      this.trees.push(tree);
    }
  };

  this.updateBobbles = function (canvas, newHouseCount) {
    //Delete all bobbles, and re-create them. This function is called
    //after loading a state via loadButton.
    this.trees = [];
    this.createBobbles(canvas, newHouseCount);
  };

  this.render = function (isDay) {
    //For each bobble in the bobbleList
    for (var i = 0; i < this.trees.length; i++) {
      //First, use trunk program.
      gl.useProgram(this.trunkProgram);

      //Bind trunkVBuffer
      gl.bindBuffer(gl.ARRAY_BUFFER, this.trees[i].getTrunkVertexBuffer());

      //Get attribute positions from the shaders, and write to those attributes.
      var tPositionAttribLocation = gl.getAttribLocation(this.trunkProgram, 'vPosition');
      gl.vertexAttribPointer(tPositionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(tPositionAttribLocation);

      //Send a uniform float to the shaders.
      var isDayLocation = gl.getUniformLocation(this.trunkProgram, 'isDay');
      gl.uniform1f(isDayLocation, isDay);

      gl.drawArrays(gl.TRIANGLES, 0, this.trees[i].getTrunkVertexCount());


      //Use leavesProgram.
      gl.useProgram(this.leafProgram);

      //Bind leavesVBuffer
      gl.bindBuffer(gl.ARRAY_BUFFER, this.trees[i].getLeafVertexBuffer());

      //Get attribute positions from the shaders, and write to those attributes.
      var lPositionAttribLocation = gl.getAttribLocation(this.leafProgram, 'vPosition');
      gl.vertexAttribPointer(lPositionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(lPositionAttribLocation);

      //Send a uniform float to the shaders.
      var isDayLocation = gl.getUniformLocation(this.leafProgram, 'isDay');
      gl.uniform1f(isDayLocation, isDay);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, this.trees[i].getLeafVertexCount());
    }
  };
}