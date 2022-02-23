import cn from "./style.module.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { host } from "../../../../constants"
import { arraySum } from "../../../../utils/arraySum"
import { GreenLine } from "../../../UI/greenLine"
import { RedLine } from "../../../UI/redLine"
import { HelpLine } from "../../../UI/helpLine"
import { useLocation } from "react-router-dom"
import { Loader } from "../../../UI/loader"
import { showSuccessLineAction, hideSuccessLineAction } from "../../../../store/successLine/actions"
import { showHelpLineAction, hideHelpLineAction } from "../../../../store/helpLine/actions"
import { showWrongLineAction, hideWrongLineAction } from "../../../../store/wrongLine/actions"

export const Cart = ({ tgId, haveSw, currency, mount }) => {
  console.log("render cart")
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { t } = useSelector(state => state.lang)
  const { helpText, helpShow } = useSelector(state => state.helpLine)
  const { successText, successShow } = useSelector(state => state.successLine)
  const { wrongText, wrongShow } = useSelector(state => state.wrongLine)
  const uid = localStorage.getItem("uid")
  const bid = pathname.split("/")[2]
  const [cart, setCart] = useState(null)
  const [pickUpTime, setPickUpTime] = useState("")
  const [sw, setSw] = useState("")
  const [loading, setLoading] = useState(false)
  const total = []

  function currencySymbol(currency) {
    switch (currency) {
      case "usd":
        return "$"
      case "eur":
        return "€"
      case "rub":
        return "rub"
      default:
        return
    }
  }

  async function clearCart() {
    setLoading(true)
    await axios.delete(`${host}user/cart?uid=${uid}`)
      .then(() => setCart(null))
      .finally(() => setLoading(false))
  }

  async function sendOrder(e) {
    e.preventDefault()
    setLoading(true)
    await axios.post(`${host}user/sendOrder?uid=${uid}`, {
      chatId: tgId,
      order: cart,
      pTime: pickUpTime,
      bid: bid,
      sum: arraySum(total) + currencySymbol(currency),
      sw: sw
    })
      .then(() => {
        dispatch(showSuccessLineAction(t?.successLine.orderSended))
        setCart(null)
        setSw("")
        setTimeout(() => {
          dispatch(hideSuccessLineAction())
        }, 3000)
      })
      .catch((res) => {
        if (res.message.search(301) > 0) {
          dispatch(showHelpLineAction(t?.helpLine.fillInfo))
          setTimeout(() => {
            dispatch(hideHelpLineAction())
          }, 4000)
        } else {
          dispatch(showWrongLineAction(t?.wrongLine.badSw))
          setTimeout(() => {
            dispatch(hideWrongLineAction())
          }, 4000)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    async function getCart() {
      setLoading(true)
      await axios.get(`${host}user/cart?uid=${uid}`)
        .then((res) => {
          res.data.length && setCart(res.data.filter(pos => bid in pos))
        })
        .finally(() => setLoading(false))
    }
    mount && getCart()
  }, [uid, bid, mount])

  if (loading) return <Loader />

  return (
    <div className={cn.cartWrapper}>
      <h2>{t?.cart.windowTitle}</h2>
      <button onClick={clearCart}>{t?.cart.clearBtn}</button>
      <div className={cn.cartItems}>
        {cart
          ? cart.map((item, index) =>
            <div key={index} className={cn.cartItem}>
              <div>{item[bid]?.title}</div>
              <div>{item[bid]?.option}</div>
              <div className={cn.hideDiv}>
                {total.push(!isNaN(parseInt(item[bid]?.price))
                  && parseInt(item[bid]?.price))}
              </div>
            </div>)
          : <div className={cn.cartEmpty}>{t?.cart.emptyStr}</div>}
      </div>
      {haveSw && <div className={cn.sw}>
        <input
          type="text"
          placeholder="secret word"
          value={sw}
          onChange={(e) => setSw(e.target.value)} />
      </div>}
      {total.length > 0 && <div className={cn.cartTotal}>
        {t?.cart.total}{arraySum(total) + currencySymbol(currency)}
      </div>}
      <form onSubmit={(e) => sendOrder(e)} className={cn.formSendOrder}>
        <div className={cn.divTime}>
          {t?.cart.pickUp}
          <input
            type="time"
            value={pickUpTime}
            onChange={(e) => setPickUpTime(e.target.value)}
            min="10:00"
            max="20:00"
            required />
        </div>
        {<button disabled={!tgId || loading || !cart}>{t?.cart.orderBtn}</button>}
      </form>
      <GreenLine visible={successShow}>{successText}</GreenLine>
      <RedLine visible={wrongShow}>{wrongText}</RedLine>
      <HelpLine visible={helpShow}>{helpText}</HelpLine>
    </div>
  )
}