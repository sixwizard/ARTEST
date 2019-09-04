<ViroCamera
    position={[0, 0, 0]}
    rotation={[0, this.state.degree?this.state.degree:0, 0]}
    active={true}
/>
<ViroText text={str} scale={[.5, .5, .5]} position={[this.state.x1?this.state.x1:0,0,this.state.z1?this.state.z1:-1]} style={styles.helloWorldTextStyle} />
<ViroText text={str2} scale={[.5, .5, .5]} position={[this.state.x2?this.state.x2:0,0,this.state.z2?this.state.z2:-1]} style={styles.helloWorldTextStyle} />


// x 是纬度差 y 是经度差
const location1={
    lat: 30.5516559,
    lon: 104.0731423
}

const locationMe={
    lat: 30.5515323,
    lon: 104.073265
}

const location2={
    lat: 30.551724,
    lon: 104.0734387
}


this.setState({
    text : "test ready",
    z1: (locationMe.lat - location1.lat)*6700,
    x1: (locationMe.lon - location1.lon)*6700*-1,
    z2: (locationMe.lat - location2.lat)*6700,
    x2: (locationMe.lon - location2.lon)*6700*-1,
});
