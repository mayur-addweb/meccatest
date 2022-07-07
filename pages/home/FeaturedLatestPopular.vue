<template>
  <section class="feature-products">
    <div class="tab-content" id="myTabContent">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-if="featured">
          <button
            class="nav-link active kids-blue-link"
            id="home-tab"
            @click="select($event, 'featured')"
            >
          Featured
          </button>
        </li>
        <li class="nav-item" role="presentation" v-if="latest">
          <button
            class="nav-link"
            id="profile-tab"
            @click="select($event, 'latest')"
            >
          Latest
          </button>
        </li>
        <li class="nav-item" role="presentation" v-if="popular">
          <button
            class="nav-link kids-purple-link"
            id="profile-tab"
            @click="select($event, 'popular')"
            >
          Popular
          </button>
        </li>
      </ul>
      <div
        class="kn-carousel"
        >
        <div class="latest-slider" style="width: 100%;">
          <div
            class="latest-item d-md-flex flex-wrap align-items-center"
            :class="selectedTab === 'featured' ? 'active' : 'featured'"
            style="width:100%;"
            v-if="featuredData[0] && featuredData[0].data"
            >
            <div class="knowledge-info">
              <carousel
                ref="slider-1"
                v-bind="carouselConfig1"
                :focusOnSelect="true"
                @beforeChange="syncSliders"
                >
                <div class="knowledge-info-top" v-if="mainImage">
                  <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              ></a>
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              >
                {{
                  selectedImage
                    ? selectedImage.product_name
                    : mainImage.product_name
                }}
              </h2>
                  <span
                    class="publisher">{{
                  selectedImage
                    ? selectedImage.author_name !== false &&
                      selectedImage.author_name !== null
                      ? selectedImage.author_name
                      : ""
                    : mainImage.author_name !== false &&
                      mainImage.author_name !== null
                    ? mainImage.author_name
                    : ""
                }}</span>
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedImage === '' ? mainImage : selectedImage
                    )
                  "
                >
                  <del>{{
                    selectedImage
                      ? selectedImage.special_price !== "0.00"
                        ? "$" + selectedImage.price
                        : ""
                      : mainImage.special_price !== "0.00"
                      ? "$" + mainImage.price
                      : ""
                  }}</del
                  >${{
                    selectedImage
                      ? selectedImage.special_price !== "0.00"
                        ? selectedImage.special_price
                        : selectedImage.price
                      : mainImage.special_price !== "0.00"
                      ? mainImage.special_price
                      : mainImage.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedImage === '' ? mainImage : selectedImage
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedImage === '' ? mainImage : selectedImage
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedImage
                    ? selectedImage.short_description
                    : mainImage.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
                >
              <span>view</span>
              </a>
                </div>
                <div class="knowledge-info-top" v-if="mainImage2">
                  <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedImage2 === '' ? mainImage2 : selectedImage2
                  )
                "
              ></a>
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedImage2 === '' ? mainImage2 : selectedImage2
                  )
                "
              >
                {{
                  selectedImage2
                    ? selectedImage2.product_name
                    : mainImage2.product_name
                }}
              </h2>
                  <span
                    class="publisher">{{
                  selectedImage2
                    ? selectedImage2.author_name !== false &&
                      selectedImage2.author_name !== null
                      ? selectedImage2.author_name
                      : ""
                    : mainImage2.author_name !== false &&
                      mainImage2.author_name !== null
                    ? mainImage2.author_name
                    : ""
                }}</span>
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedImage2 === '' ? mainImage2 : selectedImage2
                    )
                  "
                >
                  <del>{{
                    selectedImage2
                      ? selectedImage2.special_price !== "0.00"
                        ? "$" + selectedImage2.price
                        : ""
                      : mainImage2.special_price !== "0.00"
                      ? "$" + mainImage2.price
                      : ""
                  }}</del
                  >${{
                    selectedImage2
                      ? selectedImage2.special_price !== "0.00"
                        ? selectedImage2.special_price
                        : selectedImage2.price
                      : mainImage2.special_price !== "0.00"
                      ? mainImage2.special_price
                      : mainImage2.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedImage2 === '' ? mainImage2 : selectedImage2
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedImage2 === '' ? mainImage2 : selectedImage2
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedImage2
                    ? selectedImage2.short_description
                    : mainImage2.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedImage2 === '' ? mainImage2 : selectedImage2
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedImage2 === '' ? mainImage2 : selectedImage2
                  )
                "
                >          
              <span>view</span>
              </a>
                </div>
                <div class="knowledge-info-top" v-if="mainImage3">
                  <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              ></a>
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedImage3 === '' ? mainImage3 : selectedImage3
                  )
                "
              >
                {{
                  selectedImage3
                    ? selectedImage3.product_name
                    : mainImage3.product_name
                }}
              </h2>
                  <span
                    class="publisher">{{
                  selectedImage3
                    ? selectedImage3.author_name !== false &&
                      selectedImage3.author_name !== null
                      ? selectedImage3.author_name
                      : ""
                    : mainImage3.author_name !== false &&
                      mainImage3.author_name !== null
                    ? mainImage3.author_name
                    : ""
                }}</span>
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedImage3 === '' ? mainImage3 : selectedImage3
                    )
                  "
                >
                  <del>{{
                    selectedImage3
                      ? selectedImage3.special_price !== "0.00"
                        ? "$" + selectedImage3.price
                        : ""
                      : mainImage3.special_price !== "0.00"
                      ? "$" + mainImage3.price
                      : ""
                  }}</del
                  >${{
                    selectedImage3
                      ? selectedImage3.special_price !== "0.00"
                        ? selectedImage3.special_price
                        : selectedImage3.price
                      : mainImage3.special_price !== "0.00"
                      ? mainImage3.special_price
                      : mainImage3.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedImage3 === '' ? mainImage3 : selectedImage3
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedImage3 === '' ? mainImage3 : selectedImage3
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedImage3
                    ? selectedImage3.short_description
                    : mainImage3.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedImage3 === '' ? mainImage3 : selectedImage3
                  )
                "
              ></p>           
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedImage3 === '' ? mainImage3 : selectedImage3
                  )
                "
              >              
                <span>view</span>
              </a>
                </div>

              </carousel>

            </div>
            <div class="latest-view">
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'">
                <carousel
                  ref="slider-2"
                  v-bind="carouselConfig2"
                  arrow: false,
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSliders"
                  >
                  <img
                  :src="
                    selectedImage
                      ? selectedImage.product_image
                      : mainImage.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
                v-if="mainImage"
                /><img
                  :src="
                    selectedImage2
                      ? selectedImage2.product_image
                      : mainImage2.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedImage2 === '' ? mainImage2 : selectedImage2
                  )
                "
                v-if="mainImage2"
                /><img
                  :src="
                    selectedImage3
                      ? selectedImage3.product_image
                      : mainImage3.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedImage3 === '' ? mainImage3 : selectedImage3
                  )
                "
                v-if="mainImage3"
                />
                  
                </carousel>
                
              </div>
            </div>
            <div class="latest-books d-flex flex-wrap justify-content-between latest-books">
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'"
                v-if="featuredData[0].data[1]">
                <carousel
                  ref="slider-3"
                  arrow: false,
                  v-bind="carouselConfig3"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSliders"
                  >
                  <img :src="selectedImage &&
                    selectedImage.product_image === featuredData[0].data[1].product_image
                      ? mainImage.product_image
                      : featuredData[0].data[1].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg(selectedImage && selectedImage.product_image === featured[0].data[1].product_image?mainImage.product_image:featured[0].data[1].product_image)"
                    v-if="featuredData[0].data[1] && featuredData[0].data[1].product_image"
                    />
                  <img :src="selectedImage2 &&
                    selectedImage2.product_image === featuredData[0].data[6].product_image
                      ? mainImage2.product_image
                      : featuredData[0].data[6].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg2(selectedImage2 && selectedImage2.product_image === featuredData[0].data[6].product_image?mainImage2.product_image:featuredData[0].data[6].product_image)"
                    v-if="featuredData[0].data[6] && featuredData[0].data[6].product_image"
                    />
                  <img :src="selectedImage3 &&
                    selectedImage3.product_image === featuredData[0].data[11].product_image
                      ? mainImage3.product_image
                      : featuredData[0].data[11].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg3(selectedImage3 && selectedImage3.product_image === featuredData[0].data[11].product_image?mainImage3.product_image:featuredData[0].data[11].product_image)"
                    v-if="featuredData[0].data[11] && featuredData[0].data[11].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'"
                v-if="featuredData[0].data[2]">
                <carousel
                  ref="slider-4"
                  v-bind="carouselConfig4"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSliders"
                  >
                  <img :src="selectedImage &&
                    selectedImage.product_image === featuredData[0].data[2].product_image
                      ? mainImage.product_image
                      : featuredData[0].data[2].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg(selectedImage && selectedImage.product_image === featuredData[0].data[2].product_image?mainImage.product_image:featuredData[0].data[2].product_image)"
                    v-if="featuredData[0].data[2] && featuredData[0].data[2].product_image"
                    />
                  <img :src="selectedImage2 &&
                    selectedImage2.product_image === featuredData[0].data[7].product_image
                      ? mainImage2.product_image
                      : featuredData[0].data[7].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg2(selectedImage2 && selectedImage2.product_image === featuredData[0].data[7].product_image?mainImage2.product_image:featuredData[0].data[7].product_image)"
                    v-if="featuredData[0].data[7] && featuredData[0].data[7].product_image"
                    />
                  <img :src="selectedImage3 &&
                    selectedImage3.product_image === featuredData[0].data[12].product_image
                      ? mainImage3.product_image
                      : featuredData[0].data[12].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg3(selectedImage3 && selectedImage3.product_image === featuredData[0].data[12].product_image?mainImage3.product_image:featuredData[0].data[12].product_image)"
                    v-if="featuredData[0].data[12] && featuredData[0].data[12].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'"
                v-if="featuredData[0].data[3]">
                <carousel
                  ref="slider-5"
                  v-bind="carouselConfig5"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSliders"
                  >
                  <img :src="selectedImage &&
                    selectedImage.product_image === featuredData[0].data[3].product_image
                      ? mainImage.product_image
                      : featuredData[0].data[3].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg(selectedImage && selectedImage.product_image === featuredData[0].data[3].product_image?mainImage.product_image:featuredData[0].data[3].product_image)"
                    v-if="featuredData[0].data[3] && featuredData[0].data[3].product_image"
                    />
                  <img :src="selectedImage2 &&
                    selectedImage2.product_image === featuredData[0].data[8].product_image
                      ? mainImage2.product_image
                      : featuredData[0].data[8].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg2(selectedImage2 && selectedImage2.product_image === featuredData[0].data[8].product_image?mainImage2.product_image:featuredData[0].data[8].product_image)"
                    v-if="featuredData[0].data[8] && featuredData[0].data[8].product_image"
                    />
                  <img :src="selectedImage3 &&
                    selectedImage3.product_image === featuredData[0].data[13].product_image
                      ? mainImage3.product_image
                      : featuredData[0].data[13].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg3(selectedImage3 && selectedImage3.product_image === featuredData[0].data[13].product_image?mainImage3.product_image:featuredData[0].data[13].product_image)"
                    v-if="featuredData[0].data[13] && featuredData[0].data[13].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'"
                v-if="featuredData[0].data[4]">
                <carousel
                  ref="slider-6"
                  v-bind="carouselConfig6"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSliders"
                  >
                  <img :src="selectedImage &&
                    selectedImage.product_image === featuredData[0].data[4].product_image
                      ? mainImage.product_image
                      : featuredData[0].data[4].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg(selectedImage && selectedImage.product_image === featuredData[0].data[4].product_image?mainImage.product_image:featuredData[0].data[4].product_image)"
                    v-if="featuredData[0].data[4] && featuredData[0].data[4].product_image"
                    />
                  <img :src="selectedImage2 &&
                    selectedImage2.product_image === featuredData[0].data[9].product_image
                      ? mainImage2.product_image
                      : featuredData[0].data[9].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg2(selectedImage2 && selectedImage2.product_image === featuredData[0].data[9].product_image?mainImage2.product_image:featuredData[0].data[9].product_image)"
                    v-if="featuredData[0].data[9] && featuredData[0].data[9].product_image"
                    />
                  <img :src="selectedImage3 &&
                    selectedImage3.product_image === featuredData[0].data[14].product_image
                      ? mainImage3.product_image
                      : featuredData[0].data[14].product_image"
                    alt="category"
                    title="category"
                    @click="selectImg3(selectedImage3 && selectedImage3.product_image === featuredData[0].data[14].product_image?mainImage3.product_image:featuredData[0].data[14].product_image)"
                    v-if="featuredData[0].data[14] && featuredData[0].data[14].product_image"
                    />
                </carousel>
              </div>
            </div>
          </div>
          <div
            class="latest-item d-md-flex flex-wrap align-items-center"
            :class="selectedTab === 'latest' ? 'active' : 'latest'"
            style="width:100%;"
            v-if="latestData && latestData[0] && latestData[0].data"
            >
            <div class="knowledge-info">
              <carousel
                ref="slider-7"
                v-bind="carouselConfig7"
                :focusOnSelect="true"
                @beforeChange="syncSlidersLatest"
                >
                <div class="knowledge-info-top" v-if="mainLatestImage">
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              >
                {{
                  selectedLatestImage
                    ? selectedLatestImage.product_name
                    : mainLatestImage.product_name
                }}
              </h2>
                  <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
                >{{
                  selectedLatestImage
                    ? selectedLatestImage.author_name != false &&
                      selectedLatestImage.author_name != null
                      ? selectedLatestImage.author_name
                      : ""
                    : mainLatestImage.author_name !== false &&
                      mainLatestImage.author_name !== null
                    ? mainLatestImage.author_name
                    : ""
                }}</span
              >
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage === ''
                        ? mainLatestImage
                        : selectedLatestImage
                    )
                  "
                >
                  <del>{{
                    selectedLatestImage
                      ? selectedLatestImage.special_price !== "0.00"
                        ? "$" + selectedLatestImage.price
                        : ""
                      : mainLatestImage.special_price !== "0.00"
                      ? "$" + mainLatestImage.price
                      : ""
                  }}</del
                  >${{
                    selectedLatestImage
                      ? selectedLatestImage.special_price !== "0.00"
                        ? selectedLatestImage.special_price
                        : selectedLatestImage.price
                      : mainLatestImage.special_price !== "0.00"
                      ? mainLatestImage.special_price
                      : mainLatestImage.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage === ''
                        ? mainLatestImage
                        : selectedLatestImage
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedLatestImage === ''
                          ? mainLatestImage
                          : selectedLatestImage
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedLatestImage
                    ? selectedLatestImage.short_description
                    : mainLatestImage.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === '' ? mainLatestImage : selectedLatestImage
                  )
                "
              >
                <span>view</span>
              </a>
                </div>
                <div class="knowledge-info-top" v-if="mainLatestImage2">
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage2 === ''
                      ? mainLatestImage2
                      : selectedLatestImage2
                  )
                "
              >
                {{
                  selectedLatestImage2
                    ? selectedLatestImage2.product_name
                    : mainLatestImage2.product_name
                }}
              </h2>
                  <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage2 === ''
                      ? mainLatestImage2
                      : selectedLatestImage2
                  )
                "
                >{{
                  selectedLatestImage2
                    ? selectedLatestImage2.author_name != false &&
                      selectedLatestImage2.author_name != null
                      ? selectedLatestImage2.author_name
                      : ""
                    : mainLatestImage2.author_name !== false &&
                      mainLatestImage2.author_name !== null
                    ? mainLatestImage2.author_name
                    : ""
                }}</span
              >
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage2 === ''
                        ? mainLatestImage2
                        : selectedLatestImage2
                    )
                  "
                >
                  <del>{{
                    selectedLatestImage2
                      ? selectedLatestImage2.special_price !== "0.00"
                        ? "$" + selectedLatestImage2.price
                        : ""
                      : mainLatestImage2.special_price !== "0.00"
                      ? "$" + mainLatestImage2.price
                      : ""
                  }}</del
                  >${{
                    selectedLatestImage2
                      ? selectedLatestImage2.special_price !== "0.00"
                        ? selectedLatestImage2.special_price
                        : selectedLatestImage2.price
                      : mainLatestImage2.special_price !== "0.00"
                      ? mainLatestImage2.special_price
                      : mainLatestImage2.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage2 === ''
                        ? mainLatestImage2
                        : selectedLatestImage2
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedLatestImage2 === ''
                          ? mainLatestImage2
                          : selectedLatestImage2
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedLatestImage2
                    ? selectedLatestImage2.short_description
                    : mainLatestImage2.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedLatestImage2 === ''
                      ? mainLatestImage2
                      : selectedLatestImage2
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage2 === '' ? mainLatestImage2 : selectedLatestImage2
                  )
                "
              >
                <span>view</span>
              </a>
                </div>
                <div class="knowledge-info-top" v-if="mainLatestImage3">
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage3 === ''
                      ? mainLatestImage3
                      : selectedLatestImage3
                  )
                "
              >
                {{
                  selectedLatestImage3
                    ? selectedLatestImage3.product_name
                    : mainLatestImage3.product_name
                }}
              </h2>
                  <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage3 === ''
                      ? mainLatestImage3
                      : selectedLatestImage3
                  )
                "
                >{{
                  selectedLatestImage3
                    ? selectedLatestImage3.author_name != false &&
                      selectedLatestImage3.author_name != null
                      ? selectedLatestImage3.author_name
                      : ""
                    : mainLatestImage3.author_name !== false &&
                      mainLatestImage3.author_name !== null
                    ? mainLatestImage3.author_name
                    : ""
                }}</span
              >
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage3 === ''
                        ? mainLatestImage3
                        : selectedLatestImage3
                    )
                  "
                >
                  <del>{{
                    selectedLatestImage3
                      ? selectedLatestImage3.special_price !== "0.00"
                        ? "$" + selectedLatestImage3.price
                        : ""
                      : mainLatestImage3.special_price !== "0.00"
                      ? "$" + mainLatestImage3.price
                      : ""
                  }}</del
                  >${{
                    selectedLatestImage3
                      ? selectedLatestImage3.special_price !== "0.00"
                        ? selectedLatestImage3.special_price
                        : selectedLatestImage3.price
                      : mainLatestImage3.special_price !== "0.00"
                      ? mainLatestImage3.special_price
                      : mainLatestImage3.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage3 === ''
                        ? mainLatestImage3
                        : selectedLatestImage3
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedLatestImage3 === ''
                          ? mainLatestImage3
                          : selectedLatestImage3
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedLatestImage3
                    ? selectedLatestImage3.short_description
                    : mainLatestImage3.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedLatestImage3 === ''
                      ? mainLatestImage3
                      : selectedLatestImage3
                  )
                "
              ></p><a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage3 === '' ? mainLatestImage3 : selectedLatestImage3
                  )
                "
              >
                <span>view</span>
              </a>
                </div>
                
              </carousel>
              
            </div>
            <div class="latest-view">
              <div class="img-wrp">
                <carousel
                  ref="slider-8"
                  v-bind="carouselConfig8"
                  arrow: false,
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersLatest"
                  >
                  <img
                  :src="
                    selectedLatestImage
                      ? selectedLatestImage.product_image
                      : mainLatestImage.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedLatestImage === '' ? mainLatestImage : selectedLatestImage
                  )
                "
                 v-if="mainLatestImage"
                />
                <img
                  :src="
                    selectedLatestImage2
                      ? selectedLatestImage2.product_image
                      : mainLatestImage2.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedPopularImage2 === '' ? mainPopularImage2 : selectedPopularImage2
                  )
                "
                 v-if="mainLatestImage2"
                />
                <img
                  :src="
                    selectedLatestImage3
                      ? selectedLatestImage3.product_image
                      : mainLatestImage3.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedPopularImage3 === '' ? mainPopularImage3 : selectedPopularImage3
                  )
                "
                 v-if="mainLatestImage3"
                />
                  
                </carousel>
               
              </div>
            </div>
            <div class="latest-books d-flex flex-wrap justify-content-between latest-books">
              <div class="img-wrp" v-if="latestData[0].data[1]">
                <carousel
                  ref="slider-9"
                  arrow: false,
                  v-bind="carouselConfig9"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersLatest"
                  >
                  <img :src="selectedLatestImage &&
                    selectedLatestImage.product_image === latestData[0].data[1].product_image
                      ? mainLatestImage.product_image
                      : latestData[0].data[1].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg(selectedLatestImage && selectedLatestImage.product_image === latestData[0].data[1].product_image?mainLatestImage.product_image:latestData[0].data[1].product_image)"
                    v-if="latestData[0].data[1] && latestData[0].data[1].product_image"
                    />
                  <img :src="selectedLatestImage2 &&
                    selectedLatestImage2.product_image === latestData[0].data[6].product_image
                      ? mainLatestImage2.product_image
                      : latestData[0].data[6].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg2(selectedLatestImage2 && selectedLatestImage2.product_image === latestData[0].data[6].product_image?mainLatestImage2.product_image:latestData[0].data[6].product_image)"
                    v-if="latestData[0].data[6] && latestData[0].data[6].product_image"
                    />
                  <img :src="selectedLatestImage3 &&
                    selectedLatestImage3.product_image === latestData[0].data[11].product_image
                      ? mainLatestImage3.product_image
                      : latestData[0].data[11].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg3(selectedLatestImage3 && selectedLatestImage3.product_image === latestData[0].data[11].product_image?mainLatestImage3.product_image:latestData[0].data[11].product_image)"
                    v-if="latestData[0].data[11] && latestData[0].data[11].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp" v-if="latestData[0].data[2]">
                <carousel
                  ref="slider-10"
                  v-bind="carouselConfig10"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersLatest"
                  >
                  <img :src="selectedLatestImage &&
                    selectedLatestImage.product_image === latestData[0].data[2].product_image
                      ? mainLatestImage.product_image
                      : latestData[0].data[2].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg(selectedLatestImage && selectedLatestImage.product_image === latestData[0].data[2].product_image?mainLatestImage.product_image:latestData[0].data[2].product_image)"
                    v-if="latestData[0].data[2] && latestData[0].data[2].product_image"
                    />
                  <img :src="selectedLatestImage2 &&
                    selectedLatestImage2.product_image === latestData[0].data[7].product_image
                      ? mainLatestImage2.product_image
                      : latestData[0].data[7].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg2(selectedLatestImage2 && selectedLatestImage2.product_image === latestData[0].data[7].product_image?mainLatestImage2.product_image:latestData[0].data[7].product_image)"
                    v-if="latestData[0].data[7] && latestData[0].data[7].product_image"
                    />
                  <img :src="selectedLatestImage3 &&
                    selectedLatestImage3.product_image === latestData[0].data[12].product_image
                      ? mainLatestImage3.product_image
                      : latestData[0].data[12].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg3(selectedLatestImage3 && selectedLatestImage3.product_image === latestData[0].data[12].product_image?mainLatestImage3.product_image:latestData[0].data[12].product_image)"
                    v-if="latestData[0].data[12] && latestData[0].data[12].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp" v-if="latestData[0].data[3]">
                <carousel
                  ref="slider-11"
                  v-bind="carouselConfig11"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersLatest"
                  >
                  <img :src="selectedLatestImage &&
                    selectedLatestImage.product_image === latestData[0].data[3].product_image
                      ? mainLatestImage.product_image
                      : latestData[0].data[3].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg(selectedLatestImage && selectedLatestImage.product_image === latestData[0].data[3].product_image?mainLatestImage.product_image:latestData[0].data[3].product_image)"
                    v-if="latestData[0].data[3] && latestData[0].data[3].product_image"
                    />
                  <img :src="selectedLatestImage2 &&
                    selectedLatestImage2.product_image === latestData[0].data[8].product_image
                      ? mainLatestImage2.product_image
                      : latestData[0].data[8].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg2(selectedLatestImage2 && selectedLatestImage2.product_image === latestData[0].data[8].product_image?mainLatestImage2.product_image:latestData[0].data[8].product_image)"
                    v-if="latestData[0].data[8] && latestData[0].data[8].product_image"
                    />
                  <img :src="selectedLatestImage3 &&
                    selectedLatestImage3.product_image === latestData[0].data[13].product_image
                      ? mainLatestImage3.product_image
                      : latestData[0].data[13].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg3(selectedLatestImage3 && selectedLatestImage3.product_image === latestData[0].data[13].product_image?mainLatestImage3.product_image:latestData[0].data[13].product_image)"
                    v-if="latestData[0].data[13] && latestData[0].data[13].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp" v-if="latestData[0].data[4]">
                <carousel
                  ref="slider-12"
                  v-bind="carouselConfig12"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersLatest"
                  >
                  <img :src="selectedLatestImage &&
                    selectedLatestImage.product_image === latestData[0].data[4].product_image
                      ? mainLatestImage.product_image
                      : latestData[0].data[4].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg(selectedLatestImage && selectedLatestImage.product_image === latestData[0].data[4].product_image?mainLatestImage.product_image:latestData[0].data[4].product_image)"
                    v-if="latestData[0].data[4] && latestData[0].data[4].product_image"
                    />
                  <img :src="selectedLatestImage2 &&
                    selectedLatestImage2.product_image === latestData[0].data[9].product_image
                      ? mainLatestImage2.product_image
                      : latestData[0].data[9].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg2(selectedLatestImage2 && selectedLatestImage2.product_image === latestData[0].data[9].product_image?mainLatestImage2.product_image:latestData[0].data[9].product_image)"
                    v-if="latestData[0].data[9] && latestData[0].data[9].product_image"
                    />
                  <img :src="selectedLatestImage3 &&
                    selectedLatestImage3.product_image === latestData[0].data[14].product_image
                      ? mainLatestImage3.product_image
                      : latestData[0].data[14].product_image"
                    alt="category"
                    title="category"
                    @click="selectLatestImg3(selectedLatestImage3 && selectedLatestImage3.product_image === latestData[0].data[14].product_image?mainLatestImage3.product_image:latestData[0].data[14].product_image)"
                    v-if="latestData[0].data[14] && latestData[0].data[14].product_image"
                    />
                </carousel>
              </div>
            </div>
          </div>
           <div
            class="latest-item d-md-flex flex-wrap align-items-center"
            :class="selectedTab === 'popular' ? 'active' : 'popular'"
            style="width:100%;"
            v-if="popularData && popularData[0] && popularData[0].model"
            >
            <div class="knowledge-info">
              <carousel
                ref="slider-13"
                v-bind="carouselConfig13"
                :focusOnSelect="true"
                @beforeChange="syncSlidersPopular"
                >
                <div class="knowledge-info-top" v-if="mainPopularImage">
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              >
                {{
                  selectedPopularImage
                    ? selectedPopularImage.product_name
                    : mainPopularImage.product_name
                }}
              </h2>
                  <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
                >{{
                  selectedPopularImage
                    ? selectedPopularImage.author_name !== false &&
                      selectedPopularImage.author_name !== null
                      ? selectedPopularImage.author_name
                      : ""
                    : mainPopularImage.author_name !== false &&
                      mainPopularImage.author_name !== null
                    ? mainPopularImage.author_name
                    : ""
                }}</span
              >
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage === ''
                        ? mainPopularImage
                        : selectedPopularImage
                    )
                  "
                >
                  <del>{{
                    selectedPopularImage
                      ? selectedPopularImage.special_price !== "0.00"
                        ? "$" + selectedPopularImage.price
                        : ""
                      : mainPopularImage.special_price !== "0.00"
                      ? "$" + mainPopularImage.price
                      : ""
                  }}</del
                  >${{
                    selectedPopularImage
                      ? selectedPopularImage.special_price !== "0.00"
                        ? selectedPopularImage.special_price
                        : selectedPopularImage.price
                      : mainPopularImage.special_price !== "0.00"
                      ? mainPopularImage.special_price
                      : mainPopularImage.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage === ''
                        ? mainPopularImage
                        : selectedPopularImage
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedPopularImage === ''
                          ? mainPopularImage
                          : selectedPopularImage
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedPopularImage
                    ? selectedPopularImage.short_description
                    : mainPopularImage.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === '' ? mainPopularImage : selectedPopularImage
                  )
                "
              >
                <span>view</span>
              </a>
                </div>
                <div class="knowledge-info-top" v-if="mainPopularImage2">
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage2 === ''
                      ? mainPopularImage2
                      : selectedPopularImage2
                  )
                "
              >
                {{
                  selectedPopularImage2
                    ? selectedPopularImage2.product_name
                    : mainPopularImage2.product_name
                }}
              </h2>
                  <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage2 === ''
                      ? mainPopularImage2
                      : selectedPopularImage2
                  )
                "
                >{{
                  selectedPopularImage2
                    ? selectedPopularImage2.author_name !== false &&
                      selectedPopularImage2.author_name !== null
                      ? selectedPopularImage2.author_name
                      : ""
                    : mainPopularImage2.author_name !== false &&
                      mainPopularImage2.author_name !== null
                    ? mainPopularImage2.author_name
                    : ""
                }}</span
              >
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage2 === ''
                        ? mainPopularImage2
                        : selectedPopularImage2
                    )
                  "
                >
                  <del>{{
                    selectedPopularImage2
                      ? selectedPopularImage2.special_price !== "0.00"
                        ? "$" + selectedPopularImage2.price
                        : ""
                      : mainPopularImage2.special_price !== "0.00"
                      ? "$" + mainPopularImage2.price
                      : ""
                  }}</del
                  >${{
                    selectedPopularImage2
                      ? selectedPopularImage2.special_price !== "0.00"
                        ? selectedPopularImage2.special_price
                        : selectedPopularImage2.price
                      : mainPopularImage2.special_price !== "0.00"
                      ? mainPopularImage2.special_price
                      : mainPopularImage2.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage2 === ''
                        ? mainPopularImage2
                        : selectedPopularImage2
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedPopularImage2 === ''
                          ? mainPopularImage2
                          : selectedPopularImage2
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedPopularImage2
                    ? selectedPopularImage2.short_description
                    : mainPopularImage2.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedPopularImage2 === ''
                      ? mainPopularImage2
                      : selectedPopularImage2
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage2 === '' ? mainPopularImage2 : selectedPopularImage2
                  )
                "
              >
                <span>view</span>
              </a>
                </div>
                <div class="knowledge-info-top" v-if="mainPopularImage3">
                  <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage3 === ''
                      ? mainPopularImage3
                      : selectedPopularImage3
                  )
                "
              >
                {{
                  selectedPopularImage3
                    ? selectedPopularImage3.product_name
                    : mainPopularImage3.product_name
                }}
              </h2>
                  <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage3 === ''
                      ? mainPopularImage3
                      : selectedPopularImage3
                  )
                "
                >{{
                  selectedPopularImage3
                    ? selectedPopularImage3.author_name !== false &&
                      selectedPopularImage3.author_name !== null
                      ? selectedPopularImage3.author_name
                      : ""
                    : mainPopularImage3.author_name !== false &&
                      mainPopularImage3.author_name !== null
                    ? mainPopularImage3.author_name
                    : ""
                }}</span
              >
                  <div class="review d-flex align-items-center">
                    <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage3 === ''
                        ? mainPopularImage3
                        : selectedPopularImage3
                    )
                  "
                >
                  <del>{{
                    selectedPopularImage3
                      ? selectedPopularImage3.special_price !== "0.00"
                        ? "$" + selectedPopularImage3.price
                        : ""
                      : mainPopularImage3.special_price !== "0.00"
                      ? "$" + mainPopularImage3.price
                      : ""
                  }}</del
                  >${{
                    selectedPopularImage3
                      ? selectedPopularImage3.special_price !== "0.00"
                        ? selectedPopularImage3.special_price
                        : selectedPopularImage3.price
                      : mainPopularImage3.special_price !== "0.00"
                      ? mainPopularImage3.special_price
                      : mainPopularImage3.price
                  }}
                </span>
                    <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage3 === ''
                        ? mainPopularImage3
                        : selectedPopularImage3
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedPopularImage3 === ''
                          ? mainPopularImage3
                          : selectedPopularImage3
                      )
                    "
                  ></rating>
                </span>
                  </div>
                  <p
                class="sec-desc"
                v-html="
                  selectedPopularImage3
                    ? selectedPopularImage3.short_description
                    : mainPopularImage3.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedPopularImage3 === ''
                      ? mainPopularImage3
                      : selectedPopularImage3
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage3 === '' ? mainPopularImage3 : selectedPopularImage3
                  )
                "
              >
                <span>view</span>
              </a>
                </div>
              </carousel>
              

            </div>
            <div class="latest-view">
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'">
                <carousel
                  ref="slider-14"
                  v-bind="carouselConfig14"
                  arrow: false,
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersPopular"
                  >
                  <img
                  :src="
                    selectedPopularImage
                      ? selectedPopularImage.product_image
                      : mainPopularImage.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedPopularImage === '' ? mainPopularImage : selectedPopularImage
                  )
                "
                 v-if="mainPopularImage"
                />
                <img
                  :src="
                    selectedPopularImage2
                      ? selectedPopularImage2.product_image
                      : mainPopularImage2.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedPopularImage2 === '' ? mainPopularImage2 : selectedPopularImage2
                  )
                "
                 v-if="mainPopularImage2"
                />
                <img
                  :src="
                    selectedPopularImage3
                      ? selectedPopularImage3.product_image
                      : mainPopularImage3.product_image
                  "
                  alt="category"
                  title="category"
                  @click="
                  redirectToDetailPage(
                    selectedPopularImage3 === '' ? mainPopularImage3 : selectedPopularImage3
                  )
                "
                 v-if="mainPopularImage3"
                />
                </carousel>
                
              </div>
            </div>
            <div class="latest-books d-flex flex-wrap justify-content-between latest-books">
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'">
                <carousel
                  ref="slider-15"
                  arrow: false,
                  v-bind="carouselConfig15"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersPopular"
                  >
                  <img :src="selectedPopularImage &&
                    selectedPopularImage.product_image === popularData[0].model[1].product_image
                      ? mainPopularImage.product_image
                      : popularData[0].model[1].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg(selectedPopularImage && selectedPopularImage.product_image === popularData[0].model[1].product_image?mainPopularImage.product_image:popularData[0].model[1].product_image)"
                    v-if="popularData[0].model[1] && popularData[0].model[1].product_image"
                    />
                  <img :src="selectedPopularImage2 &&
                    selectedPopularImage2.product_image === popularData[0].model[6].product_image
                      ? mainPopularImage2.product_image
                      : popularData[0].model[6].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg2(selectedPopularImage2 && selectedPopularImage2.product_image === popularData[0].model[6].product_image?mainPopularImage2.product_image:popularData[0].model[6].product_image)"
                    v-if="popularData[0].model[6] && popularData[0].model[6].product_image"
                    />
                  <img :src="selectedPopularImage3 &&
                    selectedPopularImage3.product_image === popularData[0].model[11].product_image
                      ? mainPopularImage3.product_image
                      : popularData[0].model[11].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg3(selectedPopularImage3 && selectedPopularImage3.product_image === popularData[0].model[11].product_image?mainPopularImage3.product_image:popularData[0].model[11].product_image)"
                    v-if="popularData[0].model[11] && popularData[0].model[11].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'">
                <carousel
                  ref="slider-16"
                  v-bind="carouselConfig16"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersPopular"
                  >
                  <img :src="selectedPopularImage &&
                    selectedPopularImage.product_image === popularData[0].model[2].product_image
                      ? mainPopularImage.product_image
                      : popularData[0].model[2].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg(selectedPopularImage && selectedPopularImage.product_image === popularData[0].model[2].product_image?mainPopularImage.product_image:popularData[0].model[2].product_image)"
                    v-if="popularData[0].model[2] && popularData[0].model[2].product_image"
                    />
                  <img :src="selectedPopularImage2 &&
                    selectedPopularImage2.product_image === popularData[0].model[7].product_image
                      ? mainPopularImage2.product_image
                      : popularData[0].model[7].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg2(selectedPopularImage2 && selectedPopularImage2.product_image === popularData[0].model[7].product_image?mainPopularImage2.product_image:popularData[0].model[7].product_image)"
                    v-if="popularData[0].model[7] && popularData[0].model[7].product_image"
                    />
                  <img :src="selectedPopularImage3 &&
                    selectedPopularImage3.product_image === popularData[0].model[12].product_image
                      ? mainPopularImage3.product_image
                      : popularData[0].model[12].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg3(selectedPopularImage3 && selectedPopularImage3.product_image === popularData[0].model[12].product_image?mainPopularImage3.product_image:popularData[0].model[12].product_image)"
                    v-if="popularData[0].model[12] && popularData[0].model[12].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'"
                v-if="popularData[0].model[3]">
                <carousel
                  ref="slider-17"
                  v-bind="carouselConfig17"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersPopular"
                  >
                  <img :src="selectedPopularImage &&
                    selectedPopularImage.product_image === popularData[0].model[3].product_image
                      ? mainPopularImage.product_image
                      : popularData[0].model[3].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg(selectedPopularImage && selectedPopularImage.product_image === popularData[0].model[3].product_image?mainPopularImage.product_image:popularData[0].model[3].product_image)"
                    v-if="popularData[0].model[3] && popularData[0].model[3].product_image"
                    />
                  <img :src="selectedPopularImage2 &&
                    selectedPopularImage2.product_image === popularData[0].model[8].product_image
                      ? mainPopularImage2.product_image
                      : popularData[0].model[8].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg2(selectedPopularImage2 && selectedPopularImage2.product_image === popularData[0].model[8].product_image?mainPopularImage2.product_image:popularData[0].model[8].product_image)"
                    v-if="popularData[0].model[8] && popularData[0].model[8].product_image"
                    />
                  <img :src="selectedPopularImage3 &&
                    selectedPopularImage3.product_image === popularData[0].model[13].product_image
                      ? mainPopularImage3.product_image
                      : popularData[0].model[13].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg3(selectedPopularImage3 && selectedPopularImage3.product_image === popularData[0].model[13].product_image?mainPopularImage3.product_image:popularData[0].model[13].product_image)"
                    v-if="popularData[0].model[13] && popularData[0].model[13].product_image"
                    />
                </carousel>
              </div>
              <div class="img-wrp"
                :class="$route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'"
                v-if="popularData[0].model[4]">
                <carousel
                  ref="slider-18"
                  v-bind="carouselConfig18"
                  :focusOnSelect="true"
                  :arrows="false"
                  @beforeChange="syncSlidersPopular"
                  >
                  <img :src="selectedPopularImage &&
                    selectedPopularImage.product_image === popularData[0].model[4].product_image
                      ? mainPopularImage.product_image
                      : popularData[0].model[4].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg(selectedPopularImage && selectedPopularImage.product_image === popularData[0].model[4].product_image?mainPopularImage.product_image:popularData[0].model[4].product_image)"
                    v-if="popularData[0].model[4] && popularData[0].model[4].product_image"
                    />
                  <img :src="selectedPopularImage2 &&
                    selectedPopularImage2.product_image === popularData[0].model[9].product_image
                      ? mainPopularImage2.product_image
                      : popularData[0].model[9].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg2(selectedPopularImage2 && selectedPopularImage2.product_image === popularData[0].model[9].product_image?mainPopularImage2.product_image:popularData[0].model[9].product_image)"
                    v-if="popularData[0].model[9] && popularData[0].model[9].product_image"
                    />
                  <img :src="selectedPopularImage3 &&
                    selectedPopularImage3.product_image === popularData[0].model[14].product_image
                      ? mainPopularImage3.product_image
                      : popularData[0].model[14].product_image"
                    alt="category"
                    title="category"
                    @click="selectPopularImg3(selectedPopularImage3 && selectedPopularImage3.product_image === popularData[0].model[14].product_image?mainPopularImage3.product_image:popularData[0].model[14].product_image)"
                    v-if="popularData[0].model[14] && popularData[0].model[14].product_image"
                    />
                </carousel>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </section>
