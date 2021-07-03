var canvas = document.getElementById('vectordraw');
var ctx = canvas.getContext('2d');

function randomcolour()
{
  var C1 = Math.floor(Math.random() * 255);
  var C2 = Math.floor(Math.random() * 255);
  var C3 = Math.floor(Math.random() * 255);
  return C1+","+C2+","+C3;
}

function colourpicker(colour)
{
  return colour[Math.floor(Math.random()*colour.length)]
}

function randomvar()
{
  var X = Math.floor(Math.random() * canvas.width);
  var Y = Math.floor(Math.random() * canvas.height);
  var R =Math.floor(Math.random() * 100) + 50;
  return [X,Y,R];
}

function drawInnerCircle()
{

  var space = (Math.floor(Math.random() * 40)+30);
  var innerR =Math.floor(Math.random() * (space/3)) + 5;
  ctx.rotate(((Math.random() * 90)-45) * Math.PI / 180);
  for (let j = -canvas.width/space*2; j < Math.floor(((canvas.width/space)*2)) ;j++){
    for (let k = -canvas.height/space*2; k < Math.floor(((canvas.height/space)*2));k++){
      let path2 = new Path2D();
      path2.arc(space*j, space*k, innerR, 0, 2 * Math.PI, false);
      ctx.fill(path2);
    }
  }
  ctx.rotate(0);
}

function drawInnerLines()
{
  var space = (Math.floor(Math.random() * 25)+5);
  ctx.rotate(((Math.random() * 180)-90) * Math.PI / 180);
  for (let j = -canvas.width/space*2; j < Math.floor(((canvas.width/space)*2)) ; j++){
    ctx.beginPath();
    ctx.rect(2*space*j, -canvas.height, space, canvas.height*2);
    ctx.fill();
    ctx.closePath();
  }
}

function drawBigCircle(circ,colour)
{
  let path = new Path2D();
  path.arc(circ[0], circ[1], circ[2], 0, 2 * Math.PI, false);
  ctx.clip(path);
  if (typeof colour=='undefined'){
    ctx.fillStyle = 'rgb('+ randomcolour() +')';
    ctx.fill(path);

    ctx.fillStyle = 'rgb('+ randomcolour() +')';
  }
  else{
    var currentColour=colourpicker(colour)
    var newColour=colourpicker(colour)
    while (currentColour == newColour) {
      newColour=colourpicker(colour);
    }
    ctx.fillStyle = 'rgb('+ currentColour +')';
    ctx.fill(path);
    ctx.fillStyle = 'rgb('+newColour+')';
  }
  return path;
}

function clearboard()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function ladybug(colour)
{
  for (let i = 0; i < 10; i++) {
    ctx.save();
    ctx.beginPath();
    var circ = randomvar();
    var path = drawBigCircle(circ,colour);
    drawInnerCircle();
    ctx.restore();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.stroke(path);
  }
}

function beetle(colour)
{
  for (let i = 0; i < 10; i++) {
    ctx.save();
    ctx.beginPath();
    var circ = randomvar();
    var path = drawBigCircle(circ,colour);
    ctx.translate(circ[0],circ[1]);
    drawInnerLines();
    ctx.restore();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.stroke(path);
  }
}

function backgroundCircles(colour)
{
  if (typeof colour=='undefined'){
    ctx.fillStyle = 'rgb('+ randomcolour() +')';
  }
  else{
    var currentColour=colourpicker(colour)
    ctx.fillStyle = 'rgb('+ currentColour +')';
  }
  ctx.save();
  drawInnerCircle();
  ctx.restore();
}

function getLineColour()
{
  var colourlength=3;
  var colour=[];
  for (let i=0; i<colourlength; i++){
    colour[i]='rgb('+ randomcolour() +')';
  }
  return colour;
}

function colourTranspose(colour)
{
  for (let i=0; i<colour.length; i++)
  {
    colour[i]='rgb('+ colour[i] +')'
  }
  return colour;
}

function rStripeLeft(C1,X, radius, colour)
{
  if(typeof colour=='undefined'){
    var colour=getLineColour();
  }
  else{
    colour=colourTranspose(colour);
  }
  var colourlength=colour.length;
  for (let i = 0; i < colourlength; i++) {
    var bend=(canvas.height-C1+X)/2;
    ctx.beginPath();
    ctx.strokeStyle = colour[i];
    ctx.lineWidth =30;
    ctx.moveTo(C1+100, -100);
    ctx.arcTo(C1+bend+100,bend-100, X-100,canvas.height+100, radius);
    ctx.lineTo(X-100, canvas.height+100);
    ctx.stroke();
    C1=C1-41;
    X=X-41;
    radius=radius-28;
  }
}

function rStripeRight(C1,X, radius, colour)
{
  if(typeof colour=='undefined'){
    var colour=getLineColour();
  }
  else{
    colour=colourTranspose(colour);
  }
  var colourlength=colour.length;
  for (let i = 0; i < colourlength; i++) {
    var bend=(canvas.height-X+C1)/2;
    ctx.beginPath();
    ctx.strokeStyle = colour[i];
    ctx.lineWidth =30;
    ctx.moveTo(C1-100, -100);
    ctx.arcTo(C1-bend-100,bend-100, X+100,canvas.height+100, radius);
    ctx.lineTo(X+100, canvas.height+100);
    ctx.stroke();
    C1=C1+41;
    X=X+41;
    radius=radius-28;
  }
}

function racingStripe(colour)
{
  var C1 = Math.floor(Math.random() * canvas.width);
  var X= Math.floor(Math.random() * canvas.width);
  var linechoice=Math.floor(Math.random()*2);
  if (linechoice == 1) {
    rStripeLeft(C1,X,100, colour);
  }
  else{
    rStripeRight(C1,X,100, colour);
  }
}
