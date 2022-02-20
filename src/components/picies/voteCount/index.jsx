import cn from "./style.module.css"

export const VoteCount = ({ count, loading }) => {
  return (
    <div className={cn.votesCountWrapper}>
      {loading ? "load" : count}
    </div>
  )
}