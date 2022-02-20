import "./App.css"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { host } from "./constants"
import { Header } from "./components/header"
import { authSuccessAction, logoutAction } from "./store/auth/actions"
import { privateRoutes, publicRoutes } from "./routes"
import { setEnAction, setRuAction } from "./store/translate/actions"
import { Footer } from "./components/footer"
import { Loader } from "./components/UI/loader"

export default function App() {
  const dispatch = useDispatch()
  const lang = localStorage.getItem("lang")
  const uid = localStorage.getItem("uid")
  const { isAuth } = useSelector(state => state.auth)
  const { curLang } = useSelector(state => state.lang)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${host}user/check?uid=${uid}`)
      .then(() => dispatch(authSuccessAction()))
      .catch(() => dispatch(logoutAction()))
      .finally(() => setLoading(false))
  }, [dispatch, uid])

  useEffect(() => {
    dispatch(lang === "ru" ? setRuAction() : setEnAction())
  }, [dispatch, lang, curLang])

  if (loading) return <Loader />

  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <Routes>
          {isAuth
            ? privateRoutes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact} />)
            : publicRoutes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact} />)}
        </Routes>
      </div>
      <Footer />
    </div>
  )
}