</template>

<script type="module">
import { computed, useRouter, ref } from "@nuxtjs/composition-api";
import { productGetters } from "@vue-storefront/magento";

import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import Rating from "~/components/Products/Rating";
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import { useUiState } from "~/composables";

export default {
  name: "HomePage",
  props: {
    featured: {
      type: [Array, Object],
      default: null,
    },
    latest: {
      type: [Array, Object],
      default: null,
    },
    popular: {
      type: [Array, Object],
      default: null,
    },
  },
  components: {
    Carousel,
    Rating,
  },
  setup(props, context) {
    const carouselConfig1 = ref({
      dots: false,
      arrow: true,
      focusOnSelect: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig2 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig3 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig4 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig5 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig6 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig7 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig8 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig9 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig10 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig11 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig12 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig13 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig14 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    const carouselConfig15 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    const carouselConfig16 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    const carouselConfig17 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    const carouselConfig18 = ref({
      dots: false,
      arrow: false,
      infinite: false,
      focusOnSelect: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    const currentIndex = ref(0);
    const currentLatestIndex = ref(0);
    const currentPopularIndex = ref(0);
    const rotationFactor = ref(5);
    const selectedImage = ref("");
    const selectedImage2 = ref("");
    const selectedImage3 = ref("");
    const selectedLatestImage = ref("");
    const selectedLatestImage2 = ref("");
    const selectedLatestImage3 = ref("");
    const selectedPopularImage = ref("");
    const selectedPopularImage2 = ref("");
    const selectedPopularImage3 = ref("");
    const viewButtonImage = ref("");
    const featuredData = props.featured;
    const latestData = props.latest;
    const popularData = props.popular;
    const selectedTab = ref("featured");

    const currentSetOfImages = computed(() => {
      const startIndex = currentIndex.value;
      const endIndex = startIndex + rotationFactor.value;
      const images = featuredData[0].data;
      const indexedImages = images.filter((img, idx) => {
        if (idx >= startIndex && idx <= endIndex - 1) {
          return img;
        }
      });

      featuredData[0].data.forEach((img) => {
        img.isMain = false;
      });

      indexedImages[0].isMain = true;
      return indexedImages;
    });
    const currentSetOfLatestImages = computed(() => {
      const startIndex = currentLatestIndex.value;
      const endIndex = startIndex + rotationFactor.value;
      const images = latestData[0].data;
      const indexedImages = images.filter((img, idx) => {
        if (idx >= startIndex && idx <= endIndex - 1) {
          return img;
        }
      });

      latestData[0].data.forEach((img) => {
        img.isMain = false;
      });

      indexedImages[0].isMain = true;
      return indexedImages;
    });
    const currentSetOfPopularImages = computed(() => {
      const startIndex = currentPopularIndex.value;
      const endIndex = startIndex + rotationFactor.value;
      const images = popularData[0].model;
      const indexedImages = images.filter((img, idx) => {
        if (idx >= startIndex && idx <= endIndex - 1) {
          return img;
        }
      });

      popularData[0].model.forEach((img) => {
        img.isMain = false;
      });

      indexedImages[0].isMain = true;
      return indexedImages;
    });

    const mainImage = computed(() => {
      const mainImg = currentSetOfImages.value.find(
        (img) => img.isMain === true
      );
      return mainImg;
    });
    const mainImage2 = computed(() => {
      if(featuredData && featuredData[0] && featuredData[0].data && featuredData[0].data[5]){
        return featuredData[0].data && featuredData[0].data[5];
      }
    });
    const mainImage3 = computed(() => {
      if(featuredData && featuredData[0] && featuredData[0].data && featuredData[0].data[10]){
        return featuredData[0].data && featuredData[0].data[10];
      }
    });

    const mainLatestImage = computed(() => {
      const mainImg = currentSetOfLatestImages.value.find(
        (img) => img.isMain === true
      );
      return mainImg;
    });
    const mainLatestImage2 = computed(() => {
      if(latestData && latestData[0] && latestData[0].data && latestData[0].data[5]){
        return latestData[0].data && latestData[0].data[5];
      }
    });
    const mainLatestImage3 = computed(() => {
      if(latestData && latestData[0] && latestData[0].data && latestData[0].data[10]){
        return latestData[0].data && latestData[0].data[10];
      }
    });

    const mainPopularImage = computed(() => {
      const mainImg = currentSetOfPopularImages.value.find(
        (img) => img.isMain === true
      );
      return mainImg;
    });
    const mainPopularImage2 = computed(() => {
      if(popularData && popularData[0] && popularData[0].model && popularData[0].model[5]){
        return popularData[0].model && popularData[0].model[5];
      }
    });
    const mainPopularImage3 = computed(() => {
      if(popularData && popularData[0] && popularData[0].model && popularData[0].model[10]){
        return popularData[0].model && popularData[0].model[10];
      }
    });

    const uiState = useUiState();
    const { getSlugLink } = useUiState();
    const redirectToDetailPage = (product) => {
      const link = getSlugLink(product);
      router.push({ path: link });
    };
    const redirectViewButton = (index) => {
      console.log(index);
    };
    const router = useRouter();

    const selectImg = (product_image) => {
      const sI = featuredData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedImage.value = sI;
      viewButtonImage.value = sI;
    };
    const selectImg2 = (product_image) => {
      const sI = featuredData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedImage2.value = sI;
      viewButtonImage.value = sI;
    };
    const selectImg3 = (product_image) => {
      const sI = featuredData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedImage3.value = sI;
      viewButtonImage.value = sI;
    };

    const selectLatestImg = (product_image) => {
      const sI = latestData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedLatestImage.value = sI;
      viewButtonImage.value = sI;
    };
    const selectLatestImg2 = (product_image) => {
      const sI = latestData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedLatestImage2.value = sI;
      viewButtonImage.value = sI;
    };
    const selectLatestImg3 = (product_image) => {
      const sI = latestData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedLatestImage3.value = sI;
      viewButtonImage.value = sI;
    };

    const selectPopularImg = (product_image) => {
      const sI = popularData[0].model.find(
        (img) => img.product_image === product_image
      );
      selectedPopularImage.value = sI;
      viewButtonImage.value = sI;
    };
    const selectPopularImg2 = (product_image) => {
      const sI = popularData[0].model.find(
        (img) => img.product_image === product_image
      );
      selectedPopularImage2.value = sI;
      viewButtonImage.value = sI;
    };
    const selectPopularImg3 = (product_image) => {
      const sI = popularData[0].model.find(
        (img) => img.product_image === product_image
      );
      selectedPopularImage3.value = sI;
      viewButtonImage.value = sI;
    };

    const select = (event, tabName) => {
      let navLinks = document.getElementsByClassName("nav-link");

      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
      }

      let selectedElement = event.target;
      selectedElement.classList.add("active");

      selectedTab.value = tabName;
    };

    return {
      productGetters,
      currentSetOfImages,
      currentSetOfLatestImages,
      currentSetOfPopularImages,
      mainImage,
      mainLatestImage,
      mainPopularImage,
      selectedImage,
      selectedLatestImage,
      selectedPopularImage,
      currentIndex,
      currentLatestIndex,
      currentPopularIndex,
      selectImg,
      selectLatestImg,
      selectPopularImg,
      featuredData,
      selectedTab,
      select,
      latestData,
      popularData,
      redirectToDetailPage,
      ...uiState,
      carouselConfig1,
      carouselConfig2,
      carouselConfig3,
      carouselConfig4,
      carouselConfig5,
      carouselConfig6,
      carouselConfig7,
      carouselConfig8,
      carouselConfig9,
      carouselConfig10,
      carouselConfig11,
      carouselConfig12,
      carouselConfig13,
      carouselConfig14,
      carouselConfig15,
      carouselConfig16,
      carouselConfig17,
      carouselConfig18,
      mainImage2,
      selectedImage2,
      selectImg2,
      mainImage3,
      selectedImage3,
      selectImg3,
      mainLatestImage2,
      mainLatestImage3,
      selectLatestImg2,
      selectLatestImg3,
      selectedLatestImage2,
      selectedLatestImage3,
      mainPopularImage2,
      mainPopularImage3,
      selectPopularImg2,
      selectPopularImg3,
      selectedPopularImage2,
      selectedPopularImage3,
      viewButtonImage,
      redirectViewButton
    };
  },
    methods: {
    syncSliders(currentPosition, nextPosition) {
      if(this.featured){
        this.$refs['slider-1'].goTo(nextPosition);
        this.$refs['slider-2'].goTo(nextPosition);
        this.$refs['slider-3'].goTo(nextPosition);
        this.$refs['slider-4'].goTo(nextPosition);
        this.$refs['slider-5'].goTo(nextPosition);
        this.$refs['slider-6'].goTo(nextPosition);
      }

    },

    syncSlidersLatest(currentPosition, nextPosition) {
      if(this.latest){
        this.$refs['slider-7'].goTo(nextPosition);
        this.$refs['slider-8'].goTo(nextPosition);
        this.$refs['slider-9'].goTo(nextPosition);
        this.$refs['slider-10'].goTo(nextPosition);
        this.$refs['slider-11'].goTo(nextPosition);
        this.$refs['slider-12'].goTo(nextPosition);
      }
    },

    syncSlidersPopular(currentPosition, nextPosition) {
      
      if(this.popular){
        this.$refs['slider-13'].goTo(nextPosition);
        this.$refs['slider-14'].goTo(nextPosition);
        this.$refs['slider-15'].goTo(nextPosition);
        this.$refs['slider-16'].goTo(nextPosition);
        this.$refs['slider-17'].goTo(nextPosition);
        this.$refs['slider-18'].goTo(nextPosition);
      }

    },
    
  },
  
};
</script>


<style lang="scss" scoped>
.tab-content {
  display: none;
  @media (min-width: 1300px) {
      display: block;
    }
}
.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
  }
  .var-hor-category-img {
    min-height: 263px;
  }
  .related-wrap .related-details {
    justify-content: center;
  }
}
.related-slider-img {
  position: relative;
  .control {
    position: absolute;
    top: 30%;
  }
  .next,
  .prev {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.feature-products {
  .tab-content {
    overflow: visible;
    ul {
      margin: 0 auto 24px;
      li {
        button {
          line-height: normal;
        }
      }
    }
    .kn-carousel {
      overflow: visible;
      .latest-slider {
        .latest-item {
          @media (max-width: 991px) {
            background-image: url("/meccabook/fear-book-back.png");
            justify-content: flex-end !important;
          }
          .knowledge-info {
            max-width: 360px;
            overflow: visible;
            @media screen and (max-width: 1024px) and (min-width: 992px) {
              .sec-title {
                font-size: 26px;
              }
            }
            .sec-title {
              margin-bottom: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: initial;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .publisher {
              margin-bottom: 10px;
            }
            .sec-desc {
              margin-bottom: 24px;
            }
          }
          .latest-view {
            width: calc(36.5% - 22px);
            max-width: 400px;
            @media (max-width: 991px) {
              width: 50%;
              max-width: unset;
              .img-wrp {
                width: 50%;
                margin: 0 auto;
              }
            }
          }
          .latest-books {
            width: calc(36.5% - 22px);
            padding-left: 22px;
            @media (max-width: 991px) {
              width: 100%;
              max-width: unset;
              margin-top: 20px;
            }
            @media (max-width: 767px) {
              margin-top: 0;
            }
            .img-wrp {
              @media (max-width: 991px) {
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
}
.latest-view,
.knowledge-info {
  position: relative;
  cursor: pointer;
}
</style>
