<template>
  <div class="category-block">
    <AwBar
      :back="isActive"
      :title="active ? active : title"
      class="smartphone-only"
      @click:back="updatePage()"
    />
    <section
      :class="{ 'is-active': isActive }"
    >
  <h2 class="myAccount-title">{{ title }}</h2>
    <div class="row">
      <div class="col-lg-3">
        <div
          v-for="(category, key) in categories"
          :key="`${category.title}-${key}`"
        >
          <h2
            :class="{ 'display-none': !category.title }"
            class="sf-content-pages__category-title"
          >
            {{ category.title }}
          </h2>
           <AwList class="account-menu">
            <AwListItem
              v-for="(page, itemKey) in category.items"
              :key="`${page.title}-${itemKey}`"
              class="ac-nm"
            >
              <slot name="menu-item" v-bind="{ updatePage, page, active }">
                 <AwMenuItem
                  :class="{ 'is-active': isPageActive(page) }"
                  :label="page.title"
                  class="sf-content-pages__menu"
                  @click="updatePage(page.title)"
                > 
                   <!-- <template #icon>
                    <SfIcon
                      :class="{ 'display-none': !page.icon }"
                      :icon="page.icon"
                      class="sf-menu-item__icon"
                      color="#686d7d"
                      size="xxs"
                    />
                  </template>  -->
                </AwMenuItem>
              </slot>
            </AwListItem>
          </AwList>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="sf-content-pages__content">
        <slot />
      </div>
      </div>
    </div>
    </section>
  </div>
</template>
<script>
import Vue from "vue";
import AwContentPage from "./AwContentPage.vue";
Vue.component("AwContentPage", AwContentPage);
// Vue.component("SfContentCategory", SfContentCategory);
import AwBar from '../molecules/AwBar.vue'
import AwList from '../molecules/AwList.vue'
import AwListItem from '../molecules/AwListItem.vue'
import AwMenuItem from '../molecules/AwMenuItem.vue'
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "../utilities/mobile-observer";
export default {
  name: "AwContentPages",
  components: {
    AwBar,
    AwList,
    AwListItem,
    AwMenuItem
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    active: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapMobileObserver(),
    categories() {
      const items = [];
      const orphans = { items: [] };
      const reduceOrphans = () => {
        if (orphans.items.length > 0) {
          const category = { ...orphans };
          items.push(category);
          orphans.items = [];
        }
      };
      this.items.forEach((item) => {
        if (item.items) {
          reduceOrphans();
          const category = { ...item };
          items.push(category);
          return;
        }
        orphans.items.push(item);
      });
      reduceOrphans();
      return items;
    },
    isActive() {
      return this.active.length > 0;
    },
  },
  provide() {
    const provided = {};
    Object.defineProperty(provided, "active", {
      get: () => this.active,
    });
    return { provided };
  },
  watch: {
    isMobile(mobile) {
      if (mobile) {
        this.$emit("click:change", "");
        return;
      }
      this.$emit("click:change", this.categories[0].items[0].title);
    },
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
  methods: {
    updatePage(title) {
      this.$emit("click:change", title);
    },
    isPageActive(page) {
      return page.title.toLowerCase() === this.active.toLowerCase();
    },
  },
};
</script>

<style scoped>
/* .sf-content-pages__content {
  padding-top: 75px;
} */
</style>