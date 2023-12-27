import { ref } from 'vue';

const PluginCore = {
    show: ref(false),
    buttons: [
        {
            text: 'Close',
            class: 'light-button-close',
            click: function () {
                PluginCore.close();
            },
        },
    ],

    open() {
        window.dispatchEvent(new Event('modal-open'));
    },

    close() {
        window.dispatchEvent(new Event('modal-close'));
    },
};

export default PluginCore;