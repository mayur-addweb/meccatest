<template>
  <div v-if="isLoginModalOpen" class="wrapper">
    <div class="popup-overlay active d-md-block">
      <div class="signin-popup signin-up">
        <a href="" class="close-icn" @click="closeModal">
          <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
        </a>
        <div class="text-center">
          <a href="#!" class="logo">
            <img src="/meccabook/logo.svg" alt="logo" title="logo" />
          </a>
        </div>
        <h2 v-if="isLogin && !createAccount" class="sign-title text-center">
          Sign In
        </h2>
        <h2 v-if="createAccount" class="sign-title text-center">Register</h2>
        <AwLoader :class="{ loading }" :loading="loading">
        <div v-if="isLogin && !createAccount">
          <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
            <form class="form-wrap" @submit.prevent="handleSubmit(handleLogin)">
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <label class="text-uppercase">email address</label>
                  <p class="error-msg" v-if="setShowError">{{ errors[0] }}</p>
                  <input
                    v-model="form.username"
                    name="email"
                    type="text"
                    class="form-control"
                    placeholder
                    @blur="handleBlur()"
                    @focus="handleFocus()"
                  />
                </ValidationProvider>
              </div>
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="text-uppercase">password</label>
                  <p class="error-msg" v-if="setShowError">{{ errors[0] }}</p>
                  <input
                    v-model="form.password"
                    name="password"
                    type="password"
                    class="form-control"
                  />
                </ValidationProvider>
              </div>
              <div class="forget-pwd text-center">
                <a class="forget-pwd-link" @click="setIsForgottenValue(true)">
                  Forgot password
                </a>
              </div>
              <p v-if="error.login" class="submit-error-msg">
                {{ error.login }}
              </p>
              <div class="btn-wrap btn-submit">
                <button type="submit" class="btn larg-btn text-uppercase">
                  <span>sign in</span>
                </button>
              </div>
            </form>
            <div class="btn-wrap bottom-0">
              <button
                class="btn small-btn text-uppercase"
                @click="showRegister"
              >
                <span>create account</span>
              </button>
            </div>
            <div
              class="btn-wrap btn-submit"
              v-if="$route.path === '/checkout-cart'"
            >
              <button
                @click="closeModal"
                class="btn text-uppercase continue-btn"
              >
                <span>Continue As Guest</span>
              </button>
            </div>
          </ValidationObserver>
        </div>

        <div v-else-if="isForgotten" key="log-in">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="form-wrap"
              @submit.prevent="handleSubmit(handleForgotten)"
            >
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <label class="text-uppercase">Email Address</label>
                  <p class="error-msg" v-if="setShowError">{{ errors[0] }}</p>
                  <input
                    v-model="form.username"
                    type="text"
                    class="form-control"
                    @blur="handleBlur()"
                    @focus="handleFocus()"
                  />
                </ValidationProvider>
              </div>
              <div v-if="forgotPasswordError.request" class="submit-error-msg">
                {{
                  $t(
                    "It was not possible to request a new password, please check the entered email address."
                  )
                }}
              </div>
              <div class="btn-wrap btn-submit">
                <button type="submit" class="btn larg-btn text-uppercase">
                  <span>Reset</span>
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>

        <div
          v-else-if="
            isThankYouAfterForgotten &&
            !createAccount &&
            !isLogin &&
            !isForgotten
          "
          class="thank-you"
        >
          <i18n
            tag="p"
            class="thank-you__paragraph"
            path="forgotPasswordConfirmation"
          >
            <span class="thank-you__paragraph--bold">{{ userEmail }}</span>
          </i18n>
          <p class="thank-you__paragraph">{{ $t("Thank You Inbox") }}</p>
        </div>

        <div v-if="createAccount">
          <ValidationObserver v-slot="{ handleSubmit }" key="register">
            <form
              class="form-wrap"
              @submit.prevent="handleSubmit(handleRegister)"
            >
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|alpha">
                  <label class="text-uppercase">Firstname</label>
                  <p class="error-msg">{{ errors[0] }}</p>
                  <input
                    v-model="form.firstName"
                    name="first-name"
                    type="text"
                    class="form-control"
                  />
                </ValidationProvider>
              </div>
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|alpha">
                  <label class="text-uppercase">Lastname</label>
                  <p class="error-msg">{{ errors[0] }}</p>
                  <input
                    v-model="form.lastName"
                    name="last-name"
                    type="text"
                    class="form-control"
                  />
                </ValidationProvider>
              </div>
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <label class="text-uppercase"> Email address</label>
                  <p class="error-msg" v-if="setShowError">{{ errors[0] }}</p>
                  <input
                    v-model="form.email"
                    name="your-email"
                    type="text"
                    class="form-control"
                    placeholder
                    @blur="handleBlur()"
                    @focus="handleFocus()"
                  />
                </ValidationProvider>
              </div>
              <div class="sign-input-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="text-uppercase">Password</label>
                  <p class="error-msg">{{ errors[0] }}</p>
                  <input
                    v-model="form.password"
                    name="password"
                    type="password"
                    class="form-control"
                  />
                </ValidationProvider>
              </div>

              <div class="sign-input-wrap">
                <label class="text-uppercase">Confirm Password</label>
                <p v-if="passwordConfirmationError" class="error-msg">
                  Passwords do not match
                </p>
                <input
                  v-model="form.c_password"
                  name="confirm-password"
                  type="password"
                  class="form-control"
                  @focus="resetPcError"
                />
              </div>

              <div v-if="error.register" class="submit-error-msg">
                {{ error.register }}
              </div>
              <div class="btn-wrap btn-submit">
                <button type="submit" class="btn larg-btn text-uppercase">
                  <span>Register</span>
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        </AwLoader>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ref,
  watch,
  reactive,
  defineComponent,
  computed,
  onBeforeUpdate,
  onMounted,
  useRoute,
  useRouter,
} from "@nuxtjs/composition-api";
import {
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfLoader,
  SfBar,
} from "@storefront-ui/vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email,alpha } from "vee-validate/dist/rules";
import { useUser, useForgotPassword } from "@vue-storefront/magento";
import { useUiState } from "~/composables";
import AwLoader from "../pages/AwComponents/atoms/AwLoader.vue"
import {
  customerPasswordRegExp,
  invalidPasswordMsg,
} from "~/helpers/customer/regex";

