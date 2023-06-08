import './Hero.css'
const Hero = () => {
    return (
        <div class="hero-container">
            <div class="div1">
                <img src="./banner1.jpg" alt="" />
            </div>
            <div className='hero-helper-1'>
                <div class="div2">
                    <img src="./banner2.webp" alt="" />
                </div>
                <div className='hero-helper-2'>
                    <div class="div4">
                        <img src="./banner3.jpg" alt="" />
                    </div>
                    <div class="div5" >
                        <img src="./banner4.jpg" alt="" />
                    </div>
                </div>
                <div class="div3">
                    <img src="./banner4.jpg" alt="" />
                </div>
            </div>

        </div>
    )
}

export default Hero