<template>
     <div class="wrapper-blog">
      <section class="categories wishlist-content">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="breadcrumb-wrapper" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Account
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="category-block d-lg-flex justify-content-between">
                <div class="left-menu d-block">
                  <div class="category-menu">
                    <h2>Your Account</h2>
                    <ul class="account-menu">
                      <li><a href="#!" class="ac-nm">Manage Account</a></li>
                      <li><a href="#!" class="ac-nm">Orders</a></li>
                      <li><a href="#!" class="ac-nm">Payment Methods</a></li>
                      <li><a href="#!" class="ac-nm">Wishlist</a></li>
                    </ul>
                  </div>
                </div>
                <div class="right-block">
                  <h3 class="d-none block-title d-lg-block">Wishlist</h3>
                  <div class="category-filter d-lg-none">
                    <div class="btn-wrap prev">
                      <a href="#" class="prev-btn">
                        <i class="icon-change"></i>
                      </a>
                    </div>
                    <div class="filter-wrap">
                      <select>
                        <option value="filter">filter</option>
                        <option value="filter">filter</option>
                        <option value="filter">filter</option>
                      </select>
                    </div>
                    <div class="sort-wrap">
                      <select>
                        <option value="sort">sort</option>
                        <option value="sort">sort</option>
                        <option value="sort">sort</option>
                      </select>
                    </div>
                    <div class="btn-wrap next">
                      <a href="#" class="next-btn">
                        <i class="icon-change"></i>
                      </a>
                    </div>
                  </div>
                  <div class="filters-wrap">
                    <div class="filter-left">
                      <div class="items-select d-none d-lg-block">
                        <select>
                          <option>Show 24 per page</option>
                          <option>Show 24 per page</option>
                          <option>Show 24 per page</option>
                        </select>
                      </div>
                      <div class="items-sort d-none d-lg-block">
                        <select>
                          <option>Sort by position</option>
                          <option>Sort by position</option>
                          <option>Sort by position</option>
                        </select>
                      </div>
                      <div class="filter-btn d-none d-lg-block">
                        <a href="#!">
                          <i class="icon-top"></i>
                        </a>
                      </div>
                    </div>
                    <div class="filter-right d-none d-lg-block">
                      <div class="page-details">
                        <p>Showing 1-24 of 58 items</p>
                        <div class="page-select">
                          <select>
                            <option>Page 1</option>
                            <option>Page 2</option>
                            <option>Page 3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="top-block">
                    <div class="category-wrap listcat-vw">
                      <div
                        class="
                          list-mobver
                          d-flex
                          justify-content-between
                          align-items-start
                          d-md-none
                        "
                      >
                        <div
                          class="category-img"
                          style="background-image: url('')"
                        >
                          <div class="img-wrap">
                            <img
                              src="/meccabook/category-ratio-img.png"
                              alt="category"
                              title="category"
                            />
                          </div>
                        </div>
                        <div class="category-left">
                          <div class="category-name">
                            Mainstay: A commentary on ... 3 line max
                          </div>
                          <div class="category-info">
                            Shaykh Ahmad Ibn’Ajiba Al-Hasani ... 2 line max
                          </div>
                          <div class="price-wrap">$49.95</div>
                          <div class="rating">
                            <div class="ratings-wrap">
                              <img
                                src="/meccabook/ratings.png"
                                alt="rating"
                                title="rating"
                              />
                            </div>
                            <a href="#!" class="remove-ilnk text-underline ml-0"
                              >Remove</a
                            >
                          </div>
                        </div>
                      </div>
                      <div
                        class="category-img mob-lt-hide"
                        style="background-image: url('')"
                      >
                        <div class="img-wrap">
                          <img
                            src="/meccabook/category-ratio-img.png"
                            alt="category"
                            title="category"
                          />
                        </div>
                      </div>
                      <div class="category-details">
                        <div class="category-left">
                          <div class="category-name">
                            Mainstay: A commentary on Qasida Al-Burda
                          </div>
                          <div class="category-info">
                            Shaykh Ahmad Ibn’Ajiba Al-Hasani
                          </div>
                          <div class="price-wrap">$49.95</div>
                          <div class="rating">
                            <div class="ratings-wrap">
                              <img
                                src="/meccabook/ratings.png"
                                alt="rating"
                                title="rating"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="category-right">
                          <div class="wishlist-wrap remove-wishlist">
                            <a href="#">
                              <i class="icon-wishlist"></i>
                              <span class="text">Remove from wishlist </span>
                            </a>
                          </div>
                          <div class="preview-wrap">
                            <a href="#">
                              <i class="icon-search"></i>
                              <span class="text">See preview</span>
                            </a>
                          </div>

                          <div class="share-wrap">
                            <a href="#">
                              <i class="icon-share"></i>
                              <span class="text">Share with friends</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="category-wrap listcat-vw">
                      <div
                        class="
                          list-mobver
                          d-flex
                          justify-content-between
                          align-items-start
                          d-md-none
                        "
                      >
                        <div
                          class="category-img"
                          style="background-image: url()"
                        >
                          <div class="img-wrap">
                            <img
                              src="/meccabook/category-ratio-img.png"
                              alt="category"
                              title="category"
                            />
                          </div>
                        </div>
                        <div class="category-left">
                          <div class="category-name">
                            Mainstay: A commentary on ... 3 line max
                          </div>
                          <div class="category-info">
                            Shaykh Ahmad Ibn’Ajiba Al-Hasani ... 2 line max
                          </div>
                          <div class="price-wrap">$49.95</div>
                          <div class="rating">
                            <div class="ratings-wrap">
                              <img
                                src="/meccabook/ratings.png"
                                alt="rating"
                                title="rating"
                              />
                            </div>
                            <a href="#!" class="remove-ilnk text-underline ml-0"
                              >Remove</a
                            >
                          </div>
                        </div>
                      </div>
                      <div
                        class="category-img mob-lt-hide"
                        style="background-image: url()"
                      >
                        <div class="img-wrap">
                          <img
                            src="/meccabook/category-ratio-img.png"
                            alt="category"
                            title="category"
                          />
                        </div>
                      </div>
                      <div class="category-details">
                        <div class="category-left">
                          <div class="category-name">
                            Mainstay: A commentary on Qasida Al-Burda
                          </div>
                          <div class="category-info">
                            Shaykh Ahmad Ibn’Ajiba Al-Hasani
                          </div>
                          <div class="price-wrap">$49.95</div>
                          <div class="rating">
                            <div class="ratings-wrap">
                              <img
                                src="/meccabook/ratings.png"
                                alt="rating"
                                title="rating"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="category-right">
                          <div class="wishlist-wrap remove-wishlist">
                            <a href="#">
                              <i class="icon-wishlist"></i>
                              <span class="text">Remove from wishlist </span>
                            </a>
                          </div>
                          <div class="preview-wrap">
                            <a href="#">
                              <i class="icon-search"></i>
                              <span class="text">See preview</span>
                            </a>
                          </div>

                          <div class="share-wrap">
                            <a href="#">
                              <i class="icon-share"></i>
                              <span class="text">Share with friends</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<style lang="scss" scoped>
.items-select{
  @media all and (min-width: 992px){
    margin-right: 41px;
  }
}
</style>