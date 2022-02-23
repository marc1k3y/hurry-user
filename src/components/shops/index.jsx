import cn from "./style.module.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { host } from "../../constants"
import { Loader } from "../UI/loader"
import { HelpLine } from "../UI/helpLine"
import { showHelpLineAction } from "../../store/helpLine/actions"

export const Shops = () => {
  console.log("render shop")
  const dispatch = useDispatch()
  const uid = localStorage.getItem("uid")
  const { t } = useSelector(state => state.lang)
  const { helpText, helpShow } = useSelector(state => state.helpLine)
  const [locFilter, setLocFilter] = useState(false)
  const [uCity, setUCity] = useState(null)
  const [shops, setShops] = useState([])
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true)
      await axios.get(`${host}user/info?uid=${uid}`)
        .then((res) => {
          setUCity(res.data.info?.city)
          if (!res.data.info) {
            dispatch(showHelpLineAction(t?.helpLine.fillInfo))
          } else if (!res.data.tgChatId) {
            dispatch(showHelpLineAction(t?.helpLine.tgConnect))
          }
        })
        .finally(() => setLoading(false))
    }
    getUserInfo()
  }, [uid, dispatch, helpShow && t])

  useEffect(() => {
    async function getAll() {
      setLoading(true)
      await axios.get(`${host}bus/shops?skip=${skip}&limit=5`)
        .then((res) => setShops(res.data.sort((a, b) => a.rate < b.rate ? 1 : -1)))
        .finally(() => setLoading(false))
    }
    async function getLocal() {
      setLoading(true)
      await axios.get(`${host}bus/locShops?skip=${skip}&limit=5&city=${uCity}`)
        .then((res) => setShops(res.data.sort((a, b) => a.rate < b.rate ? 1 : -1)))
        .finally(() => setLoading(false))
    }
    locFilter ? getLocal() : getAll()
  }, [skip, locFilter, uCity])

  if (loading) return <Loader />

  return (
    <div className={cn.shopsWrapper} style={{ marginTop: helpShow && "100px" }}>
      <div className={cn.shopsWw}>
        <h2>{t?.shops.windowTitle}</h2>
        <div className={cn.locationFilter}>
          <p>{t?.shops.locFilter}</p>
          <input
            type="checkbox"
            checked={locFilter}
            onChange={() => setLocFilter(!locFilter)} />
        </div>
        <div className={cn.shopsList}>
          {shops.map(shop =>
            <div key={shop._id} className={cn.shopCard}>
              <Link to={`/shop/${shop._id}`}>
                <h3>{shop.info?.title ?? "not named"}</h3>
              </Link>
              {t?.shops.rateCount} {shop.rate}
              <div>
                {shop.info?.addr.country} {shop.info?.addr.city}
              </div>
            </div>)}
        </div>
        <div className={cn.offsetBtn}>
          <button
            disabled={skip <= 0}
            onClick={() => setSkip(skip - 5)}>
            {t?.shopPage.prevBtn}
          </button>
          <button
            disabled={shops.length < 5}
            onClick={() => setSkip(skip + 5)}>
            {t?.shopPage.nextBtn}
          </button>
        </div>
      </div>
      <HelpLine visible={helpShow}>
        {helpText} <Link to="/profile">{t?.links.here}</Link>
      </HelpLine>
    </div >
  )
}