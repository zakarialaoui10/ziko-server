import Ziko from "ziko";
import lottie from "lottie-web"
class ZikoLottiePlayer extends Ziko.ZikoUIElement{
    constructor(src){
        super("div","div");
        this.lottie=lottie.loadAnimation({
            container: this.element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: src
          });
    }
}
const ZikoLottie=(src)=>new ZikoLottiePlayer(src);
export default ZikoLottie
