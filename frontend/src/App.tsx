import {  BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import ChatUI from "./Chat";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/Chat" element={<ChatUI/>}/>
    </Routes>
  </Router>
  </RecoilRoot>
  )
}