import cn from "./style.module.css"
import axios from "axios"
import { v4 } from "uuid"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { host } from "../../constants"
import { capFirst } from "../../utils/capFirst"
import { logoutAction } from "../../store/auth/actions"
import { GreenLine } from "../UI/greenLine"
import { HelpLine } from "../UI/helpLine"
import { Loader } from "../UI/loader"

export const Admin = () => {
  console.log("render")
  const dispatch = useDispatch()
  const uid = localStorage.getItem("uid")
  const { t } = useSelector(state => state.lang)
  const [chatId, setChatId] = useState(null)
  const [newPass, setNewPass] = useState("")
  const [repeatPass, setRepeatPass] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [connId, setConnId] = useState(null)
  const [nickname, setNickname] = useState("")
  const [faworiteDrink, setFaworiteDrink] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [greenLineText, setGreenLineText] = useState(null)
  const [greenLine, setGreenLine] = useState(false)
  const [textHelpLine, setTextHelpLine] = useState(null)
  const [helpLine, setHelpLine] = useState(false)

  async function changePass() {
    newPass === repeatPass &&
      await axios.put(`${host}user/changePass`, { uid, newPass })
        .then(() => {
          setGreenLineText("Password changed")
          setGreenLine(true)
          setTimeout(() => {
            setGreenLine(false)
          }, 4000)
          setNewPass("")
          setRepeatPass("")
        })
  }

  function genConnId() {
    setConnId("u" + v4())
  }

  function logout() {
    dispatch(logoutAction())
  }

  async function sendInfo(e) {
    e.preventDefault()
    setLoading(true)
    await axios.put(`${host}user/info?uid=${uid}`, {
      info: {
        nickname: nickname,
        faworiteDrink: faworiteDrink,
        country: country,
        city: city
      }
    })
      .then(() => {
        setHelpLine(false)
        setGreenLineText("Info saved!")
        setGreenLine(true)
        setTimeout(() => {
          setGreenLine(false)
        }, 3000)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    async function getInfo() {
      setLoading(true)
      await axios.get(`${host}user/info?uid=${uid}`)
        .then((res) => {
          if (res.data.info) {
            setNickname(res.data.info.nickname)
            setFaworiteDrink(res.data.info.faworiteDrink)
            setCountry(res.data.info.country)
            setCity(res.data.info.city)
            if (!res.data.tgChatId) {
              setTextHelpLine("Please reg in Telegram bot")
              setHelpLine(true)
            } else {
              setChatId(res.data.tgChatId)
            }
          } else {
            setTextHelpLine("Please fill Nickname, Country and City")
            setHelpLine(true)
          }
        })
        .finally(() => setLoading(false))
    }
    getInfo()
  }, [uid])

  useEffect(() => {
    connId && axios.put(`${host}user/connect?uid=${uid}`, { connId })
  }, [connId, uid])

  if (loading) return <Loader />

  return (
    <div className={cn.adminWrapper} style={{ marginTop: helpLine && "60px" }}>
      <button className={cn.logoutBtn} onClick={logout}>
        {t?.profile.logoutBtn}
      </button>
      <form onSubmit={(e) => sendInfo(e)}>
        <div className={cn.adminWw}>
          <h2>{t?.profile.windowTitle}</h2>
          <div className={cn.adminLabels}>{t?.profile.nickLabel}
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required />
          </div>
          <div className={cn.adminLabels}>{t?.profile.fdrinkLabel}
            <input
              type="text"
              value={capFirst(faworiteDrink)}
              onChange={(e) => setFaworiteDrink(e.target.value)} />
          </div>
          <div className={cn.adminLabels}>{t?.profile.countryLabel}
            <input
              type="text"
              value={capFirst(country)}
              onChange={(e) => setCountry(e.target.value)}
              required />
          </div>
          <div className={cn.adminLabels}>{t?.profile.cityLabel}
            <input
              type="text"
              value={capFirst(city)}
              onChange={(e) => setCity(e.target.value)}
              required />
          </div>
        </div>
        <button>{t?.profile.saveBtn}</button>
      </form>
      {nickname && country && city &&
        <div className={cn.connId}>
          {connId ?
            <CopyToClipboard text={`/register ${connId}`} onCopy={() => setIsCopied(true)}>
              {isCopied
                ? <span className={cn.copied}>{t?.profile.copiedText}
                  <a href="https://t.me/hurry_orders_bot">{t?.profile.botLink}</a>
                </span>
                : <span className={cn.forCopy}>{connId}</span>}
            </CopyToClipboard>
            : t?.profile.genText}
          {!connId &&
            <button onClick={genConnId}>{t?.profile.genBtn}</button>}
        </div>}
      {chatId && <div className={cn.changePass}>
        <div>{t?.profile.changePass}</div>
        <div className={cn.changePassForm}>
          <input
            placeholder={t?.profile.newPassPlc}
            minLength="8"
            maxLength="14"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)} />
          {newPass.length > 7 && <input
            placeholder={t?.profile.repPassPlc}
            minLength="8"
            maxLength="14"
            type="password"
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)} />}
          {(newPass === repeatPass && repeatPass.length > 0) && <button onClick={changePass}>{t?.profile.changeBtn}</button>}
        </div>
      </div>}
      <GreenLine visible={greenLine}>{greenLineText}</GreenLine>
      <HelpLine visible={helpLine}>{textHelpLine}</HelpLine>
    </div >
  )
}