  <template>

    <div class="events-sliders">
        <template v-if="sliderCount > 0">
          <carousel ref="eventcarousel"
            :dots="false"
            :fade="true"
            :infinite="false"
            :speed="500"
            :slidesToShow="1"
            :slidesToScroll="1"
            lazyLoad="ondemand"
            >

          <template v-for="(item, index) in sliderParts">
            <div class="event-slider" :key="index" v-if="item <= sliderCount">
                  <div  class="event-item">
                    <div
                      class="d-md-flex align-items-start justify-content-between"
                    >
                      <div class="event-detail d-lg-flex">
                        <router-link
                          :to="'/events/'+events[(index*4)].id"
                          class="move-pro-detail"
                        ></router-link>
                        <div class="ev-view">
                          <img :src="events[(index*4)].image.url" :alt="events[(index*4)].image.alt" />
                        </div>
                        <div class="detail">
                          <h4 class="event-title">
                            {{events[(index*4)].title}}
                          </h4>
                          <span class="sub-title d-block">
                            {{events[(index*4)].sub_title}}
                          </span>
                          <p class="ev-desc" v-html="events[(index*4)].description.text">
                          </p>
                        </div>
                      </div>
                      <div class="event-post">
                        <div class="post d-flex align-items-center"  v-if="typeof(events[(index*4)+1]) !== 'undefined'" >
                          <router-link
                            :to="'/events/'+events[(index*4)+1].id"
                            class="move-pro-detail"
                          ></router-link>
                          <div class="view">
                            <img
                              :src="events[(index*4)+1].image.url"
                              :alt="events[(index*4)+1].image.alt"
                            />
                          </div>
                          <div class="detail">
                            <h4 class="event-title">
                              {{events[(index*4)+1].title}}
                            </h4>
                            <span class="sub-title d-block">
                              {{events[(index*4)+1].sub_title}}
                            </span>
                          </div>
                        </div>
                        <div class="post d-flex align-items-center"  v-if="typeof(events[(index*4)+2]) !== 'undefined'">
                          <router-link
                            :to="'/events/'+events[(index*4)+2].id"
                            class="move-pro-detail"
                          ></router-link>
                          <div class="view">
                            <img
                              :src="events[(index*4)+2].image.url"
                              :alt="events[(index*4)+2].image.alt"
                            />
                          </div>
                          <div class="detail">
                            <h4 class="event-title">
                            {{events[(index*4)+2].title}}
                            </h4>
                            <span class="sub-title d-block">
                              {{events[(index*4)+2].sub_title}}
                            </span>
                          </div>
                        </div>
                        <div class="post d-flex align-items-center"   v-if="typeof(events[(index*4)+3]) !== 'undefined'">
                          <router-link
                            :to="'/events/'+events[(index*4)+3].id"
                            class="move-pro-detail"
                          ></router-link>
                          <div class="view">
                            <img
                              :src="events[(index*4)+3].image.url"
                              :alt="events[(index*4)+3].image.alt"
                            />
                          </div>
                          <div class="detail">
                            <h4 class="event-title">
                              {{events[(index*4)+3].title}}
                            </h4>
                            <span class="sub-title d-block">
                              {{events[(index*4)+3].sub_title}}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </template>


          <!-- <div class="event-slider">
            <div  class="event-item">
              <div
                class="d-md-flex align-items-start justify-content-between"
              >
                <div class="event-detail d-lg-flex">
                  <router-link
                    to="/"
                    class="move-pro-detail"
                  ></router-link>
                  <div class="ev-view">
                    <img src="/meccabook/n1.jpeg" alt="placeholder" />
                  </div>
                  <div class="detail">
                    <h4 class="event-title">
                      name 2
                    </h4>
                    <span class="sub-title d-block">
                      title
                    </span>
                    <p class="ev-desc">
                      main description
                    </p>
                  </div>
                </div>
                <div class="event-post">
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to=""
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/leatest-child-1.png"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                      title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="event-slider">
            <div  class="event-item">
              <div
                class="d-md-flex align-items-start justify-content-between"
              >
                <div class="event-detail d-lg-flex">
                  <router-link
                    to="/"
                    class="move-pro-detail"
                  ></router-link>
                  <div class="ev-view">
                    <img src="/meccabook/n1.jpeg" alt="placeholder" />
                  </div>
                  <div class="detail">
                    <h4 class="event-title">
                      name 3
                    </h4>
                    <span class="sub-title d-block">
                      title
                    </span>
                    <p class="ev-desc">
                      main description
                    </p>
                  </div>
                </div>
                <div class="event-post">
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to=""
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/leatest-child-1.png"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                      title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="event-slider">
            <div  class="event-item">
              <div
                class="d-md-flex align-items-start justify-content-between"
              >
                <div class="event-detail d-lg-flex">
                  <router-link
                    to="/"
                    class="move-pro-detail"
                  ></router-link>
                  <div class="ev-view">
                    <img src="/meccabook/n1.jpeg" alt="placeholder" />
                  </div>
                  <div class="detail">
                    <h4 class="event-title">
                      name 4
                    </h4>
                    <span class="sub-title d-block">
                      title
                    </span>
                    <p class="ev-desc">
                      main description
                    </p>
                  </div>
                </div>
                <div class="event-post">
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to=""
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/leatest-child-1.png"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                      title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="event-slider">
            <div  class="event-item">
              <div
                class="d-md-flex align-items-start justify-content-between"
              >
                <div class="event-detail d-lg-flex">
                  <router-link
                    to="/"
                    class="move-pro-detail"
                  ></router-link>
                  <div class="ev-view">
                    <img src="/meccabook/n1.jpeg" alt="placeholder" />
                  </div>
                  <div class="detail">
                    <h4 class="event-title">
                      name 5
                    </h4>
                    <span class="sub-title d-block">
                      title
                    </span>
                    <p class="ev-desc">
                      main description
                    </p>
                  </div>
                </div>
                <div class="event-post">
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to=""
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/leatest-child-1.png"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                      title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                  <div
                    class="post d-flex align-items-center"
                  >
                    <router-link
                      to="/"
                      class="move-pro-detail"
                    ></router-link>
                    <div class="view">
                      <img
                        src="/meccabook/post-img.jpg"
                        alt="placeholder"
                      />
                    </div>
                    <div class="detail">
                      <h4 class="event-title">
                        title
                      </h4>
                      <span class="sub-title d-block">
                        title
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          </carousel>
          <div class="showmore-card-btn">
            <div class="show-more">
              <span class="slideEvent">Other Events</span>
            </div>
          </div>
        </template>
    </div>


