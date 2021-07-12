


const Cursor = function(getA, color) {
    const node = document.createElement('div');
    node.style.backgroundColor = color;
    node.style.position = 'absolute';
    document.body.appendChild(node);


    this.follow = function(e) {
        const a = getA();
        const b = {x: e.pageX, y: e.pageY};

        // TODO set proper corner coordinates a/b order agnostic
        node.style.left = a.x;
        node.style.top = a.y;
        node.style.width = b.x;
        node.style.height = b.y;
    };
};

const top_left = new Cursor(() => ({x: 0, y: 0}), 'black');
const bottom_right = new Cursor(() => ({x: window.innerWidth, y: window.innerHeight}), 'black');

window.onmousemove = (event) => {
    top_left.follow(event);
    bottom_right.follow(event);
}

