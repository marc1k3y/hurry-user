import cn from "./style.module.css"
import wrongIco from "../../../assets/wrong.svg"

export const RedLine = ({ children, visible }) => {
  return (
    <div className={cn.redLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={cn.icoBlock}>
        <img src={wrongIco} alt="help-img" />
      </div>
      <div className={cn.messageBlock}>
        {children}
      </div>
    </div>
  )
}