</template>


<script>
import Carousel from "vue-slick-carousel";

import { computed, ref } from "@nuxtjs/composition-api";

export default {
  name: "eventsslider",
  data() {
    return {
      sliderCount: 0,
      sliderParts: []
    }
  },
  props: {
    events: {
      type: [Array, Object],
      default: null,
    },
  },
  components: {
    Carousel,
  },
  setup(props) {
    const carouselConfig = ref({
    });

    const eventcarousel = ref(null);
    let eventIndex = ref(0);
    const eventData = props.events;
    const rotationFactor = ref(4);


    const prevEvent = () => {
      eventIndex.value -= 4;
      eventcarousel.value.prev();
    };

    const nextEvent = () => {
      eventIndex.value += 4;
      eventcarousel.value.next();
    };

    const isNextArrowVisible = computed(() => {
      return eventIndex.value + rotationFactor.value >= eventData.length
        ? false
        : true;
    });
    const isPrevArrowVisible = computed(() => {
      return eventIndex.value >= rotationFactor.value ? true : false;
    });

    return {
      carouselConfig,
      eventcarousel,
      prevEvent,
      nextEvent,
      eventIndex,
      isNextArrowVisible,
      isPrevArrowVisible,
      eventData,
    };
  },
  async mounted() {
    await this.$nextTick();

  },
  async created() {
    await this.$nextTick();
    this.sliderCount = Math.ceil(this.events.length / 4);
    this.sliderParts = Array.from({length: this.sliderCount}, (_, i) => i + 1);

  },
  methods: {
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.prev {
  background: url(/meccabook/prev-event.png) no-repeat center center;

  @media all and (max-width: 767px) {
    left: 35%;
  }
  @media all and (max-width: 460px) {
    left: 27%;
  }
}
.next {
  background: url(/meccabook/next-event.png) no-repeat center center;
  transform: unset;
  @media all and (max-width: 767px) {
    right: 35%;
  }
  @media all and (max-width: 460px) {
    right: 27%;
  }
}
.control {
  @media all and (max-width: 991px) {
    top: 33%;
  }
  @media all and (max-width: 767px) {
    top: 88%;
  }
}
.event-item {
    padding: 0;
  @media all and (max-width: 767px) {
    padding: 0 21px;
  }
}
.event-detail,
.event-post .post {
  position: relative;
}
</style>
