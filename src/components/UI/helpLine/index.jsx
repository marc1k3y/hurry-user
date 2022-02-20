import cn from "./style.module.css"
import helpIco from "../../../assets/help.svg"

export const HelpLine = ({ children, visible }) => {
  return (
    <div className={cn.helpLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={cn.icoBlock}>
        <img src={helpIco} alt="help-img" />
      </div>
      <div className={cn.messageBlock}>
        {children}
      </div>
    </div>
  )
}