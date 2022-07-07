<template>
  <div class="sf-accordion-item">
    <slot
      name="header"
      v-bind="{
        header,
        isOpen,
        accordionClick,
        showChevron: $parent.showChevron,
      }"
    >
      <AwButton
        :aria-pressed="isOpen.toString()"
        :aria-expanded="isOpen.toString()"
        :class="{ 'is-open': isOpen }"
        class="sf-button--pure sf-accordion-item__header"
        :data-testid="'accordion-item-' + header"
        @click="accordionClick"
      >
        {{ header }}
        <slot name="additional-info" />
        <AwChevron
          tabindex="0"
          class="sf-accordion-item__chevron"
          :class="{ 'sf-chevron--right': !isOpen }"
        />
      </AwButton>
    </slot>
    <SfExpand :transition="$parent.transition">
      <div :class="{ 'display-none': !isOpen }">
        <div class="sf-accordion-item__content">
          <slot />
        </div>
      </div>
    </SfExpand>
  </div>
</template>
<script>
import { focus } from "../utilities/directives";
import SfExpand from "../utilities/transitions/component/SfExpand";
import AwChevron from "../organisms/AwChevron.vue"
import AwButton from "../atoms/AwButton.vue";
export default {
  name: "AwAccordionItem",
  directives: { focus },
  components: {
    AwChevron,
    AwButton,
    SfExpand,
  },
  props: {
    header: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    accordionClick() {
      this.$parent.$emit("toggle", this._uid);
    },
  },
};
</script>