extend("alpha",{
  ...alpha,
  message:"Must have Alphabets only"
});
extend("email", {
  ...email,
  message: "Invalid email",
});

extend("required", {
  ...required,
  message: "This field is required",
});

extend("password", {
  message: invalidPasswordMsg,
  validate: (value) => customerPasswordRegExp.test(value),
});

export default defineComponent({
  name: "LoginModal",
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    ValidationProvider,
    ValidationObserver,
    SfBar,
    AwLoader
  },
  data(){
    return {
      showError: true,
    }
  },
  computed:{
    setShowError(){
      return this.showError;
    }
  },
  methods:{
    handleBlur(){
      this.showError = !this.showError;
    },
    handleFocus(){
      this.showError = false;
    }
  },
  setup() {
    const { isLoginModalOpen, toggleLoginModal, isRegisterFlagOn } =
      useUiState();
    const isSubscribed = ref(false);
    const form = ref({});
    const isLogin = ref(true);
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const isForgotten = ref(false);
    const isThankYouAfterForgotten = ref(false);
    const userEmail = ref("");
    const screenWidth = ref(0);
    const { register, login, loading, error: userError } = useUser();
    const route = useRoute();
    const router = useRouter();
    const passwordConfirmationError = ref(false);

    const {
      request,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    } = useForgotPassword();

    const barTitle = computed(() => {
      if (isLogin.value) {
        return "Sign in";
      }
      if (isForgotten.value || isThankYouAfterForgotten.value) {
        return "Reset Password";
      }
      return "Register";
    });

    const error = reactive({
      login: null,
      register: null,
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
      }
    });

    const setIsLoginValue = (value) => {
      resetErrorValues();
      isLogin.value = value;
    };

    const setIsForgottenValue = (value) => {
      resetErrorValues();
      isForgotten.value = value;
      isLogin.value = !value;
    };

    const closeModal = () => {
      setIsForgottenValue(false);
      setIsLoginValue(true);
      createAccount.value = false;
      isThankYouAfterForgotten.value = false;
      route.value.params.registerFlag = "off";
      resetPcError();

      toggleLoginModal();
    };

    const continueGuest = () => {
      toggleLoginModal();
      router.push("/");
    };

    const handleForm = (fn) => async () => {
      console.log(form.value);
      resetErrorValues();
      await fn({
        user: {
          ...form.value,
          is_subscribed: isSubscribed.value,
        },
        
      });

      const hasUserErrors = userError.value.register || userError.value.login;
      if (hasUserErrors) {
        error.login = userError.value.login?.message;
        error.register = userError.value.register?.message;
        return;
      }
      toggleLoginModal();
    };

    const handleRegister = async () => {
      if (form.value.password !== form.value.c_password) {
        passwordConfirmationError.value = true;
        return;
      }

      handleForm(register)();
    };

    const handleLogin = async () => handleForm(login)();

    const handleForgotten = async () => {
      userEmail.value = form.value.username;
      await request({ email: userEmail.value });

      if (!forgotPasswordError.value.request) {
        isThankYouAfterForgotten.value = true;
        isForgotten.value = false;
      }
    };

    const resetPcError = () => {
      passwordConfirmationError.value = false;
    };

    const currentScreenIsMobile = computed(() => {
      return screenWidth.value <= 768
        ? "signin-popup d-block d-md-none"
        : "popup-overlay active d-none d-md-block";
    });

    const showRegister = () => {
      setIsLoginValue(false);
      setIsForgottenValue(false);
      isThankYouAfterForgotten.value = false;
      createAccount.value = true;
    };

    onMounted(() => {
      screenWidth.value = window.innerHeight;
    });

    onBeforeUpdate(() => {
      if (isRegisterFlagOn.value === true) {
        createAccount.value = true;
      }
    });

    return {
      barTitle,
      closeModal,
      createAccount,
      error,
      forgotPasswordError,
      forgotPasswordLoading,
      form,
      handleForgotten,
      handleLogin,
      handleRegister,
      isForgotten,
      isLogin,
      isLoginModalOpen,
      isSubscribed,
      isThankYouAfterForgotten,
      loading,
      rememberMe,
      setIsForgottenValue,
      setIsLoginValue,
      userEmail,
      userError,
      screenWidth,
      currentScreenIsMobile,
      showRegister,
      passwordConfirmationError,
      resetPcError,
      continueGuest,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}

.form {
  margin-top: var(--spacer-sm);

  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--secondary);

  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}

.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}

.checkbox {
  margin-bottom: var(--spacer-2xl);
}

.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);

  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}

.btn-wrap {
  margin-inline: auto;
}

.btn-submit {
  margin-block-end: 0;
}

.sign-input-wrap {
  position: relative;
  margin-block-end: 20px;
}

span {
  display: block;
}

.error-msg {
  position: absolute;
  bottom: -35px;
  left: 0;
  color: rgb(216, 40, 40);
}

.submit-error-msg {
  color: rgb(216, 40, 40);
  padding: 1rem;
  margin-block-end: 1rem;
  font-size: 18px;
}

.form-wrap {
  width: 100%;
}

.bottom-32 {
  margin-block-end: 2rem;
}

.bottom-0 {
  margin-block-end: 0;
}

.continue-btn {
  margin-top: 90px !important;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  height: 40px;
  @media all and (min-width: 1200px) {
      margin-top: 139px !important;
      height: 80px !important;
  }
 
}
.popup-overlay {
    @media all and (max-width: 767px) {
        background: #faf8f3 !important;
    }
}
</style>
