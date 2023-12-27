export default class Draggable {
    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        this.isDragging = false;
        this.startDragX = 0;
        this.startDragY = 0;
        
        this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleDrag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));
    }

    handleMouseDown(event) {
        if (event.target.classList.contains('light-modal-content-title')) {
            this.isDragging = true;
            this.startDragX = event.clientX - this.element.offsetLeft;
            this.startDragY = event.clientY - this.element.offsetTop;
        }
    }

    handleDrag(event) {
        if (this.isDragging) {
            const newLeft = event.clientX - this.startDragX;
            const newTop = event.clientY - this.startDragY;

            const maxX = window.innerWidth - this.element.clientWidth;
            const maxY = window.innerHeight - this.element.clientHeight;

            this.element.style.left = `${Math.min(Math.max(newLeft, 0), maxX)}px`;
            this.element.style.top = `${Math.min(Math.max(newTop, 0), maxY)}px`;
        }
    }

    stopDrag() {
        this.isDragging = false;
    }
}
