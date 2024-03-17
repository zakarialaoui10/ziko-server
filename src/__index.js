import Ziko from "ziko";
import * as lottie from "@lottiefiles/lottie-player"
class ZikoLottiePlayer extends Ziko.ZikoUIElement{
    constructor(src){
        super("lottie-player");
        this.element.src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json";
        this.element.play()
        this.element.style.width="220px"
        this.element.controls=true
    }
}
const ZikoLottie=(src)=>new ZikoLottiePlayer(src);
export default ZikoLottie
