<template>
  <div>
    <!-- <fixed-header> -->
    <header class="header"
     :style="$route.path.includes('kids') ? 'background-image: url(/meccabook/kids-bg-img.png)' : 'background-image: url()'">
      <div class="offer-header">
        <p v-if="getRibbinContent" v-html="getRibbinContent"></p>
        <div class="btn-wrap">
          <button class="close-btn"></button>
        </div>
      </div>
      <nav class="navbar navbar-expand-md">
        <div class="header-top">
          <div class="container">
            <div class="mobile-menu icon-and-search">
              <button
                type="button"
                class="bg-cl-transparent brdr-none inline-flex"
                @click="toggleSidebar"
                data-testid="menuButton"
              >
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </button>
              <div class="btn-search-wrap icon-search">
                <button @click="searchIconToggle" class="search-btn"></button>
              </div>
            </div>
            <div class="logo">
              <nuxt-link to="/">
                <img src="/meccabook/logo.svg" alt="logo" title="logo" />
              </nuxt-link>
            </div>
            <div
              class="search-wrap"
              :class="{ 'active-serch': searchIconVisible }"
            >
              <form action="#">
                <div class="form-wrap">
                  <div class="search-input">
                    <input
                      v-model="searchTerm"
                      type="text"
                      class="form-control"
                      placeholder="Search by Book Title, Author or ISBN"
                    />
                  </div>
                  <div class="search-btn" @click.prevent="redirectToSearchPage">
                    <button type="submit">
                      <i class="icon-search"></i>
                      <span class="btn-text">Search</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="header-right">
              <div class="btn-wrap account-btn">
                <button @click="showHideFunc" to="#" class="user-btn"></button>
                <div
                  v-bind:class="[!isVisible ? 'hidder-style' : 'show-style']"
                  id="hideMe"
                >
                  <div class="signin-drpdwn">
                    <div
                      v-if="!isAuthenticated"
                      class="btn-wrp"
                      @click="handleAccountClick"
                    >
                      <nuxt-link to="#!" class="btn text-uppercase">
                        <span>sign in</span>
                      </nuxt-link>
                    </div>
                    <div
                      v-if="!isAuthenticated"
                      class="btn-wrp"
                      @click="showRegisterForm"
                    >
                      <nuxt-link to="#" class="btn text-uppercase">
                        <span>Register</span>
                      </nuxt-link>
                    </div>
                    <div
                      v-if="isAuthenticated"
                      class="btn-wrp"
                      @click="logoutFunc"
                    >
                      <nuxt-link to="" class="btn text-uppercase" @click.native="closeDropDown">
                        <span>sign out</span>
                      </nuxt-link>
                    </div>
                    <nuxt-link
                      v-if="isAuthenticated"
                      to="/my-account/manage-account"
                      class="acc-link"
                      @click.native="closeDropDown"
                      >Manage Account</nuxt-link
                    >
                    <nuxt-link v-if="isAuthenticated" to="/my-account/orders" class="acc-link" @click.native="closeDropDown"
                     
                      >Orders</nuxt-link
                    >
                    <nuxt-link v-if="isAuthenticated" to="/my-account/wishlist" class="acc-link" @click.native="closeDropDown"
                      >Wishlist</nuxt-link
                    >
                  </div>
                </div>
              </div>
              <div class="btn-wrap cart">
                <button @click="toggleCartSidebar" to="#" class="cart-btn">
                  <div class="wrap-icon">
                    <i v-if="cartTotalItems" class="icon-counter">
                      {{ cartTotalItems }}
                    </i>
                  </div>
                </button>
                <div class="cart-wrapper">
                  <div class="cart-preview">
                    <h2 class="preview-title">Cart Preview</h2>
                    <div
                      class="
                        cart-item
                        d-flex
                        justify-content-between
                        align-items-start
                      "
                    >
                      <div class="view-item" style="background-image: url()">
                        <div class="img-wrp">
                          <img
                            src="/meccabook/category-ratio-img.png"
                            alt="cart"
                          />
                        </div>
                      </div>
                      <div class="desc-item">
                        <h4 class="item-title">
                          The Mainstay: A Commentary on Qasida Al-Burda
                        </h4>
                        <p class="item-exp">Softcover</p>
                        <div class="item-prices">
                          <del>$49.95</del>
                          <span>$39.95</span>
                        </div>
                        <div class="included">
                          <div class="inc-dcr-item">
                            <input type="button" value class="decre-btn" />
                            <input
                              type="text"
                              class="onlyNumber form-control pull-left"
                              value="1"
                              name="noOfRoom"
                            />
                            <input type="button" value class="incr-btn" />
                          </div>
                          <div class="orig-price">
                            <span>$39.95</span>
                          </div>
                          <nuxt-link to="#!" class="remove-ilnk text-underline"
                            >Remove</nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      class="
                        cart-item
                        d-flex
                        justify-content-between
                        align-items-start
                      "
                    >
                      <div class="view-item" style="background-image: url()">
                        <div class="img-wrp">
                          <img
                            src="/meccabook/category-ratio-img.png"
                            alt="cart"
                          />
                        </div>
                      </div>
                      <div class="desc-item">
                        <h4 class="item-title">
                          The Mainstay: A Commentary on Qasida Al-Burda
                        </h4>
                        <p class="item-exp">Softcover</p>
                        <div class="item-prices">
                          <del>$49.95</del>
                          <span>$39.95</span>
                        </div>
                        <div class="included">
                          <div class="inc-dcr-item">
                            <input type="button" value class="decre-btn" />
                            <input
                              type="text"
                              class="onlyNumber form-control pull-left"
                              value="1"
                              name="noOfRoom"
                            />
                            <input type="button" value class="incr-btn" />
                          </div>
                          <div class="orig-price">
                            <span>$39.95</span>
                          </div>
                          <nuxt-link to="#!" class="remove-ilnk text-underline"
                            >Remove</nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      class="
                        sub-total
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <span>
                        Subtotal
                        <sub>(3 items)</sub>
                      </span>
                      <span>$119.85</span>
                    </div>
                    <div class="btn-wrp">
                      <nuxt-link
                        to="#"
                        class="
                          btn
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <span>continue to cart</span>
                      </nuxt-link>
                      <nuxt-link
                        to="#"
                        class="
                          btn
                          close-btn
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <img src="/meccabook/icon-long-arrow-right.svg" alt />
                        <span>close</span>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="header-bottom navbar-collapse collapse"
          :class="{ show: showSidebar }"
        >
          <ul class="navbar-nav main-menu">
            <li class="nav-item dropdown">
              <label
                @click="catchVal(categoryTree[0].label)"
                v-if="categoryTree[0].items"
                class="nav-link dropdown-toggle"
                :class="categoryTree[0].label == categoryVal && screenWidth <= 767 ? 'active' : null"
                >{{ categoryTree[0].label }}</label
              >
              <nuxt-link
                :to="{ path: localizedRoute(`/c/${categoryTree[0].slug}`) }"
                v-else
                >{{ categoryTree[0].label }}
              </nuxt-link>
              <div
                v-if="categoryTree[0].items && categoryTree[0].items.length > 0"
                class="dropdown-menu"
              >
                <ul>
                  <li>
                    <strong
                      @click="setCatchValNull"
                      class="backto-main sectond-back d-block d-md-none"
                    >
                      <nuxt-link to="#!" class="back-to">
                        <img src="/meccabook/down-arrow-2.svg" alt />
                      </nuxt-link>
                      {{ categoryTree[0].label }}
                    </strong>
                  </li>
                  <li
                    v-for="(subcategory, index) in categoryTree[0].items"
                    :key="index"
                  >
                    <label
                      v-if="subcategory.items"
                      @click="
                        catchSubCatvalue(
                          subcategory.label,
                          categoryTree[0].label,
                          subcategory
                        )
                      "
                      :class="subcatValue == subcategory.label ? subcategory.items.length > 0 ? 'active has-submenu':'active' : subcategory.items.length > 0 ? 'has-submenu':''"
                      class="dropdown-item cursor-pointer"
                    
                      >{{ subcategory.label }}</label
                    >
                    <nuxt-link
                      v-else
                      class="dropdown-item has-submenu b"
                      to="#!"
                    >
                      {{ subcategory.label }}
                    </nuxt-link>
                    <div
                      v-if="subcategory.items && subcategory.items.length"
                      class="third-lavelmenu"
                    >
                      <ul>
                        <li>
                          <strong
                            @click="SetsubcatNull"
                            class="backto-main second-back d-block d-md-none"
                          >
                            <nuxt-link to="#!" class="back-to">
                              <img src="/meccabook/down-arrow-2.svg" alt />
                            </nuxt-link>
                            {{ subcategory.label }}
                          </strong>
                        </li>
                        <li
                          v-for="(childcategory, index) in subcategory.items"
                          :key="index"
                        >
                          <nuxt-link
                            :to="
                              localePath(
                                getAgnosticCatLink(childcategory, subcategory)
                              )
                            "
                            class="level-item"
                            @click.native="toggleSidebar"
                          >
                            {{ childcategory.label }}
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item dropdown" @click="toggleSidebar">
              <nuxt-link
                to="/c/arabic-books"
                @click="catchVal(categoryTree[1].label)"
                v-if="categoryTree[1].items"
                class="nav-link"
                :class="categoryTree[1].label == categoryVal && screenWidth <= 767 ? 'active' : null"
                >{{
                  categoryTree[1].label === "Arabic Books"
                    ? "Arabic"
                    : categoryTree[1].label
                }}</nuxt-link
              >
              <nuxt-link
                :to="{ path: localizedRoute(`/c/${categoryTree[1].slug}`) }"
                v-else
                >{{ categoryTree[1].label }}
              </nuxt-link>
              <div
                v-if="categoryTree[1].items && categoryTree[1].items.length > 0"
                class="dropdown-menu"
              >
                <ul>
                  <li>
                    <strong
                      @click="setCatchValNull"
                      class="backto-main sectond-back d-block d-md-none"
                    >
                      <nuxt-link to="#!" class="back-to">
                        <img src="/meccabook/down-arrow-2.svg" alt />
                      </nuxt-link>
                      {{ categoryTree[1].label }}
                    </strong>
                  </li>
                  <li
                    v-for="(subcategory, index) in categoryTree[1].items"
                    :key="index"
                  >
                    <label
                      v-if="subcategory.items"
                      @click="
                        catchSubCatvalue(
                          subcategory.label,
                          categoryTree[1].label
                        )
                      "
                      :class="subcatValue == subcategory.label ? 'active' : ''"
                      class="dropdown-item has-submenu c"
                      >{{ subcategory.label }}</label
                    >
                    <nuxt-link
                      v-else
                      class="dropdown-item has-submenu d"
                      to="#!"
                    >
                      {{ subcategory.label }}
                    </nuxt-link>
                    <div
                      v-if="subcategory.items && subcategory.items.length"
                      class="third-lavelmenu"
                    >
                      <ul>
                        <li>
                          <strong
                            @click="SetsubcatNull"
                            class="backto-main second-back d-block d-md-none"
                          >
                            <nuxt-link to="#!" class="back-to">
                              <img src="/meccabook/down-arrow-2.svg" alt />
                            </nuxt-link>
                            {{ subcategory.label }}
                          </strong>
                        </li>
                        <li
                          v-for="(childcategory, index) in subcategory.items"
                          :key="index"
                        >
                          <nuxt-link to="/c/categories" class="level-item">
                            {{ childcategory.label }}
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item" @click="toggleSidebar">
              <router-link class="nav-link" to="/c/categories/gifts"
                >Gifts & Apparel</router-link
              >
            </li>
             <li class="nav-item dropdown">
              <label
                @click="catchVal(categoryTree[2].label)"
                v-if="categoryTree[2].items"
                class="nav-link dropdown-toggle blue-text Acme-font d-block d-md-none"
                :class="categoryTree[2].label == categoryVal && screenWidth <= 767 ? 'active' : null"
                ><nuxt-link to="/kids-home" class="blue-text Acme-font" @click.native="toggleSidebar">{{ categoryTree[2].label }}</nuxt-link></label
              >
              <nuxt-link to="/kids-home"
                @click="catchVal(categoryTree[2].label)"
                v-if="categoryTree[2].items"
                class="nav-link dropdown-toggle blue-text Acme-font d-none d-md-block"
                :class="categoryTree[2].label == categoryVal && screenWidth <= 767 ? 'active' : null"
                >{{ categoryTree[2].label }}</nuxt-link
              >
              <nuxt-link
                :to="{ path: localizedRoute(`/c/${categoryTree[2].slug}`) }"
                v-else
                >{{ categoryTree[2].label }}
              </nuxt-link>
              <div
                v-if="categoryTree[2].items && categoryTree[2].items.length > 0"
                class="dropdown-menu"
              >
                <ul>
                  <li>
                    <strong
                      @click="setCatchValNull"
                      class="backto-main sectond-back d-block d-md-none"
                    >
                      <nuxt-link to="#!" class="back-to">
                        <img src="/meccabook/down-arrow-2.svg" alt />
                      </nuxt-link>
                      {{ categoryTree[2].label }}
                    </strong>
                  </li>
                  <li
                    v-for="(subcategory, index) in categoryTree[2].items"
                    :key="index"
                    @click="toggleSidebar"
                  >
                    <label
                      v-if="subcategory.items"
                      @click="
                        catchSubCatvalue(
                          subcategory.label,
                          categoryTree[2].label,
                          subcategory
                        )
                      "
                      :class="subcatValue == subcategory.label ? subcategory.items.length > 0 ? 'active has-submenu':'active' : subcategory.items.length > 0 ? 'has-submenu':''"
                      class="dropdown-item cursor-pointer"
                      >{{ subcategory.label }}</label
                    >
                    <nuxt-link
                      v-else
                      class="dropdown-item   b"
                      to="#!"
                    >
                      {{ subcategory.label }}
                    </nuxt-link>
                    <div
                      v-if="subcategory.items && subcategory.items.length"
                      class="third-lavelmenu"
                    >
                      <ul>
                        <li>
                          <strong
                            @click="SetsubcatNull"
                            class="backto-main second-back d-block d-md-none"
                          >
                            <nuxt-link to="#!" class="back-to">
                              <img src="/meccabook/down-arrow-2.svg" alt />
                            </nuxt-link>
                            {{ subcategory.label }}
                          </strong>
                        </li>
                        <li
                          v-for="(childcategory, index) in subcategory.items"
                          :key="index"
                        >
                          <nuxt-link
                            :to="
                              localePath(
                                getAgnosticCatLink(childcategory, subcategory)
                              )
                            "
                            class="level-item"
                          >
                            {{ childcategory.label }}
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            <template v-if="menu && menu.header">
              <li
                class="nav-item"
                v-for="item in menu.header"
                :key="item.url"
              >
              <template v-if="item.child && item.child.length > 0">
                <div class="dropdown-menu">
                  <ul>
                  <li>
                    <strong
                      class="backto-main sectond-back d-block d-md-none"
                    >
                      <nuxt-link :to="item.url" class="back-to">
                        <img src="/meccabook/down-arrow-2.svg" alt />
                      </nuxt-link>
                      {{ item.name }}
                    </strong>
                  </li>
                  <li
                    v-for="(subcategory, index) in item.child"
                    :key="index"
                  >
                    <nuxt-link
                      class="dropdown-item f"
                      :to="subcategory[0].url"
                    >
                      {{ subcategory[0].name }}
                    </nuxt-link>
                  </li>
                  </ul>
                </div>
                <router-link class="nav-link dropdown-toggle" :to="item.url" @click.native=toggleSidebar>{{
                  item.name
                }}</router-link>
              </template>
                <div v-else>
                  <router-link class="nav-link" :to="item.url" @click.native=toggleSidebar
                  >{{
                  item.name
                  }}</router-link>
                </div>
              </li>
            </template>
          </ul>
          <div class="navigation-right">
            <div class="btn-wrap">
              <div
                id="accountContainer"
                class="Mobile-container"
                @mouseover="showDrop()"
                @mouseleave="closeDropDown()"
              >
                <button
                  type="button"
                  class="bg-cl-transparent brdr-none p0 account-menu-btn"
                  @click="showHideFunc"
                >
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0556 18.6836V16.6836C17.0556 14.4745 15.2597 12.6836 13.0444 12.6836H5.02222C2.80694 12.6836 1.01111 14.4745 1.01111 16.6836V18.6836"
                      stroke="#2C354E"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.03333 8.68359C11.2486 8.68359 13.0444 6.89273 13.0444 4.68359C13.0444 2.47445 11.2486 0.683594 9.03333 0.683594C6.81805 0.683594 5.02222 2.47445 5.02222 4.68359C5.02222 6.89273 6.81805 8.68359 9.03333 8.68359Z"
                      stroke="#2C354E"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-bind:class="[!isVisible ? 'hidder-style' : 'show-style']"
                  id="hideMe"
                >
                  <div class="signin-drpdwn">
                    <div
                      v-if="!isAuthenticated"
                      class="btn-wrp"
                      @click="handleAccountClick"
                    >
                      <nuxt-link to="" class="btn text-uppercase">
                        <span>sign in</span>
                      </nuxt-link>
                    </div>
                    <div
                      v-if="!isAuthenticated"
                      class="btn-wrp"
                      @click="showRegisterForm"
                    >
                      <nuxt-link to="" class="btn text-uppercase">
                        <span>Register</span>
                      </nuxt-link>
                    </div>
                    <div
                      v-if="isAuthenticated"
                      class="btn-wrp"
                      @click="logoutFunc"
                    >
                      <nuxt-link to="" class="btn text-uppercase">
                        <span>sign out</span>
                      </nuxt-link>
                    </div>
                    <nuxt-link
                      v-if="isAuthenticated"
                      to="/my-account/manage-account"
                      class="acc-link"
                      >Manage Account</nuxt-link
                    >
                    <nuxt-link v-if="isAuthenticated" to="/my-account/orders" class="acc-link"
                      >Orders</nuxt-link
                    >
                    <nuxt-link v-if="isAuthenticated" to="/my-account/wishlist" class="acc-link"
                      >Wishlist</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-wrap Addcart-wrap">
              <button @click="toggleCartSidebar" to="#" class="cart-btn">
                <div class="wrap-icon">
                  <i v-if="cartTotalItems" class="icon-counter">{{
                    cartTotalItems
                  }}</i>
                </div>
              </button>
              <div class="cart-wrapper">
                <div class="cart-preview">
                  <div
                    class="
                      preview-head
                      d-flex
                      align-items-center
                      justify-content-between
                    "
                  >
                    <h2 class="preview-title">Cart Preview</h2>
                    <span class="arrow-icn">
                      <img src="/meccabook/icon-long-arrow-navi.svg" alt />
                    </span>
                  </div>
                  <div
                    class="
                      cart-item
                      d-flex
                      justify-content-between
                      align-items-start
                    "
                  >
                    <div class="view-item" style="background-image: url()">
                      <div class="img-wrp">
                        <img
                          src="/meccabook/category-ratio-img.png"
                          alt="cart"
                        />
                      </div>
                    </div>
                    <div class="desc-item">
                      <h4 class="item-title">
                        The Mainstay: A Commentary on Qasida Al-Burda
                      </h4>
                      <p class="item-exp">Softcover</p>
                      <div class="item-prices">
                        <del>$49.95</del>
                        <span>$39.95</span>
                      </div>
                      <div class="included d-flex align-items-center">
                        <div class="inc-dcr-item">
                          <input type="button" value class="decre-btn" />
                          <input
                            type="text"
                            class="onlyNumber form-control pull-left"
                            value="1"
                            name="noOfRoom"
                          />
                          <input type="button" value class="incr-btn" />
                        </div>
                        <div class="orig-price">
                          <span>$39.95</span>
                        </div>
                        <nuxt-link to="#!" class="remove-ilnk text-underline"
                          >Remove</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      cart-item
                      d-flex
                      justify-content-between
                      align-items-start
                    "
                  >
                    <div class="view-item" style="background-image: url()">
                      <div class="img-wrp">
                        <img
                          src="/meccabook/product-slide-img.png"
                          alt="cart"
                        />
                      </div>
                    </div>
                    <div class="desc-item">
                      <h4 class="item-title">
                        The Mainstay: A Commentary on Qasida Al-Burda
                      </h4>
                      <p class="item-exp">Softcover</p>
                      <div class="item-prices">
                        <del>$49.95</del>
                        <span>$39.95</span>
                      </div>
                      <div class="included d-flex align-items-center">
                        <div class="inc-dcr-item">
                          <input type="button" value class="decre-btn" />
                          <input
                            type="text"
                            class="onlyNumber form-control pull-left"
                            value="1"
                            name="noOfRoom"
                          />
                          <input type="button" value class="incr-btn" />
                        </div>
                        <div class="orig-price">
                          <span>$39.95</span>
                        </div>
                        <nuxt-link to="#!" class="remove-ilnk text-underline"
                          >Remove</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      cart-item
                      d-flex
                      justify-content-between
                      align-items-start
                    "
                  >
                    <div class="view-item" style="background-image: url()">
                      <div class="img-wrp">
                        <img src="/meccabook/slide-img.png" alt="cart" />
                      </div>
                    </div>
                    <div class="desc-item">
                      <h4 class="item-title">
                        The Mainstay: A Commentary on Qasida Al-Burda
                      </h4>
                      <p class="item-exp">Softcover</p>
                      <div class="item-prices">
                        <del>$49.95</del>
                        <span>$39.95</span>
                      </div>
                      <div class="included d-flex align-items-center">
                        <div class="inc-dcr-item">
                          <input type="button" value class="decre-btn" />
                          <input
                            type="text"
                            class="onlyNumber form-control pull-left"
                            value="1"
                            name="noOfRoom"
                          />
                          <input type="button" value class="incr-btn" />
                        </div>
                        <div class="orig-price">
                          <span>$39.95</span>
                        </div>
                        <nuxt-link to="#!" class="remove-ilnk text-underline"
                          >Remove</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      sub-total
                      d-flex
                      align-items-center
                      justify-content-between
                    "
                  >
                    <span>
                      Subtotal
                      <sub>(3 items)</sub>
                    </span>
                    <span>$119.85</span>
                  </div>
                  <div class="btn-wrp">
                    <nuxt-link
                      to="#"
                      class="
                        btn
                        CartBtn
                        d-flex
                        align-items-center
                        justify-content-center
                      "
                    >
                      <span>continue to cart</span>
                    </nuxt-link>
                    <nuxt-link
                      to="#"
                      class="
                        btn
                        CartBtn
                        close-btn
                        d-flex
                        align-items-center
                        justify-content-center
                      "
                    >
                      <img src="/meccabook/icon-long-arrow-right.svg" alt />
                      <span>close</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <!-- </fixed-header> -->
  </div>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfIcon,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfOverlay,
} from "@storefront-ui/vue";
import {
  cartGetters,
  categoryGetters,
  useCart,
  useCategory,
  useCategorySearch,
  useFacet,
  useUser,
  useWishlist,
  wishlistGetters,
} from "@vue-storefront/magento";
import {
  computed,
  ref,
  ssrRef,
  onBeforeUnmount,
  watch,
  defineComponent,
  useRouter,
  useRoute,
  useContext,
  onMounted
} from "@nuxtjs/composition-api";


