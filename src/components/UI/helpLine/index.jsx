import cn from "./style.module.css"
import helpIco from "../../../assets/help.svg"
import { useSelector } from "react-redux"

export const HelpLine = ({ children, visible }) => {
  const { t } = useSelector(state => state.lang)
  return (
    <div className={cn.helpLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={cn.icoBlock}>
        <img src={helpIco} alt="help-img" />
        <div>{t?.helpLine.helperName}</div>
      </div>
      <div className={cn.messageBlock}>
        {children}
      </div>
    </div>
  )
}