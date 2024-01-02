import { ref } from 'vue';

const PluginCore = {
    show: ref(false),

    open() {
        window.dispatchEvent(new Event('modal-open'));
    },

    close() {
        window.dispatchEvent(new Event('modal-close'));
    },
};

export default PluginCore;