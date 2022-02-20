import { useSelector } from "react-redux"
import cn from "./style.module.css"

export const RateCount = ({ count, loading }) => {
  const {t} = useSelector(state => state.lang)
  return (
    <div className={cn.rateCountWrapper}>
      {t?.shopPage.rateCount} {loading ? <div className={cn.smallLoader}></div> : count}
    </div>
  )
}