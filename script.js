const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const numberLinesColor = document.getElementById("line-color");
const largeHandsColor = document.getElementById("large-hand-color");
const secondHandColor = document.getElementById("second-hand-color");
const button = document.getElementById("save-btn");
const canvas = document.getElementById("canvas");

function clock() {
  const now = new Date();
  ctx = canvas.getContext("2d");

  //Setup canvas
  ctx.save(); //save default state
  ctx.clearRect(0, 0, 300, 300);
  ctx.translate(150, 150); // Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); //Rotate clock -90 deg

  //set default style
  ctx.strokeStyle = numberLinesColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  //Draw Clock Face/Border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //Draw hour lines
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }

  ctx.restore();

  //Draw minute lines
  ctx.save();
  ctx.lineWidth = 1;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(110, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }

  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  //Draw hour hand

  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeHandsColor.value;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  //Draw minutes hand

  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandsColor.value;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  //Draw seconds hand

  ctx.save();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore the default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

button.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
});
