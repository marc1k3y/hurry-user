import { SET_EN, SET_RU } from "./actions"

const en = {
  auth: {
    windowTitle: "Welcome!",
    loginLabel: "Enter login",
    passLabel: "Enter password",
    privacyPlc: "privacy policy",
    loginBtn: "Sign in",
    regBtn: "Sign up",
    idha: "I don't have account",
    iha: "I have account",
    forgotPass: "forgot password"
  },
  forgot: {
    windowTitle: "Forgot password",
    loginLabel: "Enter login",
    approveBtn: "Approve"
  },
  shops: {
    windowTitle: "Cafe list",
    locFilter: "Looking cafes in my city",
    rateCount: "rating:"
  },
  shopPage: {
    switchShop: "shop",
    switchCart: "cart",
    rateCount: "RATE:",
    toCartBtn: "to cart",
    nextBtn: "next",
    prevBtn: "prev"
  },
  cart: {
    windowTitle: "Cart",
    clearBtn: "clear",
    emptyStr: "Cart empty",
    total: "Total: ",
    pickUp: "Pick up at: ",
    orderBtn: "Order"
  },
  profile: {
    windowTitle: "Profile info",
    nickLabel: "Nickname",
    fdrinkLabel: "Faworite frink",
    countryLabel: "Country",
    cityLabel: "City",
    saveBtn: "save",
    logoutBtn: "log out",
    copiedText: "copied! Send this code to ",
    botLink: "bot",
    genText: "Connect with Telegram",
    genBtn: "connect",
    changePass: "Change password",
    newPassPlc: "new password",
    repPassPlc: "repeat password",
    changeBtn: "change"
  },
  helpLine: {
    helperName: "Eva",
    tgConnect: "Please connect with Telegram Bot",
    fillInfo: "Please fill Nickname, Country and City",
    tryAgain: "Please try again",
    loginExist: "Login already exist",
    busNotReady: "Business didn't complete registration"
  },
  successLine: {
    passChanged: "Password changed sucessful",
    infoSaved: "Info saved",
    orderSended: "Order sended, have a good day!"
  },
  wrongLine: {
    badSw: "Wrong secret word :("
  },
  footer: {
    bca: "buy coffee author"
  },
  links: {
    here: "here"
  }
}

const ru = {
  auth: {
    windowTitle: "Привет!",
    loginLabel: "Введите логин",
    passLabel: "Введите пароль",
    privacyPlc: "политика приватности",
    loginBtn: "Войти",
    regBtn: "Регистрация",
    idha: "У меня нет аккаунта",
    iha: "У меня есть аккаунт",
    forgotPass: "забыл пароль"
  },
  forgot: {
    windowTitle: "Забыл пароль",
    loginLabel: "Введите логин",
    approveBtn: "Подтвердить"
  },
  shops: {
    windowTitle: "Список кафе",
    locFilter: "Показывать кафе моего города",
    rateCount: "рейтинг:"
  },
  shopPage: {
    switchShop: "кафе",
    switchCart: "чек",
    rateCount: "РЕЙТИНГ:",
    toCartBtn: "добавить",
    nextBtn: "далее",
    prevBtn: "назад"
  },
  cart: {
    windowTitle: "Чек",
    clearBtn: "очистить",
    emptyStr: "Чек пуст",
    total: "Сумма: ",
    pickUp: "Заберу в: ",
    orderBtn: "Заказать"
  },
  profile: {
    windowTitle: "Профиль",
    nickLabel: "Никнейм",
    fdrinkLabel: "Любимый напиток",
    countryLabel: "Страна",
    cityLabel: "Город",
    saveBtn: "сохранить",
    logoutBtn: "выйти из аккаунта",
    copiedText: "Скопировано! Отправьте этот код ",
    botLink: "боту",
    genText: "Связать с Телеграм",
    genBtn: "связать",
    changePass: "Сменить пароль",
    newPassPlc: "новый пароль",
    repPassPlc: "повторите пароль",
    changeBtn: "сменить"
  },
  helpLine: {
    helperName: "Ева",
    tgConnect: "Пожалуйста свжите аккаунт с Телеграм Ботом",
    fillInfo: "Пожалуйста заполните информацию Никнейм, Страна и Город",
    tryAgain: "Пожалуйста попробуйте ещё раз",
    loginExist: "Такой логин уже используется",
    busNotReady: "Заведение пока не готово принять заказ"
  },
  successLine: {
    passChanged: "Пароль успешно изменён",
    infoSaved: "Информация сохранена",
    orderSended: "Заказ отправлен, хорошего дня!"
  },
  wrongLine: {
    badSw: "Неправильное секретное слово :("
  },
  footer: {
    bca: "купить кофе автору"
  },
  links: {
    here: "здесь"
  }
}

export function TranslateReducer(state = {}, action) {
  switch (action.type) {
    case SET_EN:
      localStorage.setItem("lang", "en")
      return { ...state, t: en, curLang: "en" }
    case SET_RU:
      localStorage.setItem("lang", "ru")
      return { ...state, t: ru, curLang: "ru" }
    default:
      return state
  }
}