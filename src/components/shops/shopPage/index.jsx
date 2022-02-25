import cn from "./style.module.css"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import like from "../../../assets/like.svg"
import dislike from "../../../assets/dislike.svg"
import address from "../../../assets/address.svg"
import { host } from "../../../constants"
import { Cart } from "./cart"
import { HelpLine } from "../../UI/helpLine"
import { VoteCount } from "../../picies/voteCount"
import { RateCount } from "../../picies/rateCount"
import { Loader } from "../../UI/loader"
import { hideHelpLineAction, showHelpLineAction } from "../../../store/helpLine/actions"

export const ShopPage = () => {
  console.log("render shop-page")
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { t } = useSelector(state => state.lang)
  const { helpText, helpShow } = useSelector(state => state.helpLine)
  const uid = localStorage.getItem("uid")
  const bid = pathname.split("/")[2]
  const [shop, setShop] = useState(null)
  const [menu, setMenu] = useState(null)
  const [votes, setVotes] = useState(null)
  const [rate, setRate] = useState(null)
  const [sw, setSw] = useState(false)
  const [currency, setCurrency] = useState(null)
  const [shopSwitch, setShopSwitch] = useState(true)
  const [rateRender, setRateRender] = useState(false)
  const [cartPushing, setCartPushing] = useState(false)
  const [loading, setLoading] = useState(false)

  async function rateUp() {
    setRateRender(true)
    await axios.put(`${host}user/rateUp`, { uid, bid })
      .finally(() => {
        setTimeout(() => setRateRender(false), 500)
      })
  }

  async function rateDown() {
    setRateRender(true)
    await axios.put(`${host}user/rateDown`, { uid, bid })
      .finally(() => {
        setTimeout(() => setRateRender(false), 500)
      })
  }

  async function pushToCart(title, option, price) {
    setCartPushing(true)
    await axios.put(`${host}user/cart?uid=${uid}&bid=${bid}`, {
      title: title,
      option: option,
      price: price
    })
      .finally(() => setCartPushing(false))
  }

  useEffect(() => {
    async function getVotesCount() {
      await axios.get(`${host}user/votes?uid=${uid}`)
        .then((res) => setVotes(res.data))
    }
    getVotesCount()
  }, [uid, rateRender])

  useEffect(() => {
    async function getRate() {
      await axios.get(`${host}bus/rate?bid=${bid}`)
        .then((res) => setRate(res.data.rate))
    }
    getRate()
  }, [bid, rateRender])

  useEffect(() => {
    let mount = true
    async function getInfo() {
      setLoading(true)
      await axios.get(`${host}bus/shop?bid=${bid}`)
        .then((res) => {
          if (!res.data.tgChatId) {
            dispatch(showHelpLineAction(t?.helpLine.busNotReady))
          }
          setSw(!!res.data.info.secretWord)
          setCurrency(res.data.info.currency)
          setShop(res.data)
          setMenu(res.data.menu.sort((a, b) => a.title > b.title ? 1 : -1))
        })
        .finally(() => setLoading(false))
    }
    mount && getInfo()
    return () => {
      mount = false
      dispatch(hideHelpLineAction())
    }
  }, [bid, dispatch, helpShow && t])

  if (loading) return <Loader />

  return (
    <div className={cn.shopPageWrapper} style={{ marginTop: helpShow && "90px" }}>
      <div className={cn.shopPageSwitch}>
        <div onClick={() => setShopSwitch(true)}
          style={{ backgroundColor: shopSwitch ? "goldenrod" : "", color: shopSwitch ? "white" : "gray" }}>
          {t?.shopPage.switchShop}
        </div>
        <div onClick={() => setShopSwitch(false)}
          style={{ backgroundColor: !shopSwitch ? "goldenrod" : "", color: !shopSwitch ? "white" : "gray" }}>
          {t?.shopPage.switchCart}
        </div>
      </div>
      <div className={cn.shopBlock} style={{ display: shopSwitch ? "flex" : "none" }}>
        <VoteCount count={votes} loading={rateRender} />
        <h2>{shop?.info?.title}</h2>
        <div className={cn.rateControl}>
          <button onClick={rateDown} disabled={rateRender || votes <= 0}>
            <img src={dislike} alt=":(" />
          </button>
          <RateCount count={rate} loading={rateRender} />
          <button onClick={rateUp} disabled={rateRender || votes <= 0}>
            <img src={like} alt=":)" />
          </button>
        </div>
        <div className={cn.shopAddr}>
          <img src={address} alt="address" />
          <div>
            {shop?.info?.addr.country} {shop?.info?.addr.city} {shop?.info?.addr.street} {shop?.info?.addr.build}
          </div>
        </div>
        <div className={cn.posCardsWrapper}>
          {menu?.map((pos, index) =>
            <div key={index} className={cn.posCard}>
              <div>{pos.title}</div>
              <div>{pos.option}</div>
              <div>{pos.price}</div>
              <button
                disabled={cartPushing || loading || rate < 0 || !shop?.tgChatId}
                onClick={() => pushToCart(pos.title, pos.option, pos.price)}
              >{t?.shopPage.toCartBtn}</button>
            </div>)}
        </div>
      </div>
      <div style={{ display: shopSwitch ? "none" : "flex" }}>
        <Cart tgId={shop?.tgChatId} haveSw={sw} currency={currency} mount={!shopSwitch} />
      </div>
      <HelpLine visible={helpShow}>{helpText}</HelpLine>
    </div>
  )
}