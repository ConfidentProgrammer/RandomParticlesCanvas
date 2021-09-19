let canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');
let mouse = {
    x: undefined,
    y: undefined
}

//event listener
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

c.shadowColor = "black";
class Circle {
    constructor(x, y, dx, dy, color, radius) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.color = color;
        this.dx = dx;
        this.radius = radius;

    }


    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {

        this.draw();
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }

        this.y += this.dy;
        this.x += this.dx;

        //molecule big
        if (mouse.x - this.x <= 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 40) {
                this.radius += 1;
            }

        } else if (this.radius > 2) {
            this.radius -= 1;
        }
    }



}
let circles = [];
let colors = ['#1e3d59', '#f5f0e1', '#ff6e40', '#ffc13b']
for (let i = 0; i < 2000; ++i) {
    let r = Math.random() * 4 + 1;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dx = Math.random() * 1;
    let dy = Math.random() * 1;
    circles.push(new Circle(x, y, dx, dy, colors[Math.floor(Math.random() * 4)], r));
}




function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    for (let i = 0; i < circles.length; ++i) {
        circles[i].update();
    }

}
animate();