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

        this.modalBody = document.querySelector('.light-modal-dialog');
        this.resizer.addEventListener('mousedown', this.startResize.bind(this));
        document.addEventListener('mousemove', this.handleResize.bind(this));
        document.addEventListener('mouseup', this.stopResize.bind(this));

        window.addEventListener('resize', this.handleWindowResize.bind(this));
    }

    startResize(event) {
        this.isResizing = true;
        this.startResizeX = event.clientX;
        this.startResizeY = event.clientY;
        this.modalBody.classList.add('resizing');
        this.currentWidth = this.element.offsetWidth;
        this.currentHeight = this.element.offsetHeight;
    }

    handleResize(event) {
        if (this.isResizing) {
            const deltaX = event.clientX - this.startResizeX;
            const deltaY = event.clientY - this.startResizeY;

            const newWidth = Math.min(
                Math.max(this.currentWidth + deltaX, this.options.minWidth),
                window.innerWidth
            );
            const newHeight = Math.min(
                Math.max(this.currentHeight + deltaY, this.options.minHeight),
                window.innerHeight
            );

            this.setSize(newWidth, newHeight);
            this.centerModal();
        }
    }

    setSize(width, height) {
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
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
        this.modalBody.classList.remove('resizing');
    }

    handleWindowResize() {
        const { offsetWidth, offsetHeight } = this.element;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const newWidth = Math.max(
            Math.min(windowWidth, offsetWidth),
            this.options.minWidth
        );
        const newHeight = Math.max(
            Math.min(windowHeight, offsetHeight),
            this.options.minHeight
        );

        this.setSize(newWidth, newHeight);
        this.centerModal();
    }
}