import { onSSR } from "@vue-storefront/core";
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js";
import debounce from "lodash.debounce";
import { useUiHelpers, useUiState } from "~/composables";
import LocaleSelector from "~/components/LocaleSelector.vue";
import SearchResults from "~/components/SearchResults.vue";
import { mapActions, mapGetters } from "vuex";
import algoliaSearch from "algoliasearch";
import FixedHeader from 'vue-fixed-header'
import axios from "axios";
export default defineComponent({
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    FixedHeader
  },
  data(){
    return{
      screenWidth: null
    }
  },
  props: {
    currentUser: {
      type: Object,
      default: null,
    },
    magentoURL: String,
    drupalURL: String
  },
  directives: { clickOutside },
  setup(props) {

    console.log(props.magentoURL)
    console.log(props.drupalURL)

    const router = useRouter();
    const route = useRoute();
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      setSearchResults,
    } = useUiState();
    const {
      setTermForUrl,
      getFacetsFromURL,
      getAgnosticCatLink,
      getAgnosticCatKidsLink,
    } = useUiHelpers();
    const { logout, isAuthenticated, load: loadUser } = useUser();
    const { localePath } = useContext();
    const { cart, load: loadCart } = useCart();
    const { wishlist } = useWishlist("GlobalWishlist");
    const { result: searchResult, search: productsSearch } =
      useFacet("AppHeader:Products");
    const { result: categories, search: categoriesSearch } = useCategorySearch(
      "AppHeader:Categories"
    );
    const { categories: categoryList, search: categoriesListSearch } =
      useCategory("AppHeader:CategoryList");

    const ribbinContent = ref(null);
    const term = ref(getFacetsFromURL().term);
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);
    const categoryVal = ref(null);
    const isVisible = ref(false);
    const showSidebar = ref(false);
    const subcatValue = ref("init");
    const searchIconVisible = ref(false);
    const wishlistHasProducts = computed(
      () => wishlistGetters.getTotalItems(wishlist.value) > 0
    );
    const wishlistItemsQty = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() =>
      isAuthenticated.value ? "profile_fill" : "profile"
    );

    const getRibbinContent = computed(() => ribbinContent.value);

    const logoutFunc = async () => {
      await logout();
      await router.push(localePath({ name: "home" }));

      return;
    };

    const menu = ssrRef(null);

    const fetchMenu = async () => {
      let menuURL = props.drupalURL+ '/api/menu'
      let data = await fetch(menuURL).then(res => res.json());
      return data;
    };

    const CSMpage = [
      { label: "Content", slug: "/content" },
      { label: "About us", slug: "/about-us" },
      { label: "contact", slug: "/contact-us" },
    ];
    // const categoryTree = computed(() =>
    // 	categoryGetters
    // 		.getCategoryTree(categoryList.value?.[0])
    // 		?.items.filter((c) => c.count > 0)
    // );
    const categoryTree = computed(() =>
      categoryGetters
        .getCategoryTree(categoryList.value?.[0])
        ?.items.filter((c) => c.count > 0)
    );

    const handleAccountClick = async () => {
      closeDropDown();

      if (isAuthenticated.value) {
        await router.push(route.value.path);
      } else {
        toggleLoginModal();
      }
    };

    watch(
      () => isAuthenticated.value,
      async (newVal, oldVal) => {
        if (newVal === true) {
          await router.push(route.value.path);
        }
      }
    );

    const searchTerm = ref(null);
    const useAlgoliaSearch = async () => {
      const client = algoliaSearch(
        "210ZCLJ1JA",
        "dc28e43107e238e1166d2a460327e113"
      );
      const index = client.initIndex("meccabook_magento_stage_default_products");
      await index
        .search(searchTerm.value)
        .then(({ hits }) => {
          setSearchResults(hits);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const redirectToSearchPage = () => {
      router.push({ path: "/search-results" });
    };
    watch(
      () => searchTerm.value,
      (newVal, oldVal) => {
        useAlgoliaSearch(newVal);
      }
    );

    const showRegisterForm = () => {
      closeDropDown();
      route.value.params.registerFlag = "on";
      toggleLoginModal();
    };

    onSSR(async () => {
      await Promise.all([
        loadUser(),
        loadCart(),
        categoriesListSearch({
          pageSize: 20,
        }),
      ]);

      menu.value = await fetchMenu();

    });

    const showDrop = () => {
      isVisible.value = true;
    };

    const closeDropDown = () => {
      isVisible.value = false;
    };

    const showHideFunc = () => {
      isVisible.value = !isVisible.value;
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;

      term.value = "";
      isSearchOpen.value = false;
    };

    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
      closeDropDown()
    };

    const catchVal = (e) => {
      categoryVal.value = e;
    };

    const setCatchValNull = () => {
      categoryVal.value = null;
    };

    const catchSubCatvalue = (e, title, obj) => {
      subcatValue.value = e;
      if (title == categoryTree.value[2].label) {
        router.push(getAgnosticCatKidsLink(obj));
      } else {
        router.push(getAgnosticCatLink(obj));
      }
    };

    const SetsubcatNull = () => {
      subcatValue.value = null;
    };

    const searchIconToggle = () => {
      searchIconVisible.value = !searchIconVisible.value;
    };

    const handleSearch = debounce(async (paramValue) => {
      term.value = !paramValue.target ? paramValue : paramValue.target.value;

      await Promise.all([
        productsSearch({
          itemsPerPage: 12,
          term: term.value,
        }),
        categoriesSearch({ filters: { name: { match: `${term.value}` } } }),
      ]);

      result.value = {
        products: searchResult.value?.data?.items,
        categories: categories.value.map((element) =>
          categoryGetters.getCategoryTree(element)
        ),
      };
    }, 1000);

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      term.value = "";
      return searchBarRef.value.$el.children[0].focus();
    };

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));

        if (shouldSearchBeOpened) isSearchOpen.value = true;
      }
    );

    const removeSearchResults = () => {
      result.value = null;
    };

    const fetchHomeRibbin = () => {
      axios.get("/ribbin")
          .then(response => {
            ribbinContent.value = response.data[0].data;
             })
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    onMounted(() => {
      fetchHomeRibbin();
    });

    return {
      accountIcon,
      cartTotalItems,
      categoryTree,
      CSMpage,
      closeOrFocusSearchBar,
      closeSearch,
      getAgnosticCatLink,
      getAgnosticCatKidsLink,
      handleAccountClick,
      handleSearch,
      isAuthenticated,
      isMobile,
      isSearchOpen,
      removeSearchResults,
      result,
      searchBarRef,
      setTermForUrl,
      term,
      toggleCartSidebar,
      toggleWishlistSidebar,
      wishlistHasProducts,
      wishlistItemsQty,
      categoryVal,
      isVisible,
      showDrop,
      closeDropDown,
      showHideFunc,
      showSidebar,
      toggleSidebar,
      catchVal,
      setCatchValNull,
      catchSubCatvalue,
      subcatValue,
      SetsubcatNull,
      searchIconVisible,
      searchIconToggle,
      searchTerm,
      useAlgoliaSearch,
      redirectToSearchPage,
      showRegisterForm,
      logoutFunc,
      menu,
      ribbinContent,
      getRibbinContent
    };
  },
  computed: {
    getDropdownStatus() {
      return this.$store.getters["homepage/getAccountDropdownStatuc"];
    },
    changeDropdownStatus() {
      return this.$store.getters["homepage/changeAccountDropdownStatuc"];
    },
    ...mapGetters("drupalcms", ["getMenuContent"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchMenu"]),
  },
  mounted() {
    console.log(this.$config);
    this.screenWidth = window.innerWidth
    //this.fetchMenu();
  },
});
</script>

