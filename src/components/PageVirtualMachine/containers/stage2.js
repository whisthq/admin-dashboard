// import React, { Component } from 'react'
// import '../../../static/App.css';

// class Stage2 extends Component {
//   constructor(props) {
//     super(props)
//     this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
//   }

//   componentDidMount() {
//     this.updateWindowDimensions()
//     window.addEventListener('resize', this.updateWindowDimensions)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('resize', this.updateWindowDimensions)
//   }

//   updateWindowDimensions() {
//     this.setState({ width: window.innerWidth, height: window.innerHeight })
//   }

//   render() {
//     return (
//       <div>
//           <Col xs = {8} style = {{paddingLeft: 80}}>
//             <div style = {{fontWeight: 'bold', fontSize: 50, color: 'white', marginBottom: 30}}>
//               Let's Create Your Cloud Computer.
//             </div>
//             <div style = {{color: "#a9a9a9", marginBottom: 50, fontSize: 20}}>
//               Achieve workstation-grade performance from any device — even your laptop — for a fraction of 
//               the cost.
//             </div>
//             <Row>
//                 <Col md = {4} style = {{padding: 10}} onClick = {this.changeToBase}>
//                   <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.baseColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.baseSize })`}}>
//                     <div style = {{backgroundColor: `${ this.state.baseColor }`, width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: '#222222', borderBottom: 'solid 1px #222222'}}>
//                       Base Instance
//                     </div>
//                     <div style = {{padding: 25}}>
//                       <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
//                         <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$20</span> / mo
//                       </div>
//                       <table style = {{width: '100%', marginTop: 10, fontSize: 14}}>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P2000 GPU</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>2</span> 3.2 GHz CPU Cores</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>8 GB</span> RAM</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>256 GB</span> SSD</td>
//                         </tr>
//                       </table>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col md = {4} style = {{padding: 10}} onClick = {this.changeToEnhanced}>
//                   <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.enhancedColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.enhancedSize })`}}>
//                     <div style = {{backgroundColor: `${ this.state.enhancedColor }`, width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: '#222222', borderBottom: 'solid 1px #222222'}}>
//                       Enhanced Instance
//                     </div>
//                     <div style = {{padding: 25}}>
//                       <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
//                         <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$30</span> / mo
//                       </div>
//                       <table style = {{width: '100%', marginTop: 10, fontSize: 14}}>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P4000 GPU</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>4</span> 3.2 GHz CPU Cores</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>12 GB</span> RAM</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>512 GB</span> SSD</td>
//                         </tr>
//                       </table>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col md = {4} style = {{padding: 10}} onClick = {this.changeToPower}>
//                   <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.powerColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.powerSize })`}}>
//                     <div style = {{backgroundColor: `${ this.state.powerColor }`, width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: '#222222', borderBottom: 'solid 1px #222222'}}>
//                       Power Instance
//                     </div>
//                     <div style = {{padding: 25}}>
//                       <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
//                         <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$40</span> / mo
//                       </div>
//                       <table style = {{width: '100%', marginTop: 10, fontSize: 14}}>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P5000 GPU</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>4</span> 3.2 GHz CPU Cores</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>16 GB</span> RAM</td>
//                         </tr>
//                         <tr style = {{width: '100%'}}>
//                           <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>1 TB</span> SSD</td>
//                         </tr>
//                       </table>
//                     </div>
//                   </div>
//                 </Col>
//             </Row>
//             <Button style = {{color: 'white', marginTop: 75, paddingLeft: 75, paddingRight: 75, fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none', borderRadius: 20, float: 'right'}}>
//               Next
//             </Button>
//           </Col>
//       </div>
//     );
//   }
// }

// export default Stage2