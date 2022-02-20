import cn from "./style.module.css"
import successIco from "../../../assets/success.svg"

export const GreenLine = ({ children, visible }) => {
  return (
    <div className={cn.greenLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={cn.icoBlock}>
        <img src={successIco} alt="help-img" />
      </div>
      <div className={cn.messageBlock}>
        {children}
      </div>
    </div>
  )
}