<style lang="scss" scoped>
@import "/assets/css/main.scss";

.hidder-style {
  display: none;
}

.show-style {
  display: block;
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}

.arrow-right {
  transform: translateY(-50%) rotate(-90deg);
  margin: 5px 0 0 5px;
}

.third-lavelmenu ul {
  width: 93% !important;
}

@media (max-width: 752px) {
  .child-category-active {
    position: relative !important;
    right: 0px !important;
    z-index: 12;
  }

  .header-top .container {
    overflow: visible;
  }
}

.level-item {
  position: relative;

  .menu-items {
    display: none;
    padding: 10px;
    min-height: 100px;
    position: absolute;
    right: -190px;
    top: 0;
    width: 190px;
    background-color: #fff;
  }
}

.level-item:hover {
  .menu-items {
    display: block;
  }
}

@media (min-width: 768px) {
  .header-bottom .dropdown-menu {
    width: auto;
  }
}

.signin-drpdwn {
  top: 97% !important;
}

.signin-drpdwn .btn-wrp {
  padding: 10px 10px 5px;
}

.signin-drpdwn .btn-wrp .btn {
  display: block;
  width: 100%;
  padding: 7px 19px;
  letter-spacing: 0.08em;
}

.signin-popup {
  padding: 20px;
  background: $beige-third;
  width: 100%;
  position: relative;
  margin: 50px auto;
  max-width: 320px;
  @media all and (min-width: 768px) {
    padding: 30px;
    max-width: 440px;
    border-radius: 10px;
  }
  @media all and (min-width: 1200px) {
    max-width: 715px;
    border-radius: 20px;
    padding: 147px 64px 54px;
    max-height: 100vh;
    overflow: auto;
    margin: auto;
  }
  @media all and (max-width: 767px) {
    max-width: 100%;
    margin: 0;
  }

  .close-icn {
    @include abs(15px, 15px, auto, auto);
    width: 24px;
    height: 24px;
    @media all and (min-width: 1200px) {
      top: 17px;
      right: 22px;
    }
  }

  .logo {
    width: 140px;
    margin-bottom: 57px;
    @media all and (min-width: 768px) {
      width: 180px;
      margin-bottom: 41px;
    }
    @media all and (min-width: 1200px) {
      width: 331px;
    }
  }

  .btn-wrap {
    margin-bottom: 79px;
    @media all and (min-width: 1200px) {
      margin-bottom: 139px;
    }
  }
}

