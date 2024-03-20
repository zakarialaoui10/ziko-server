import {ZikoUIElement} from "ziko"
import * as lottie from "@lottiefiles/lottie-player"
class ZikoLottiePlayer extends ZikoUIElement{
    constructor(src,width,height){
        super("lottie-player","ZikoLottie");
        this.element.src=src;
        this.size(width,height);
        this.setAttr("aria-label","Lottie animation");
        this.setAttr("aria-describedby",`lottie-player-description-id`);
        this.render();
    }
    description(){

    }
    play(){
        this.element.play();
        return this;
    }
    pause(){
        this.element.pause();
        return this;
    }
    useControls(use=true){
        this.element.controls=use;
        return this;
    }
    setMode(mode="normal"){
        this.element.mode=mode;
        return this;
    }
}
const ZikoLottie=(src = "https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json",width,height)=>new ZikoLottiePlayer(src,width,height);
export default ZikoLottie
