"use strict";
var Color = /** @class */ (function () {
    function Color(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }
    Color.prototype.toString = function () {
        // return `hsl(${Math.round(this.h)}, ${Math.round(this.s)}%, ${Math.round(this.l)}%)`
        return "hsl(".concat(this.h.toFixed(2), ", ").concat(this.s.toFixed(2), "%, ").concat(this.l.toFixed(2), "%)");
    };
    return Color;
}());
var Step = /** @class */ (function () {
    function Step(x, y, previousRoute) {
        this.x = x;
        this.y = y;
        var lastStep = previousRoute[previousRoute.length - 20];
        this.dx = lastStep ? this.x - lastStep.x : 0;
        this.dy = lastStep ? this.y - lastStep.y : 0;
        this.speed = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
        this.directionRadians = Math.atan2(this.dy, this.dx);
    }
    Step.prototype.getDirectionDegrees = function () {
        return (360 + 180 * this.directionRadians / Math.PI) % 360;
    };
    return Step;
}());
var route = [];
var mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
    document.body.style.cursor = 'grabbing';
};
document.body.onmouseup = function () {
    --mouseDown;
    document.body.style.cursor = 'grab';
};
function updateDisplay(gradient) {
    document.getElementById('display').innerHTML = "<h2>".concat(gradient, "</h2>");
}
document.addEventListener('mousemove', function (e) {
    if (mouseDown) {
        var lastStep = route[route.length - 20];
        var step = new Step(e.clientX, e.clientY, route);
        route.push(step);
        var px = e.clientX / window.innerWidth * 100;
        var py = e.clientY / window.innerHeight * 100;
        var color = new Color(step.getDirectionDegrees(), px, py);
        var altColor = new Color(lastStep && lastStep.getDirectionDegrees() || 0, px, py);
        var gradient = "radial-gradient(circle, ".concat(color, ", ").concat(altColor, ")");
        this.body.style.background = gradient;
        updateDisplay(gradient);
        console.log(gradient);
    }
});
//# sourceMappingURL=app.js.map