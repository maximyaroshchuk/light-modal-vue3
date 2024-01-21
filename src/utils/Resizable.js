export default class Resizable {
    constructor(element, resizerElement, options = {}) {
        this.element = element;
        this.resizer = resizerElement;
        this.options = Object.assign({
            minWidth: 0,
            minHeight: 0
        }, options);
        this.isResizing = false;
        this.startResizeX = 0;
        this.startResizeY = 0;

        this.resizer.addEventListener('mousedown', this.startResize.bind(this));
        document.addEventListener('mousemove', this.handleResize.bind(this));
        document.addEventListener('mouseup', this.stopResize.bind(this));
    }

    startResize(event) {
        this.isResizing = true;
        this.startResizeX = event.clientX;
        this.startResizeY = event.clientY;
    }

    handleResize(event) {
        if (this.isResizing) {
            const deltaX = event.clientX - this.startResizeX;
            const deltaY = event.clientY - this.startResizeY;

            const newWidth = this.element.offsetWidth + deltaX;
            const newHeight = this.element.offsetHeight + deltaY;

            this.setSize(newWidth, newHeight);
            this.startResizeX = event.clientX;
            this.startResizeY = event.clientY;

            this.centerModal();
        }
    }

    setSize(width, height) {
        this.element.style.width = `${Math.max(width, this.options.minWidth)}px`;
        this.element.style.height = `${Math.max(height, this.options.minHeight)}px`;
    }

    centerModal() {
        const { offsetWidth, offsetHeight } = this.element;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const newLeft = Math.max((windowWidth - offsetWidth) / 2, 0);
        const newTop = Math.max((windowHeight - offsetHeight) / 2, 0);

        this.element.style.left = `${newLeft}px`;
        this.element.style.top = `${newTop}px`;
    }

    stopResize() {
        this.isResizing = false;
    }
}
