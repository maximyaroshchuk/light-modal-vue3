import Modal from './components/Modal.vue';
import PluginCore from "./PluginCore";

const install = (app) => {
    app.component('l-modal', Modal);

    app.config.globalProperties.$modals = {
        open(name) {
            PluginCore.open(name);
        },
        close(name) {
            PluginCore.close(name);
        },
        closeAll(name) {
            PluginCore.closeAll(name);
        }
    };
};

export const LightModalPlugin = {
    install,
    component: Modal,
};

export default LightModalPlugin;
