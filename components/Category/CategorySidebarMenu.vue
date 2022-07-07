<template>
  <div>
    <slot
      v-if="loading"
      name="loading"
      :loading="loading"
    />

    <slot
      v-else
      name="category"
      :category-tree="categoryTree"
      :active-category="activeCategory"
    >
    <div class="category-menu">
    <h2 class="fl-title"
     :class="$route.path.includes('kids') ? 'fl-title-kids' : ''">Categories</h2>
      <div
        v-for="(cat, i) in categoryTree && categoryTree.items"
        :key="i"
        :header="cat.label"
      >
        <AwList class="list" v-if="i==0">
          <AwListItem
            v-for="(subCat, j) in cat.items"
            :key="j"
            class="list__item"
          >
            <template>
              <AwAccordion
                :open="activeCategory"
                :show-chevron="true"
                v-if="subCat.items.length > 0"
              >
                <AwMenuItem
                  :count="subCat.count || ''"
                  :label="subCat.label">

                <template #label="{ label }">
                  <nuxt-link
                    :to="localePath(th.getAgnosticCatLink(subCat))"
                    :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                  >
                    {{ label }}
                  </nuxt-link>
                </template>
                </AwMenuItem>
                <AwAccordionItem>
                <AwMenuItem
                  v-for="(subSubCat, z) in subCat.items && subCat.items"
                  :key="z"
                  :count="subSubCat.count || ''"
                  :label="subSubCat.label"
                  class="list__item__sub"
                >
                  <template #label="{ label }">
                    <nuxt-link
                      :to="localePath(th.getAgnosticCatLink(subSubCat,subCat))"
                      :class="subSubCat.isCurrent ? 'sidebar--cat-selected' : ''"
                    >
                      {{ label }}
                    </nuxt-link>
                  </template>
                </AwMenuItem>
                </AwAccordionItem>
              </AwAccordion>
              <AwMenuItem
                  :count="subCat.count || ''"
                  :label="subCat.label" v-else>

                <template #label="{ label }">
                  <nuxt-link
                    :to="localePath(th.getAgnosticCatLink(subCat))"
                    :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                  >
                    {{ label }}
                  </nuxt-link>
                </template>
                </AwMenuItem>
            </template>
          </AwListItem>
        </AwList>
      </div>
    </div>
    </slot>
  </div>
</template>

<script>
import findDeep from 'deepdash/findDeep';
import {
  // SfList,
  // SfMenuItem,
  SfDivider,
  SfFilter,
  SfSelect,
  SfColor,
  SfRadio,
  SfHeading,
  SfButton

} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  ref,
} from '@nuxtjs/composition-api';
import {
  categoryGetters,
  useCategory,
  useFacet,
  facetGetters,
} from '@vue-storefront/magento';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import { useUrlResolver } from '~/composables/useUrlResolver.ts';
import { useUiHelpers } from '~/composables';
import AwAccordion from '../../pages/AwComponents/accordion/AwAccordion.vue'
import AwAccordionItem from '../../pages/AwComponents/accordion/AwAccordionItem.vue'
import AwList from '../../pages/AwComponents/molecules/AwList.vue'
import AwMenuItem from '../../pages/AwComponents/molecules/AwMenuItem.vue'

export default defineComponent({
  name: 'CategorySidebarMenu',
  components: {
    AwList,
    AwMenuItem,
    AwAccordion,
    AwAccordionItem,
    SfDivider,
    SfFilter,
    SfSelect,
    SfColor,
    SfRadio,
    SfHeading,
    SfButton
  },
  props: {
    resolveUrl: Boolean,
    noFetch: Boolean,
  },
  setup(props) {
    const th = useUiHelpers();
    const {
      $magento: { config: magentoConfig },
    } = useVSFContext();
    const {
      path,
      search: resolveUrl,
    } = useUrlResolver();
    const {
      categories,
      search,
      loading,
    } = useCategory(`categoryList:${path}`);
    const uiHelpers = useUiHelpers();

    const { result } = useFacet(`facetId:${path}`);

    const categoryTree = computed(() => categoryGetters.getCategoryTree(
      categories.value?.[0],
      result.value?.entity_uid,
      false,
    ));

    const activeCategory = computed(() => {
      const items = categoryTree.value?.items;

      if (!items) {
        return '';
      }
      const categoryLabel = ref();
      const parent = findDeep(items, (value, key, parentValue, _deepCtx) => {
        if (key === 'isCurrent' && value) {
          // eslint-disable-next-line no-underscore-dangle
          categoryLabel.value = _deepCtx.obj[_deepCtx._item.path[0]].label;
        }
        return key === 'isCurrent' && value;
      });

      return categoryLabel.value || parent?.category?.label || items[0]?.label;
    });

    const facets = computed(() =>
      facetGetters.getGrouped(result.value, magentoConfig.facets.available)
    );


    const isFilterSelected = (facet, option) => {
      if (facet.id === "price") {
        return selectedFilters.value[facet.id];
      }
      return (selectedFilters.value[facet.id] || []).includes(option.value);
    };

    const selectFilter = (facet, option) => {
      if (facet.id === "price") {
        selectedFilters.value[facet.id] = option.value;
        return;
      }

      if (!selectedFilters.value[facet.id]) {
        selectedFilters.value[facet.id] = [];
      }

      if (selectedFilters.value[facet.id].find((f) => f === option.value)) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
        ]?.filter((f) => f !== option.value);

        return;
      }

      selectedFilters.value[facet.id].push(option.value);
    };

    const selectedFilters = ref(
      Object.fromEntries(
        magentoConfig.facets.available.map((curr) => [
          curr,
          curr === "price" ? "" : [],
        ])
      )
    );

    const applyFilters = (filters) => {
      //toggleFilterSidebar();

      if (filters) {
        selectedFilters.value = filters;
      }

      uiHelpers.changeFilters(selectedFilters.value);
      changeFilters(selectedFilters.value);
    };


    onSSR(async () => {
      if (props.resolveUrl) {
        await resolveUrl();
      }

      if (!props.noFetch) {
        await search({
          pageSize: 20,
        });
      }
    });

    return {
      th,
      loading,
      categoryTree,
      activeCategory,
      uiHelpers,
      facets,
      isFilterSelected,
      selectFilter,
      selectedFilters,
      applyFilters
    };
  },
  data() {
    return {
      excludeCategory: ['MTAw', 'OTM=', 'MTU3', 'MTA3', 'MTAz']
    }
  }
});
</script>

<style lang="scss" scoped>
.sf-divider{
  margin-bottom: var(--spacer-xs);
}
.list {
  --menu-item-font-size: var(--font-size--sm);

  &__item {
    &:first-child {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    &:not(:last-of-type):not(:first-child){
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    &__sub {
      padding:var(--spacer-xs) 0  0 var(--spacer-sm);
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
</style>
