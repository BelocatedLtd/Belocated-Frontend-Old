import React from 'react'
import Jumbotron from '../../components/Jumbotron'
import About from '../../components/About'
import MembersTab from '../../components/MembersTab'
import HowItWorks from '../../components/HowItWorks'
import SubFooter from '../../components/SubFooter'
import Services from './Services'
import CallToAction from '../../components/CallToAction'

export const Home = ({handleRegister, handleLogin, handleCloseMenu, loginBtn, regBtn}) => {
  return (
    <div>
      <Jumbotron handleRegister={handleRegister} handleLogin={handleLogin} loginBtn={loginBtn} regBtn={regBtn}/>
      <Services />
      <About />
      <MembersTab handleRegister={handleRegister} regBtn={regBtn}/>
    </div>
  )
}
