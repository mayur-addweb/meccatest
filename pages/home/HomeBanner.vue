<template>
  <section class="home-banner">
    <carousel
      ref="bannercarousel"
      :dots="true"
      v-bind="carouselConfig"
      class="banner-slider"
    >
      <div class="item" v-for="item in slider" :key="item.image.url">
        <img class="slide-img" :src="item.image.url" :alt="item.image.alt" />
      </div>
      <template #customPaging="page" class="dots-wrapper">
        <div :id="`dot_${page}`" class="custom-dot"></div>
      </template>
    </carousel>
    <div class="banner-content">
      <div class="container" v-if="slider[imageIndex].title">
        <div class="wrap">
          <span class="subtitle text-uppercase">{{
            slider[imageIndex].heading
              ? slider[imageIndex].heading
              : "a decade of learning"
          }}</span>
          <h1 class="banner-title">{{ slider[imageIndex].title }}</h1>
          <p class="desc" v-html="slider[imageIndex].description.text"></p>
          <router-link
            :to="slider[imageIndex].cta.url"
            class="btn banner-btn btn-shadow"
            v-if="slider[imageIndex].cta && slider[imageIndex].cta.url"
          >
            <span v-if="slider[imageIndex].cta.label">{{
              slider[imageIndex].cta.label
            }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <i
      class="control prev"
      @click="
        slider[imageIndex - 1]
          ? prev('bannercarousel')
          : prevEnd('bannercarousel')
      "
    ></i>
    <i
      class="control next"
      @click="
        slider[imageIndex + 1]
          ? next('bannercarousel')
          : nextEnd('bannercarousel')
      "
    ></i>
  </section>
</template>

<script type="module">
import { defineComponent, ref, onMounted } from "@nuxtjs/composition-api";
import Carousel from "vue-slick-carousel";

export default defineComponent({
  name: "HomePage",
  props: {
    slider: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      carouselConfig: {
        infinite: true,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        speed: 300,
      },
    };
  },
  components: {
    Carousel,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, context) {

    const bannercarousel = ref(null);
    let imageIndex = ref(0);

    const next = () => {
      imageIndex.value += 1;
      bannercarousel.value.next();
    };

    const prev = () => {
      imageIndex.value -= 1;
      bannercarousel.value.prev();
    };

    const nextEnd = () => {
      imageIndex.value = 0;
      bannercarousel.value.next();
    };

    const prevEnd = () => {
      imageIndex.value = props.slider.length - 1;
      bannercarousel.value.prev();
    };

    onMounted(() => {
      const dotsWrapper = document.getElementsByClassName("slick-dots")[0];

      if (dotsWrapper) {
        dotsWrapper.style.display = "flex";
      }
    });

    return {
      next,
      prev,
      bannercarousel,
      imageIndex,
      nextEnd,
      prevEnd
    };
  },
});
</script>

<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: "";
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

#home {
  box-sizing: border-box;
  @include for-desktop {
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }

  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        --hero-item-wrapper-text-align: right;
        --hero-item-subtitle-width: 100%;
        --hero-item-title-width: 100%;
        --hero-item-wrapper-padding: var(--spacer-sm) var(--spacer-sm)
          var(--spacer-sm) var(--spacer-2xl);
      }
    }
  }
}

::v-deep .sf-hero__controls {
  --hero-controls-display: none;
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }

  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}

.new-collection {
  @media (max-width: 767px) {
    padding-top: 0;
  }
}

#layout {
  max-width: none;
}

.prev,
.next {
  &.is-brown {
    background-image: url(/assets/meccabook/slide-arrow-gold.svg);
  }

  @media (max-width: 767px) {
    top: 16%;
  }
}

.next {
  right: 0;
  transform: rotate(180deg);
}

.custom-dot {
  width: 14px;
  height: 14px;
  border: 1px solid #c6b075;
  border-radius: 50%;
  cursor: pointer;
}

.slick-active {
  .custom-dot {
    background-color: #c6b075;
  }
}

.event-block {
  .container {
    @media (max-width: 768px) {
      .next,
      .prev {
        display: none;
      }
    }
  }
}

.home-banner .slide-img {
  height: 600px;
  width: 100vw;
  opacity: 0.8;

  @media (max-width: 1152px) {
    height: 480px;
  }

  @media (max-width: 768px) {
    height: 320px;
  }

  @media (max-width: 375px) {
    height: 270px;
  }
}

.content-blog .subtitle {
  margin-bottom: 30px;
}

.content-blog p.desc {
  margin-bottom: 30px;
}

.feature-homeblog {
  .feature-block {
    padding-top: 50px;
    border-top: 1px solid #c6b075;
  }
}

.related-product-sec {
  @media only screen and (min-width: 1200px) {
    .container {
      width: 1260px;
    }
  }
}
.related-slider {
  display: flex;
}
.slick-track[data-v-e4caeaf8] {
  display: flex !important;
}
i.control.prev {
  @media only screen and (min-width: 768px) {
    margin-left: 50px;
  }
  @media only screen and (max-width: 767px) {
    margin-left: 20px;
  }
}
i.control.next {
  @media only screen and (min-width: 768px) {
    margin-right: 50px;
  }
  @media only screen and (max-width: 767px) {
    margin-right: 20px;
  }
}
</style>