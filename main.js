//calling on ids from HTML
let canvas = document.getElementById("canvas");
let btnstart = document.getElementById("start");

//calling on canvas drawing API
let ctx = canvas.getContext("2d");

//event listener to start race when button is clicked
btnstart.addEventListener("click", race);

//random number function
function random(min, max) {
  //return random value in range min - max
  return num = Math.floor(Math.random() * (max - min + 1)) + min;
}




//array created to place cars into to use for for loop on line 36
let cars = [];

let CarNum = [1, 2, 3, 4];

let win = [CarNum[0], CarNum[1], CarNum[2], CarNum[3]];

//function to specify car parameters if different from the constructor
function createCar() {

  fetch("https://www.colr.org/json/colors/random/15").then(function (response) {
    response.json().then(function (json) {

      if (ctx) {

        cars.push(new Car({
          number: CarNum[0],
          colour: "#" + json.colors[cars.length].hex,
          window: "#" + json.colors[cars.length + random(1, 15)].hex
        }));

        cars.push(new Car({
          y: 150,
          number: CarNum[1],
          colour: "#" + json.colors[cars.length].hex,
          window: "#" + json.colors[cars.length + random(1, 15)].hex
        }));

        cars.push(new Car({
          y: 300,
          number: CarNum[2],
          colour: "#" + json.colors[cars.length].hex,
          window: "#" + json.colors[cars.length + random(1, 15)].hex
        }));

        cars.push(new Car({
          y: 450,
          number: CarNum[3],
          colour: "#" + json.colors[cars.length].hex,
          window: "#" + json.colors[cars.length + random(1, 15)].hex
        }));

        // for loop to draw cars and place in array
        for (let i = 0; i < cars.length; i++) {
          cars[i].drawCar();
        }
      }
    });
  });
}

//defining the car object
class Car {
  //constructor to set parameters
  constructor(d) {
    this.x = (d && d.x) || 0;
    this.y = (d && d.y) || 0;
    this.speed = random(1, 5) || 10;
    this.height = (d && d.height) || 100;
    this.colour = (d && d.colour) || 'green';
    this.window = (d && d.window) || 'silver';
    this.number = (d && d.number) || 'NNF';
    this.finish = canvas.width || 700;

  }


  //drawCar car using constructor values unless otherwise specified
  drawCar() {

    //calculate size of squares
    let c = this.height / 10;

    // car body
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    //boot curve
    ctx.bezierCurveTo(this.x + (c * 2), this.y + (c * 10), this.x + (c * 1), this.y + (c * 8), this.x + (c * 2), this.y + (c * 6));
    ctx.lineTo(this.x + (c * 4), this.y + (c * 5));
    //back window curve
    ctx.bezierCurveTo(this.x + (c * 5), this.y + (c * 4), this.x + (c * 3), this.y + (c * 1), this.x + (c * 6), this.y + (c * 1));
    //front window curve
    ctx.bezierCurveTo(this.x + (c * 18), this.y + (c * 1), this.x + (c * 15), this.y + (c * 1), this.x + (c * 15), this.y + (c * 5));
    ctx.lineTo(this.x + (c * 19), this.y + (c * 5));
    //front bonnet curve
    ctx.bezierCurveTo(this.x + (c * 19), this.y + (c * 5), this.x + (c * 21), this.y + (c * 5), this.x + (c * 18), this.y + (c * 10));
    ctx.lineTo(this.x + (c * 17), this.y + (c * 10));
    ctx.lineTo(this.x + (c * 2), this.y + (c * 10));
    ctx.fill();

    // text box
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black 1px';
    ctx.font = '40px arial';
    ctx.fillText(this.number, this.x + (c * 8.5), this.y + (c * 8.5));
    ctx.strokeText(this.number, this.x + (c * 8.5), this.y + (c * 8.5));

    //window 1
    ctx.fillStyle = this.window;
    ctx.fillRect(this.x + (c * 5.5), this.y + (c * 2), (c * 3.5), (c * 3));

    //window 2
    ctx.fillStyle = this.window;
    ctx.fillRect(this.x + (c * 10), this.y + (c * 2), (c * 3.5), (c * 3));

    //Wheels
    ctx.fillStyle = 'black';
    this.drawWheel(this.x + (c * 6), this.y + (c * 10), c * 1.5);
    this.drawWheel(this.x + (c * 14), this.y + (c * 10), c * 1.5);

  }

  //drawCar wheels
  drawWheel(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 1 * Math.PI);
    ctx.fill();
  }


  move() {

    //increment velocity
    this.x += this.speed;
    // if car reaches end of canvas stop race and declare winner
    if (this.x + this.speed >= this.finish) {
      this.x = this.finish;
      this.speed = this.x;

      win.push(this.CarNum);

      alert(`Race Complete!\n\nThe winner is: Number ${win[this.number -1]}`);

      document.location.reload();
    }



  }

}



//for loop to start race and move cars
function race() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cars.length; i++) {
    cars[i].drawCar();
    cars[i].move();
  }

  requestAnimationFrame(race);

}

//loads cars up onto canvas
createCar();