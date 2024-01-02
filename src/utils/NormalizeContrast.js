import namedColors from './namedColors';
export default class NormalizeContrast {
    constructor(color) {
        this.color = this.normalizeColor(color);
        this.luminance = this.calculateLuminance();
        this.contrastColor = this.calculateContrastColor();
    }

    normalizeColor(color) {
        if (color.startsWith("#") && (color.length === 4 || color.length === 7)) {
            return color;
        }

        const namedColor = namedColors[color.toLowerCase()];
        if (namedColor) {
            return namedColor;
        }

        const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
        if (match) {
            const [, r, g, b] = match;
            return `#${parseInt(r).toString(16).padStart(2, "0")}${parseInt(g).toString(16).padStart(2, "0")}${parseInt(b).toString(16).padStart(2, "0")}`;
        }

        throw new Error("Invalid color format");
    }

    calculateLuminance() {
        const r = parseInt(this.color.slice(1, 3), 16);
        const g = parseInt(this.color.slice(3, 5), 16);
        const b = parseInt(this.color.slice(5, 7), 16);

        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }

    calculateContrastColor() {
        return this.luminance > 0.5 ? 'light' : 'dark';
    }

    getContrastColor() {
        return this.contrastColor;
    }
}
