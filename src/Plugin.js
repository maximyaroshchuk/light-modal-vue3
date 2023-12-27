import Modal from './components/Modal.vue';
import PluginCore from "./PluginCore";

const install = (app) => {
    app.component('l-modal', Modal);

    app.config.globalProperties.$modal = {
        open() {
            PluginCore.open();
        },
        close() {
            PluginCore.close();
        },
    };
};

export const LightModalPlugin = {
    install,
    component: Modal,
};

export default LightModalPlugin;
