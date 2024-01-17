import { ref } from 'vue';

const PluginCore = {
    modals: {},
    show: ref(false),

    open(name) {
        PluginCore.modals = {
            ...PluginCore.modals,
            [name]: true,
        };
        window.dispatchEvent(new CustomEvent('modal-open', { detail: { name } }));
    },
    close(name) {
        PluginCore.modals = {
            ...PluginCore.modals,
            [name]: false,
        };
        window.dispatchEvent(new CustomEvent('modal-close', { detail: { name } }));
    },
    closeAll() {
        for (const modalName in PluginCore.modals) {
            if (PluginCore.modals.hasOwnProperty(modalName)) {
                PluginCore.modals[modalName] = false;
                window.dispatchEvent(new CustomEvent('modal-close', { detail: { name: modalName } }));
            }
        }
    }
};

export default PluginCore;