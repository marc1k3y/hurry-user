import { useSelector } from "react-redux"
import cn from "./style.module.css"

export const Footer = () => {
  const link = "https://www.buymeacoffee.com/marc1k3y"
  const { t } = useSelector(state => state.lang)
  return (
    <div className={cn.footerWrapper}>
      <div>
        <a href={link} target="_blank" rel="noreferrer">{t?.footer.bca}</a>
      </div>
      <div>marc1k3y production</div>
    </div>
  )
}