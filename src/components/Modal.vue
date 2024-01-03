<template>
    <Container v-if="show">
        <Dialog
            ref="dialog"
            :title="title"
            :draggable="draggable"
            :resizable="resizable"
            :width="width"
            :height="height"
            :background-color="backgroundColor"
            :buttons="buttons"
            :close-button-text="closeButtonText"
            :top-close-icon-container-class="topCloseIconContainerClass"
            :close-icon-class="closeIconClass"
            :buttons-container-class="buttonsContainerClass"
        >
            <template v-slot:content>
                <slot name="content"></slot>
            </template>
        </Dialog>
    </Container>
</template>
<script>
import Dialog from '../components/Dialog.vue';
import Container from '../components/Container.vue';
import pluginCore from '../PluginCore';

export default {
    name: 'LightModal',
    data() {
      return {
          show: true
      }
    },
    props: {
        buttonsContainerClass: {
            type: [Array, Object],
            default() {
                return [];
            },
        },
        topCloseIconContainerClass: {
            type: String,
        },
        closeIconClass: {
            type: String,
        },
        closeButtonText: {
            type: String,
            default: 'Close'
        },
        buttons: {
            type: Array,
            default() {
                return [];
            },
        },
        backgroundColor: {
            type: String,
            default: '#ffffff'
        },
        title: {
            type: String
        },
        draggable: {
            type: Boolean,
            default: false,
        },
        resizable: {
            type: Boolean,
            default: false,
        },
        height: {
            type: Number,
            default: 350,
        },
        width: {
            type: Number,
            default: 400,
        }
    },
    components: {
        Container,
        Dialog,
    },
    created() {
        window.addEventListener('modal-open', this.open);
        window.addEventListener('modal-close', this.close);
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
    },
    computed: {
        pluginCore() {
            return pluginCore;
        },
    },
    destroyed() {
        window.removeEventListener('modal-open', this.open);
        window.removeEventListener('modal-close', this.close);
    },
};
</script>