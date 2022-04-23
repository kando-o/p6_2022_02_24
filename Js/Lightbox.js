class LightBox {

    constructor(){
        this.lightBox = document.querySelector('.lightBox');
        this.lightBox.tabIndex = 0;
        this.srcEnCourSlider = document.querySelector('.img-visible-lightBox');
        this.srcEnCourSliderVideo = document.querySelector('.video_visible_lightBox');
        this.allPicsLightBox = Array.from(document.querySelectorAll(".card_galerie"));
        this.leftLightBox = document.querySelector('.btnSlide--left');
        this.rightLightBox = document.querySelector('.btnSlide--right');
        this.fermerLightBox = document.querySelector('.btn-closeLightBox');
        this.indexEnCours = 0;

        this.generateEvents();
    }

    setSrc (item) {
        let elem = item.querySelector("video");
        this.srcEnCourSliderVideo.style.display = "none";
        this.srcEnCourSlider.style.display = "none";
        if(elem) {
            this.srcEnCourSliderVideo.src = elem.src;
            this.srcEnCourSliderVideo.style.display = "block";
        } else {
            elem = item.querySelector("img");
            this.srcEnCourSlider.src = elem.src; // image qu'on vient de cliquer
            this.srcEnCourSlider.style.display = "block";
        }
        return elem;
    }

    generateEvents(){
    
        this.lightBox.addEventListener("keydown", (a) =>{
            console.log(a.keyCode, "push espace ou echap" )
            if (a.keyCode === 27 || a.keyCode === 32) {
                this.lightBox.style.display ="none"
                this.lightBox.focus()
            }
            if (a.keyCode == 39) {
                console.log(a.keyCode, "Push keyCode 39 => btn Right");
                console.log("index ="+this.indexEnCours,"photo="+this.srcEnCourSlider.src);
                this.indexEnCours = (this.indexEnCours + 1)%(this.allPicsLightBox.length);
                this.setSrc(this.allPicsLightBox[this.indexEnCours]);
            }
            if (a.keyCode == 37) {
                console.log(a.keyCode, "push left");
                console.log("index ="+this.indexEnCours,"photo="+this.srcEnCourSlider.src, "Push keyCode 39 => btn Left");
                this.indexEnCours = this.indexEnCours==0 ? this.allPicsLightBox.length-1 : this.indexEnCours-1;
                this.setSrc(this.allPicsLightBox[this.indexEnCours]);
            }
        })
        this.fermerLightBox.addEventListener('click', (e) => {
            this.lightBox.style.display = "none"
        })
        this.rightLightBox.addEventListener('click', () => {
            this.indexEnCours = (this.indexEnCours + 1)%(this.allPicsLightBox.length);
            this.setSrc(this.allPicsLightBox[this.indexEnCours]);
        })
        this.leftLightBox.addEventListener('click', () => {
            this.indexEnCours = this.indexEnCours==0 ? this.allPicsLightBox.length-1 : this.indexEnCours-1;
            this.setSrc(this.allPicsLightBox[this.indexEnCours]);
        })
    }
    
    generateMediaLinks() {
        this.allPicsLightBox = Array.from(document.querySelectorAll(".card_galerie"));
        console.log();
        let index = 0;
        this.allPicsLightBox.forEach((item) => {
            item.listindex=index++;
        })
        this.allPicsLightBox.forEach((item) => {
            console.log();
            item.onclick = item.onkeydown = (event) => {
                if(event.type=="click" || (event.type=="keydown" && event.keyCode==13)){
                    console.log("click  => open lightBox","Item =" , item);
                    this.lightBox.style.display = "block";
                    // LIGHTBOX.srcEnCourSlider.src = item.querySelector("img").src; // image qu'on vient de cliquer
                    let elem = SetSrc(item);
                    
                    this.photoEnCours = item; // élément HTML de manier générale | élément cliquer
                    this.indexEnCours = item.listindex; // index de la photo en cours
                    console.log("index=",this.indexEnCours, "photo =", elem.src);
                    this.lightBox.focus();
    
    
                }
            }
        })
    }
}



const LIGHTBOX = new LightBox();
