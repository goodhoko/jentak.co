
class Color {
    private h: number
    private s: number
    private l: number

    constructor(h: number, s: number, l: number) {
        this.h = h
        this.s = s
        this.l = l
    }

    public toString() {
        // return `hsl(${Math.round(this.h)}, ${Math.round(this.s)}%, ${Math.round(this.l)}%)`
        return `hsl(${this.h.toFixed(2)}, ${this.s.toFixed(2)}%, ${this.l.toFixed(2)}%)`

    }
}

class Step {
    // position
    private x: number
    private y: number
    // change in position aka speed for axies and composite
    private dx: number
    private dy: number
    private speed: number
    // direction from last step in radians 
    private directionRadians: number

    constructor(x: number, y: number, previousRoute: Array<Step>) {
        this.x = x
        this.y = y
        const lastStep: Step = previousRoute[previousRoute.length - 20]
        this.dx = lastStep ? this.x - lastStep.x : 0
        this.dy = lastStep ? this.y - lastStep.y : 0
        this.speed = Math.sqrt(this.dx ** 2 + this.dy ** 2)
        this.directionRadians = Math.atan2(this.dy, this.dx);
    }


    public getDirectionDegrees() {
        return (360 + 180 * this.directionRadians / Math.PI) % 360 
    }

}


const route: Array<Step> = []
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
  document.body.style.cursor = 'grabbing'
}
document.body.onmouseup = function() {
  --mouseDown;
  document.body.style.cursor = 'grab'
}

function updateDisplay(gradient: string) {
    document.getElementById('display')!.innerHTML = `<h2>${gradient}</h2>`
}

document.addEventListener('mousemove', function(e: MouseEvent) {
    if (mouseDown) {
        const lastStep = route[route.length - 20]
        const step = new Step(e.clientX, e.clientY, route)
        route.push(step)
        const px = e.clientX / window.innerWidth * 100
        const py = e.clientY / window.innerHeight * 100
    
        const color: Color = new Color(step.getDirectionDegrees(), px, py)
        const altColor = new Color(lastStep && lastStep.getDirectionDegrees() || 0, px, py)
        
        const gradient = `radial-gradient(circle, ${color}, ${altColor})`


        this.body.style.background = gradient
        updateDisplay(gradient)
        console.log(gradient)
    }
})
