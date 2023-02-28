class Sketchpad {
    constructor(container, onupdate = () => {
        return false;
    }, size = 400) {
        this.isDrawing = false;
        this.paths = [];
        this.size = size;
        this.onupdate = onupdate;

        this.canvas = document.createElement('canvas');

        this.canvas.width = this.size;
        this.canvas.height = this.size;

        this.ctx = this.canvas.getContext('2d');

        this.canvas.style.backgroundColor = 'white';
        this.canvas.style.border = '1px solid black';
        container.appendChild(this.canvas);

        container.appendChild(document.createElement('br'));

        this.undoButton = document.createElement('button');
        this.undoButton.innerText = 'Undo';
        this.undoButton.disabled = true;
        container.appendChild(this.undoButton);

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousemove = (e) => {
            if (!this.isDrawing) return;

            const mouse = this.#getMouse(e);

            const lastPath = this.paths[this.paths.length - 1];

            lastPath.push(mouse);
            this.#redraw();
        };

        this.canvas.onmousedown = (e) => {
            const mouse = this.#getMouse(e);
            this.paths.push([mouse]);
            this.isDrawing = true;
        };

        document.onmouseup = () => {
            this.isDrawing = false;
            this.undoButton.disabled = this.paths.length <= 0;
        };

        this.canvas.ontouchstart = (e) => {
            const loc = e.touches[0];
            // noinspection JSCheckFunctionSignatures
            this.canvas.onmousedown(loc);
        };

        this.canvas.ontouchmove = (e) => {
            const loc = e.touches[0];
            // noinspection JSCheckFunctionSignatures
            this.canvas.onmousemove(loc);
        };

        document.ontouchend = () => {
            document.onmouseup(undefined);
        };

        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#redraw();
            this.undoButton.disabled = this.paths.length <= 0;
        };
    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Draw.paths(this.ctx, this.paths);
        this.triggerUpdate();
    }

    #getMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }

    clear() {
        this.paths = [];
        this.#redraw();
        this.undoButton.disabled = true;
    }

    triggerUpdate() {
        if (this.onupdate)
            this.onupdate(this.paths);
    }
}
