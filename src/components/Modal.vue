<template>
    <Container v-if="show">
        <Dialog
            ref="dialog"
            :name="name"
            :title="title"
            :draggable="draggable"
            :resizable="resizable"
            :width="width"
            :height="height"
            :background-color="background"
            :buttons="buttons"
            :fullscreen="fullscreen"
            :close-button-text="closeButtonText"
            :top-close-icon-container-class="topCloseIconContainerClass"
            :top-close-icon-class="topCloseIconClass"
            :bottom-buttons-container-class="bottomButtonsContainerClass"
            @before-open="executeCallback"
            @after-open="executeCallback"
            @before-close="executeCallback"
            @after-close="executeCallback"
            @on-submit="executeCallback"
        >
            <template #title>
                <slot name="title"></slot>
            </template>
            <template #content>
                <slot name="content"></slot>
            </template>
        </Dialog>
    </Container>
</template>
<script>
import Dialog from '../components/Dialog.vue';
import Container from '../components/Container.vue';
import PluginCore from '../PluginCore';

export default {
    name: 'LightModal',
    data() {
      return {
          show: PluginCore.modals[this.$props.name] || false,
      }
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        bottomButtonsContainerClass: {
            type: String,
            default: ''
        },
        submitFormBeforeClose: {
            type: Boolean,
            default: true,
        },
        closeModalOnEscape: {
            type: Boolean,
            default: false,
        },
        topCloseIconContainerClass: {
            type: String,
            default: ''
        },
        topCloseIconClass: {
            type: String,
            default: ''
        },
        closeButtonText: {
            type: String,
            default: 'Close'
        },
        buttons: {
            type: Array,
        },
        background: {
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
            type: String,
            default: '350px',
        },
        width: {
            type: String,
            default: '400px',
        },
        fullscreen: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        Container,
        Dialog,
    },
    created() {
        if (this.closeModalOnEscape) {
            window.addEventListener('keydown', this.handleEscKey);
        }
        window.addEventListener('modal-open', this.open);
        window.addEventListener('modal-close', this.close);
    },
    methods: {
        handleEscKey(event) {
            if (event.key === 'Escape') {
                PluginCore.close(this.name)
            }
        },
        open(event) {
            const name = event.detail.name;

            if (name === this.name) {
                if (!this.isWidthOrHeightValid(this.width) || !this.isWidthOrHeightValid(this.height)) {
                    throw new Error('Width and height value must be specified in percentages (%) or pixels (px).');
                }

                this.$emit("before-open");
                this.show = true;
                this.$emit("after-open");
            }
        },
        isWidthOrHeightValid(value) {
            if (typeof value === 'number') {
                return true;
            } else if (typeof value === 'string') {
                return value.endsWith('%') || value.endsWith('px');
            }
            return false;
        },
        close(event) {
            const name = event.detail.name;

            if (name === this.name) {
                const forms = this.$refs.dialog?.$el?.querySelectorAll('form');

                if (forms && forms.length > 0) {
                    let isValid = true;

                    forms.forEach((form) => {
                        if (this.submitFormBeforeClose) {
                            if (!form.checkValidity()) {
                                form.reportValidity();
                                isValid = false;
                            }
                        }
                    });

                    if (isValid) {
                        if (this.submitFormBeforeClose) {
                        forms.forEach((form) => {
                            form.submit();
                        });
                        }

                        this.show = false;
                        this.$emit("on-submit");
                    }
                } else {
                    this.$emit("before-close");
                    this.show = false;
                    this.$emit("after-close");
                }
            }
        },
        executeCallback(callback) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        },
    },
    destroyed() {
        if (this.closeModalOnEscape) {
            window.removeEventListener('keydown', this.handleEscKey);
        }
        window.removeEventListener('modal-open', this.open);
        window.removeEventListener('modal-close', this.close);
    },
};
</script>