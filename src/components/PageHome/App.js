import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../static/App.css';
import LandingTop from '../../assets/landingtop.svg'
import LandingLeft from '../../assets/landingleft.svg'
import CubeRender1 from '../../assets/cuberender.png'
import CubeRender2 from '../../assets/cubegif.gif'
import CubeRender3 from '../../assets/closeup.png'
import CubeRender4 from '../../assets/pricingchart.svg'
import Topography from '../../assets/topography.svg'
import Logo from '../../assets/logo.svg'
import CubeSection from './containers/cubesection.js'
import SignupBox from './containers/signupbox.js'
import {FaRegEnvelope} from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Button from 'react-bootstrap/Button'


class PageHome extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.learnmore = this.learnmore.bind(this)
    this.joinbeta = this.joinbeta.bind(this)
  }

  learnmore() {
    this.refs.learnmore.scrollIntoView();
  }

  joinbeta() {
    this.refs.joinbeta.scrollIntoView();
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    // setTimeout(
    //   function() {
    //       this.setState({loaded: true});
    //   }
    //   .bind(this),
    //   2500
    // );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    // if (!this.state.loaded) {
    //   return(
    //     <div>Testing!</div>
    //   );
    // }
    return (
      <div className='App'>
        <Header/>
        <div class='Homepage-Top' style = {{minHeight: '100vh', paddingTop: 120}}>
        	{this.state.width > 700
        	?
        	<div>
        	<img src = {Logo} width = '70' height = '70'/>
        	<div style = {{fontWeight: 'bold', fontSize: 40, color: 'white', margin: 'auto', marginTop: 30, width: '85%', maxWidth: 700}}>
        		Fractal makes cloud-powered computers for creative professionals.
        	</div>
        	<div style = {{color: '#d3d3d3', textAlign: 'center', margin: 'auto', maxWidth: 700, marginTop: 30, width: '80%', lineHeight: 1.6}}>
        		Fractal is a Boston-based company building the next generation of personal devices. Our first computer, the Cube, is currently in private beta.
        	</div>
        	<div style = {{margin: 'auto', marginTop: 25}}>
        		<Button style = {{border: 'none', backgroundColor: '#94a8ed', borderRadius: 30, padding: '10px 22px', margin: 20, width: 200, color: 'white', fontWeight: 'bold'}}
            onClick = {this.learnmore}>
        			Learn More
        		</Button>
        		<Button style = {{border: 'solid 2px white', backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 30, padding: '10px 22px', margin: 20, width: 200, color: 'white', fontWeight: 'bold'}}
            onClick = {this.joinbeta}>
        			Join Our Beta
        		</Button>
        	</div>
        	</div>
        	:
        	<div>
        	<img src = {Logo} width = '50' height = '50'/>
        	<div style = {{fontWeight: 'bold', fontSize: 25, color: 'white', margin: 'auto', marginTop: 30, width: '85%', lineHeight: 1.2}}>
        		Fractal makes cloud-powered computers for creative professionals.
        	</div>
        	<div style = {{color: '#d3d3d3', textAlign: 'center', margin: 'auto', maxWidth: 700, marginTop: 15, fontSize: 15, width: '80%'}}>
        		Fractal is a Boston-based company building the next generation of personal devices. Our first computer, the Cube, is currently in private beta.
        	</div>
        	<div style = {{margin: 'auto', marginTop: 25}}>
        		<button style = {{border: 'none', backgroundColor: '#94a8ed', borderRadius: 30, padding: '8px 22px', margin: 20, width: 170, color: 'white', fontWeight: 'bold', fontSize: 15}}>
        			Learn More
        		</button>
        		<button style = {{border: 'solid 1px white', backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 30, padding: '8px 22px', marginBottom: 75, width: 170, color: 'white', fontWeight: 'bold', fontSize: 15}}>
        			Join Our Beta
        		</button>
        	</div>
        	</div>
        	}
        </div>
        <div ref = 'learnmore' style = {{backgroundColor: 'black', textAlign: 'left', padding: '10%'}}>
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Introducing the Cube'
                       title = 'A next generation, cloud-powered desktop computer.'
                       image = {<img src = {CubeRender1} style = {{width: '100%', margin: 'auto', maxWidth: 1200}}
                       /> }
          />
          :
          <CubeSection subtitle = 'Introducing the Cube'
                       title = 'A next generation, cloud-powered desktop computer.'
                       image = {<img src = {CubeRender1} style = {{width: '150%', margin: 'auto', maxWidth: 700, position: 'relative', right: '25%'}}
                       /> }
          />
          }
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Technology'
                       title = 'Why the Cube?'
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p>Current desktop computers like your Mac or PC are expensive. Not designed for remote access.
                                  Difficult to upgrade.</p>
                               <p>The Cube is a desktop computer powered by the cloud, and it changes all of that. 
                                  It runs Windows 10, but unlike any computer you’ve ever owned, it's much more affordable, 
                                  easily upgradeable, and accessible from any Internet-connected device.
                               </p></div>}
                       image = {<img src = {CubeRender2} style = {{width: '110%', margin: 'auto', maxWidth: 900}}
                       /> }
          />
          :
          <CubeSection subtitle = 'Technology'
                       title = 'Why the Cube?'
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p style = {{fontSize: 13}}>Current desktop computers like your Mac or PC are expensive. Not designed for remote access.
                               Difficult to upgrade.</p>
                               <p style = {{fontSize: 13}}>The Cube is a desktop computer powered by the cloud, and it changes all of that. 
                                  It runs Windows 10, but unlike any computer you’ve ever owned, it's much more affordable, 
                                  easily upgradeable, and accessible from any Internet-connected device.
                               </p></div>}
                       image = {<img src = {CubeRender2} style = {{width: '150%', margin: 'auto', maxWidth: 700, position: 'relative', right: '25%'}}
                       /> }
          />
          }
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Flexibility'
                       title = "Change your computer's specs instantly. Access your desktop anywhere."
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p>Gone are the days of forgetting your computer at home. You can access your Cube's desktop from any Internet-connected device. In this way,
                               any computer can be your computer.</p>
                               <p>Gone, too, are the days of buying and installing new hardware. Need more processing power to run heavy applications? Want more storage? 
                                  Simply click a button to upgrade your Cube instantly. With the Cube, you’ll always have the computer that perfectly fits your needs.</p></div>}
                       image = {<img src = {CubeRender3} style = {{width: '100%', margin: 'auto', maxWidth: 900}}
                       /> }
          />
          :
          <CubeSection subtitle = 'Flexibility'
                       title = "Change your computer's specs instantly. Access your desktop anywhere."
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p style = {{fontSize: 14}}>Gone are the days of forgetting your computer at home. You can access your Cube's desktop from any Internet-connected device. In this way,
                               any computer can be your computer.</p>
                               <p style = {{fontSize: 14}}>Gone, too, are the days of buying and installing new hardware. Need more processing power to run heavy applications? Want more storage? 
                                  Simply click a button to upgrade your Cube instantly. With the Cube, you’ll always have the computer that perfectly fits your needs.</p></div>}
                       image = {<img src = {CubeRender3} style = {{width: '100%', margin: 'auto', maxWidth: 900}}
                       /> }
          />
          }
          {
          this.state.width > 700 
          ?
          <div>
          <CubeSection subtitle = 'Affordability'
                       title = 'Yours for just $75.'
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p>The Cube drastically reduces the cost of a computer. We’ll ship a Cube to your door for $75 — shipping on us. 
                                  Afterward, you’ll select a plan based on the computer that best fits your needs.</p></div>}
                       image = {<img src = {CubeRender4} style = {{width: '100%', margin: 'auto', marginTop: 50, marginLeft: 5, maxWidth: 900}}
                       /> }
          /><br/><br/></div>
          :
          <div>
          <CubeSection subtitle = 'Affordability'
                       title = 'Yours for just $75.'
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p style = {{fontSize: 14}}>The Cube drastically reduces the cost of a computer. We’ll ship a Cube to your door for $75 — shipping on us. 
                                  Afterward, you’ll select a plan based on the computer that best fits your needs.</p></div>}
                       image = {<img src = {CubeRender4} style = {{width: '100%', margin: 'auto', marginTop: 20, marginLeft: 5, maxWidth: 700}}
                       /> }
          /><br/><br/></div>
          }
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Security'
                       title = 'Peace of mind.'
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p>Privacy matters. All communications with the cloud are encrypted end-to-end, and Fractal does 
                                    not have access to your data. Your private cloud is isolated, ensuring that your computer will not
                                    be compromised.</p>
                                <p>Security matters. Unlike your normal hard drive, your Cube's hard drive is backed up in the cloud,
                                   which means that you'll never lose your data—even if your Cube is lost or broken. Want to cancel your plan? We'll
                                   ship you a free hard drive to download all of your data locally.</p>
                                </div>}
          />
          :
          <CubeSection subtitle = 'Security'
                       title = 'Peace of mind.'
                       text = {<div style = {{color: '#999999',  fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p style = {{fontSize: 14}}>Privacy matters. All communications with the cloud are encrypted end-to-end, and Fractal does 
                                    not have access to your data. Your private cloud is isolated, ensuring that your computer will not
                                    be compromised.</p>
                                <p style = {{fontSize: 14}}>Security matters. Unlike your normal hard drive, your Cube's hard drive is backed up in the cloud,
                                   which means that you'll never lose your data—even if your Cube is lost or broken. Want to cancel your plan? We'll
                                   ship you a free hard drive to download all of your data locally.</p>
                                </div>}
          />
          }
        </div>
        {
        this.state.width > 700 
        ?
        <div  ref = 'joinbeta' className = "Homepage-Bottom" style = {{textAlign: 'left', padding: '10%', minHeight: '100vh'}}>
          <CubeSection subtitle = 'Test it out yourself'
                       title = 'Join Our Beta'
                       text = {<div style = {{color: '#d3d3d3', fontSize: 18, lineHeight: 1.5, paddingLeft: 5}}>
                                 <p>We’re currently accepting applications for beta users. 
                                 If you want to be one of the first to experience the Cube, apply below.</p>
                                </div>}
          />
          <div style = {{textAlign: 'center', width: '100%'}}>
          <SignupBox right/>
          </div>
        </div>
        :
        <div className = "Homepage-Bottom" style = {{width: '100%', textAlign: 'left', padding: '10%', minHeight: '100vh'}}>
          <CubeSection subtitle = 'Test it out yourself'
                       title = 'Join Our Beta'
                       text = {<div style = {{color: '#d3d3d3', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p style = {{fontSize: 14}}>We’re currently accepting applications for our first wave of beta users. 
                                 If you want to be one of the first to experience the Cube, apply below.</p>
                                </div>}
                        signupbox = {<SignupBox style = {{margin: 'auto'}}/>}
          />
        </div>
        }
      </div>
    );
  }
}

export default PageHome;