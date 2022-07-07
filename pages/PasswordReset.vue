<template>
<div class="popup-overlay active">
<div class="signin-popup">
<a href="/" class="close-icn">
<img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
</a>
<div class="text-center">
<a href="#!" class="logo">
<img src="/meccabook/logo.svg" alt="logo" title="logo" />
</a>
</div>
<h2 class="sign-title text-center">Set a new password</h2>
<div v-if="!isPasswordChanged">
<ValidationObserver
v-slot="{ handleSubmit }"
key="log-in"
class="reset-password"
>
<form
@submit.prevent="handleSubmit(setNewPassword);"
>
<div class="sign-input-wrap">
<ValidationProvider
v-slot="{ errors }"
rules="required|password"
>
<label class="text-uppercase">New Password</label>
<input v-model="form.password" type="password" class="form-control" placeholder="" />
<p>{{errors[0]}}</p>
</ValidationProvider>
</div>
<div class="sign-input-wrap mt-5">
<ValidationProvider
v-slot="{ errors }"
rules="required"
>
<label class="text-uppercase ">confirm Password</label>
<input v-model="form.repeatPassword" type="password" class="form-control" placeholder="" />
<p>{{errors[0]}}</p>
</ValidationProvider>
</div>
<div v-if="passwordMatchError != null">
</div>
<div class="btn-wrap mt-5">
<SfButton
type="submit"
class="btn larg-btn text-uppercase"
:disabled="forgotPasswordLoading"
>
<span>{{ $t('Set Password') }}</span>
</SfButton>
</div>

</form>
</ValidationObserver>
</div>
<div v-else>
<p class="text-center">{{ $t('Password Changed') }}</p>
 <div class="btn-wrap text-center btn-home">
 <SfButton link="/" class="back-link back-home" type="button">
 Back to Home
</SfButton>

</div>
</div>
</div>
</div> 
</template>

<script>
import { SfButton, SfLoader, SfInput, SfHeading } from "@storefront-ui/vue";
import { ref, computed, defineComponent } from "@nuxtjs/composition-api";
import {useUser,
  useForgotPassword,
  forgotPasswordGetters,
} from "@vue-storefront/magento";

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import {
  customerPasswordRegExp,
  invalidPasswordMsg,
} from "../helpers/customer/regex";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("password", {
  message: invalidPasswordMsg,
  validate: (value) => customerPasswordRegExp.test(value),
});

export default defineComponent({
  name: "ResetPassword",
  components: {
    SfButton,
    SfHeading,
    SfLoader,
    SfInput,
    ValidationProvider,
    ValidationObserver,
  },
  middleware({ redirect, route }) {
    if (!route.query.token) {
      return redirect("/");
    }
  },
  setup(props, context) {
      const { login} = useUser();
    const {
      result,
      setNew,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    } = useForgotPassword();
    const passwordMatchError = ref(false);
    const form = ref({});
    const isPasswordChanged = computed(() =>
      forgotPasswordGetters.isPasswordChanged(result.value)
    );
   const isSubscribed = ref(false);
    const { token } = context.root.$route.query;
    const {email}=context.root.$route.query;

    const setNewPassword = async () => {
      passwordMatchError.value = false;
      if (form.value.password !== form.value.repeatPassword) {
        passwordMatchError.value = "Passwords do not match";
        return;
      }

      await setNew({
        tokenValue: token,
        newPassword: form.value.password,
        email:email,
      });
    handleLogin();
    };

    const handleForm = (fn) => async () => {
      console.log(form.value);
      await fn({
        user: {
          username:email,
          password:form.value.password,
          is_subscribed: isSubscribed.value,
          
        },
        
      });
    };
const handleLogin = async () => handleForm(login)(
  console.log("healoooooooooooooooooo"),
  console.log(form.value.password)
);
    return {
      isPasswordChanged,
      form,
      setNewPassword,
      forgotPasswordLoading,
      forgotPasswordError,
      passwordMatchError,
      token,
      result,
      email,
       handleLogin,
        login,
         isSubscribed
    };
  },
});
</script>

   <style lang="scss" scoped>
   .reset-password {
     width: 100%;
   }
   .sign-input-wrap {
    span {
        width: 100%;
    }
}
   .back-link {
            margin-top: 10px;
            font-size: 14px;
            line-height: 1.3;
            color: #988146;
            background: transparent;
            letter-spacing: -0.035em;
            text-decoration-line: underline;
            font-family: "leksa", serif;
            background: transparent !important ;
            @media all and (min-width: 1200px) {
                font-size: 24px;
            }
        }
    </style>
