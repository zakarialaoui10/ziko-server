import Ziko from "ziko";
import lottie from "lottie-web"
class ZikoLottiePlayer extends Ziko.ZikoUIElement{
    constructor(src){
        super("figure","figure");
        this.lottie=lottie.loadAnimation({
            container: this.element,
            renderer: 'svg',
            path: src
          });
        src instanceof Object ? Object.assign(this.lottie,{animationData:src}) : Object.assign(this.lottie,{src})
    }
    play(){
        this.lottie.play();
        return this;
    }
    pause(){
        this.lottie.pause();
        return this;
    }
    destroy(){
        this.lottie.destroy();
        return this;
    }
}
const ZikoLottie=(src)=>new ZikoLottiePlayer(src);
export default ZikoLottie