.icon-and-search {
  display: flex;
  align-items: center;
}

h2.sign-title {
  line-height: 1.2;
  letter-spacing: -0.035em;
  margin-bottom: 24px;
  @media all and (min-width: 1200px) {
    font-size: 24px;
  }
}

.sign-input-wrap {
  margin-bottom: 10px;
  @media all and (min-width: 1200px) {
    height: 75px;
    border-radius: 10px;
    margin: 10px 0;
    padding: 7px 19px;
  }

  label {
    @include fontsize(14px);
    line-height: 1.2;
    letter-spacing: -0.035em;
    margin-bottom: 6px;
  }

  .form-control {
    border: 0;
  }
}

.forget-pwd {
  margin-bottom: 20px;

  a,
  button {
    letter-spacing: -0.035em;
    text-decoration-line: underline;
    line-height: 1.3;
  }
}
.cursor-pointer {
  cursor: pointer !important;
}

.kids-sty {
  color: #21a6bb;
  font-size: 18px;
  font-weight: normal;
  font-family: "Acme", sans-serif;
}


.header {
  background: #FFFFFF;
  max-height: 350px;
  height: 100%;
  @media all and (max-width: 767px) {
    z-index: 99;
  }
}
.icon-search {
  @media all and (max-width: 767px) {
    background: url(/meccabook/icon-search-2.svg) no-repeat;
    margin-left: 10px;
  }
}
.account-btn {
  margin-top: 4px;
}
// .vue-fixed-header--isFixed {
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100%;
//   z-index: 995;
//   background: #FFFFFF;
//   box-shadow: 0px 4px 4px rgb(0 0 0 / 6%);
//   transition: all 0.7s ease-in;
//   max-height: 204px;
//   height: 100%;
// }
.active-serch {
  button {
     @media (max-width: 767px) {
       box-shadow: 0 2px 0 0 #f6b119;
       border-color: transparent;
     }
    i.icon-search {
      @media (max-width: 767px) {
        margin: 0;
      }
    }
  }
  
}
</style>
