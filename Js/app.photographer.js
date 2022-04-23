/**
 * @description Load Database from localStorage (if exists) then from file * data.json *
 * @returns {Array} | 1.get fetch data.json if * ls * missing
 * @returns {Array} | 2.get load local storage if present 
 */
function getData() {
    let ls = localStorage.getItem("data");
    if (ls){ return JSON.parse(ls)} // Convertit l'argument JSON en chaine JS ou en Objet
    return fetch(`/data.json`)
    .then( res => res.json())
	.then(res => {
		localStorage.setItem("data", JSON.stringify(res)); // Convertie l'argument JS en Json
		return res;
	})
    .catch(function(error) {
         alert(error)
     })
}
var IDPHOTOGRAPHER = -1;
var PHOTOGRAPHER = null;
var ARRAY_MEDIAS = [];
/**
 * @description Qui contien l'id du photographe selectionner
 * @return {string}  | IDPHOTOGRAPHER 
 */
function getParamID(){
	// url parameters
	const urlURL = new URL(location.href);
	// extract "id" from parameters
	IDPHOTOGRAPHER = parseInt(urlURL.searchParams.get('id')); // Transform l'argument en chaine et renvoie un entier ou Nan
	return IDPHOTOGRAPHER;
}
/**
 * @description Load Database from function getData  
 * @returns {string, Array} | ID -->  Array Photographer , ID --> Array Media
 */
async function loadData(){
	// get datas from local storage or API
    const datas = await getData();
    console.log("Donées du data.json ="  , datas);
	// get photographer by its id
    PHOTOGRAPHER = datas.photographers.find(element => {
		return element.id == IDPHOTOGRAPHER;
	});
	//extract photographer's medias from medias
    ARRAY_MEDIAS = datas.media.filter((media) => media.photographerId == IDPHOTOGRAPHER);
}

/**
 * @description Formulaire validation of the writed field Prénom, Nom, Email.
 */
function formulaire() {
	//Bouton Formulaire
	const bgFormulaire = document.querySelector('.bgFormulaire');
	const formulaireContacte = document.querySelector('.formulaire');
	const btnContactPhotographer = document.querySelector('.btn_ContactPhotographer');
	const btnFormulaireClose = document.querySelector('.btnFormulaireClose');
	/**
	 * @description 4 event for close the modal formulaire
	 */
	btnFormulaireClose.nextElementSibling.innerHTML = `${PHOTOGRAPHER.name}`;

	btnContactPhotographer.addEventListener('click', () => {
		bgFormulaire.style.display = "block";
		formulaireContacte.style.display = "block";
		btnFormulaireClose.focus(); // Permet de focus sur le formulaire fermer le formulaire avec *espace*
	})
	btnFormulaireClose.addEventListener('click', () => {
		bgFormulaire.style.display = "none";
		formulaireContacte.style.display = "none";
	})
	formulaireContacte.addEventListener('keydown', (e) => {
		if (e.keyCode === 27) {
			// 27 = espace
			bgFormulaire.style.display = "none";
			formulaireContacte.style.display = "none";
		}
	})
	//close the modal onclick background
	bgFormulaire.addEventListener('click', (e) => {
		bgFormulaire.style.display = "none";
		formulaireContacte.style.display = "none";
	})

			// Validation | Regex Formulaire
	const formulaire = document.querySelector('.formulaire');
	const prenom = document.getElementById('prenom');
	const nom = document.getElementById('nom');
	const email = document.getElementById('email');
	const spanErrorPrenom = document.querySelector('.mesgErrorPrenom');
	const spanErrorNom = document.querySelector('.mesgErrorNom');
	const spanErrorEmail = document.querySelector('.mesgErrorEmail');
	const closeModalMerci = document.querySelector('.close-modal-merci');
	const modal_merci = document.querySelector('.modal_merci');
	const btnMerci = document.querySelector('.btn-merci');
	
	/**
	 * @description 3 events for regex in two parts
	 * part 1 validation of the input
	 * part 2 if input valid actived css or if is not valid error message 
	 */
	prenom.addEventListener('input', (e) => { 
		let state = validation(prenom.value)
		OnValidation(prenom, state)
		return state
	})
	nom.addEventListener('input', (e) => {
		validationNom()
	})
	email.addEventListener('input', (e) => {
		let state = validationEmail( email.value, spanErrorEmail)
		OnValidation(email, state)
	})
	
	function validation(pName) {
		//Regex manier 1 *Voir ValidationNom pour 2ème manier de faire*

		champInputText = false
		let msgError;
		spanErrorPrenom.innerHTML = msgError

		if (!/[a-z]/g.test(pName)) {
			console.log('ChampPrénom --> il manque une minuscule');
			msgError = 'il manque une minuscule';
		} else if (!/[A-Z]/g.test(pName)) {
			console.log('ChampPrénom --> il manque une majuscule');
			msgError = 'il manque une majuscule';
		} else if (pName.length < 2) {
			console.log('ChampPrénom --> il faut au moins 2 carractères');
			msgError = 'il faut au moins 2 carractères';
		} else {
			console.log('ChampPrénom --> All condition true');
			champInputText = true;
			msgError = " ";
		}

		if (msgError.length){
			spanErrorPrenom.innerHTML = msgError
		}
		return champInputText;
	}

	//Regex si regex true alors *OnValidation* => true / false
	function OnValidation (pField, pState){
		if (pState == true) {
			console.log('ChampsInputText OK');
			pField.classList.remove('champInputText-invalid')
			pField.classList.add('champInputText-valid');
			// pState.innerHTML = "Good"
			return true
		} else {
			console.log('ChampsInputText NOK');
			pField.classList.remove('champInputText-valid')
			pField.classList.add('champInputText-invalid')
			return false
		}
	}
	 	//Regex 2éme manière de faire
	function validationNom() {
		champInputText = false

		if (!/[a-z]/g.test(nom.value)) {
			console.log('ChampNom --> il manque une minuscule');
			msgError = 'il manque une minuscule';
		} else if (!/[A-Z]/g.test(nom.value)) {
			console.log('ChampNom --> il manque une majuscule');
			msgError = 'il manque une majuscule'
		} else if (nom.value.length < 2) {
			console.log('ChampNom --> il faut au moins 2 carractères');
			msgError = 'il faut au moins 2 carractères'
		} else {
			console.log('ChampNom --> All condition true');
			champInputText = true
		}
		if (champInputText == true) {
			console.log('ChampNom --> ChampsInputText OK');
			spanErrorNom.innerHTML = ""
			nom.classList.remove('champInputText-invalid')
			nom.classList.add('champInputText-valid')
			return true
		} else {
			console.log('ChampNom --> ChampsInputText NOK');
			spanErrorNom.innerHTML = msgError
			nom.classList.remove('champInputText-valid')
			nom.classList.add('champInputText-invalid')
			return false
		}
	}
			//Fin 2ème manier de faire
	function validationEmail(pEmail, pError) {
		pError.textContent = ''
		let champInputText = false
		let msgError = '';
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(pEmail).toLowerCase())){
			msgError = ''
			champInputText = true
		}else {
			msgError = 'Mail Invalid'
		}
		if (msgError.length>0) pError.textContent=msgError
		return champInputText
	}

	formulaire.addEventListener('submit', (e) => {
		console.log('clickForm');

		e.preventDefault()
		if ( validationNom(nom) && validation(prenom) ) {
			console.log('condition validation Nom OK | Prénom OK');
			formulaire.style.display = "none"
			modal_merci.style.display = "block"
		} else {
			console.log('condition validation Nom NOK | Prénom NOK');
			// e.preventDefault()
		}
	})		
	btnMerci.addEventListener('click', () => {
		formulaire.submit()
		console.log(`Le formulaire au nom de ${nom.value , prenom.value} à bien été envoyer`);
	})
	closeModalMerci.addEventListener('click', () => {
		bgFormulaire.style.display = "none"
		console.log("formulaire close");
	})	
}
/**
 * @description Render Of the page Photographer
 */
function render(){
	// photographer profile
    initPhotographer(PHOTOGRAPHER);
    console.log(PHOTOGRAPHER);

	// create overlay (total likes + price)
	initOverlay(PHOTOGRAPHER);

	// create sort butons
	initDropdown();

	//buton tri
	initSortCategory();

	// draw photographer's medias
	initCards(PHOTOGRAPHER)

	// create drop down menus and overlay
    initLikes(PHOTOGRAPHER, ARRAY_MEDIAS);
}

/**
 * @description Photographer's card
 * @param {Array} cardPhoto |  array with the infos of the photgrapher
 */
function initPhotographer(cardPhoto){
    document.querySelector('.contain_bloc_top').innerHTML += 
    `
        <div class="bloc_top">
            <section class="card_Photographer">
                <div class="infoPhotograper">          
                    <h1 tabindex="0"> ${cardPhoto.name} </h1>
                    <p tabindex="0"> ${cardPhoto.city}, ${cardPhoto.country}</p>
                    <p tabindex="0">${cardPhoto.tagline}</p>
                </div> 
                <button class="btn_ContactPhotographer" type="button">Contactez-moi</button>
                <img src="/Sample_Photos/Photographers-ID-Photos/${cardPhoto.portrait}" role="img" aria-label="Photo de profil du photographe" alt="Photo de profil du photographe" tabindex="0">
            </section>
        </div> 
    `
}
/**
 * @description Overlay of the price and the likes
 * @param {Array} cardPhoto |  array with the infos of the photgrapher
 */
function initOverlay(photographe){
	document.querySelector('.contain_galeriePhoto').innerHTML += 
    `
		<div class="prix">  
			<p class="likesTotal"><i class="fas fa-heart"></i></p>
			<p>${photographe.price}€/jr </p>
		</div>
	`
}
/**
 * @description sort tab
 */
function initDropdown() {

    document.querySelector('.contain_galeriePhoto').innerHTML += 
    `
		<div class="trieAll">
			<p>Trier par
				<label for="trie"  aria-haspopup="true aria-expanded="false>
					<select name="trie">
						<option class="popularite" value="Popularité">Popularité</option>
						<option class="date" value="Date">Date</option>
						<option class="titre" value="Titre">Titre</option>    
					</select>
				</label>
			</p>
		</div>
    `
}
/**
 * @description Function of diferant filters
 */
function initSortCategory() {
	const filter = new Filter();

	let trieAll = document.querySelector('.trieAll'),
		popularite = document.querySelector('.popularite'),
		titre = document.querySelector('.titre'),
		date = document.querySelector('.date'),
		ls = localStorage.getItem("categorie");


	trieAll.lastItem = null;
	trieAll.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log("clickCatAll", e.target.value);
		let lsTrie = localStorage.getItem("data")

		if (e.target.value!=trieAll.lastItem){
			if (e.target.value == "Popularité") {
				filter.SortByPopularity();
				console.log( "trieAll -> clic popu");
				// localStorage.setItem("data", )

			} else if (e.target.value == "Date") {
				filter.SortByDate();
				console.log( "trieAll -> clic date");
			} else if (e.target.value == "Titre") {	
				filter.SortByTitle();
				console.log( "trieAll -> clic titre");
			}
			trieAll.lastItem = e.target.value;
		}
	})
} 

class Filter {
	SetCardsOrders( orders) {
		let x = 0; orders.map(d => d.elem.style.order = x++ )
	}
	SortByPopularity(){
		let elems = document.querySelectorAll(".card_galerieMaster");
		let array = [...elems]; // spread operator
		array.map(a => {
			let id = a.id.split("_")[1];
			let likes = document.getElementById(id);
			a.likes = +likes.textContent;
		})
		array.sort( (a,b)=> { return b.likes - a.likes; })
		let orders = array.map(a => {return {elem : a}});
		this.SetCardsOrders(orders);
	}
	
	SortByDate(){
		let elems = document.querySelectorAll(".card_galerieMaster");
		let array = [...elems];
		let a1 = array.map(a => a.date);
		let array2 = array.sort( (a,b)=> { return new Date(b.date)-new Date(a.date) })
		let a2 = array2.map(a => a.date);
		let orders = [];
		this.SetCardsOrders(orders);
	}
	SortByTitle(){
		let elems = document.querySelectorAll(".card_galerieMaster");
		let array = [...elems];
		// array.sort( (a,b)=> { a.title ... b.title }); 
		let orders = array.map(a => {return {elem : a}});
		this.SetCardsOrders(orders);
	}
}


/**
 * @description Init card of photographers
 * @param {*} photographe 
 */
function initCards(photographe){
    ARRAY_MEDIAS.map(media => createCard(media, photographe))
}

function initLikes(photographe, medias){

		// Like Globale

    let likes = 0;
	let likesGlobal = 0;
	let likesTotal = document.querySelector('.likesTotal');
	let clickLike = document.querySelectorAll('.cardLikes');
	
	// Fonction Like
	function UpdateOverlayLikes(count){
		likesTotal.innerHTML = `<p>${count} <i class="fas fa-heart"></i></p>`
	};
	medias.map(media => {
		likes += media.likes
	});
    console.log(likesGlobal, likes);
	likesGlobal = likes;

	UpdateOverlayLikes(likesGlobal);
	console.log("add events for picture", clickLike);

	clickLike.forEach(el =>  {
		el.addEventListener('click', () => {
			let likesCount = el.querySelector(".likesCount");
			likesGlobal += UpdateLike(likesCount);
			UpdateOverlayLikes(likesGlobal)
			console.log('clickLove', likesGlobal,likesCount.textContent);
		})
	});

	function UpdateLike(elem){

		let id = elem.id;
		let ls = localStorage.getItem("likes");
	
		// local storage not found -> create and update
		if (!ls){
			localStorage.setItem("likes",JSON.stringify([id]));
			elem.textContent = (+elem.textContent) + 1;
			return 1;
		}else{
			let likes = JSON.parse(ls);
			let value = 1;
			// media already liked = dislike (remove from localStorage)
			if (likes.find(pId=>pId==id)){
				likes = likes.filter(pId => pId!=id)
				value = -1;
			}
			// media not found = like (insert into localStorage)
			else{
				likes.push(id);
			}
			localStorage.setItem("likes", JSON.stringify(likes));
			elem.textContent = (+elem.textContent) + value;
			return value;
		}
	}

}

function createCard(galerieMedia, idPhoto) {
    let objMedia = "";

	let elemMaster = document.createElement('div');
	elemMaster.id = "id_"+galerieMedia.id;
	elemMaster.date = galerieMedia.date;
	elemMaster.Title = galerieMedia.title;
	elemMaster.classList.add('card_galerieMaster');
	
    if (galerieMedia.hasOwnProperty('image')) {
		objMedia = `<img src="/Sample_Photos/${idPhoto.name}/${galerieMedia.image}" alt="${galerieMedia.alt}">`;
	} else if (galerieMedia.hasOwnProperty('video')) {
		objMedia = `<video class="mediaVideo" src="/Sample_Photos/${idPhoto.name}/${galerieMedia.video}" alt="${galerieMedia.alt}" controls>`;
	}
	
	elemMaster.innerHTML =  
	`
		<div tabindex="0" class="card_galerie" role="dialog" aria-label="galeri de petite carte" >
			${objMedia}
		</div>  
		                  
		<div class="titre_photo">
			<p tabindex="0">${galerieMedia.title}</p>
			<p tabindex="0" class="cardLikes"><span class="likesCount" id="${galerieMedia.id}">${galerieMedia.likes}</span><i class="fas fa-heart" aria-hidden="true"></i></p>
		</div>
	`
	document.querySelector('.galerie_Photographer').appendChild(elemMaster)
}

const LIGHTBOX =  {
	lightBox : null,
	srcEnCourSlider : null,
	srcEnCourSliderVideo : null,
	allPicsLightBox : null,
	leftLightBox : null,
	rightLightBox : null,
	fermerLightBox : null,
	photoEnCours : null,
	videoEnCours : null,
	indexEnCours : 0
}

function initLightBox(){
	LIGHTBOX.lightBox = document.querySelector('.lightBox')
	LIGHTBOX.lightBox.tabIndex = 0;
	LIGHTBOX.srcEnCourSlider = document.querySelector('.img-visible-lightBox')
	LIGHTBOX.srcEnCourSliderVideo = document.querySelector('.video_visible_lightBox')
	LIGHTBOX.allPicsLightBox = Array.from(document.querySelectorAll(".card_galerieMaster"))
	LIGHTBOX.leftLightBox = document.querySelector('.btnSlide--left')
	LIGHTBOX.rightLightBox = document.querySelector('.btnSlide--right')
	LIGHTBOX.fermerLightBox = document.querySelector('.btn-closeLightBox')
	console.log(LIGHTBOX.allPicsLightBox);
}

const SetLightboxSrc = (item) => {
	let elem = item.querySelector("video");
	let titreImgLightBox = document.querySelector('.titreImgLightBox')

	LIGHTBOX.srcEnCourSliderVideo.style.display = "none";
	LIGHTBOX.srcEnCourSlider.style.display = "none";
	if(elem){
		LIGHTBOX.srcEnCourSliderVideo.src = elem.src;
		LIGHTBOX.srcEnCourSliderVideo.style.display = "block";
	}else{
		elem = item.querySelector("img");
		LIGHTBOX.srcEnCourSlider.src = elem.src; // image qu'on vient de cliquer
		LIGHTBOX.srcEnCourSlider.style.display = "block";
	}
	if (elem) {
		console.log(item);
		titreImgLightBox.textContent = item.Title
	}
	return elem;
}

// Slider
function generateLightBoxEvents(){
	
	LIGHTBOX.lightBox.addEventListener("keydown", (a) =>{
		console.log(a.keyCode, "push espace ou echap" )
		if (a.keyCode === 27 || a.keyCode === 32) {
			LIGHTBOX.lightBox.style.display ="none"
			LIGHTBOX.lightBox.focus()
		}
		if (a.keyCode == 39) {
			console.log(a.keyCode, "Push keyCode 39 => btn Right");
			console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src);
			LIGHTBOX.indexEnCours = (LIGHTBOX.indexEnCours + 1)%(LIGHTBOX.allPicsLightBox.length);
			SetLightboxSrc(LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours]);
			console.log();
		}
		if (a.keyCode == 37) {
			console.log(a.keyCode, "push left");
			console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src, "Push keyCode 39 => btn Left");
			LIGHTBOX.indexEnCours = LIGHTBOX.indexEnCours==0 ? LIGHTBOX.allPicsLightBox.length-1 : LIGHTBOX.indexEnCours-1;
			SetLightboxSrc(LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours]);
		}
	})
	LIGHTBOX.fermerLightBox.addEventListener('click', (e) => {
		LIGHTBOX.lightBox.style.display = "none"
	})
	LIGHTBOX.rightLightBox.addEventListener('click', () => {
		LIGHTBOX.indexEnCours = (LIGHTBOX.indexEnCours + 1)%(LIGHTBOX.allPicsLightBox.length);
		SetLightboxSrc(LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours]);
		console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src);
	})
	LIGHTBOX.leftLightBox.addEventListener('click', () => {
		LIGHTBOX.indexEnCours = LIGHTBOX.indexEnCours==0 ? LIGHTBOX.allPicsLightBox.length-1 : LIGHTBOX.indexEnCours-1;
		SetLightboxSrc(LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours]);
		console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src);
	})
}
function generateMediaLightBoxLinks(){
	LIGHTBOX.allPicsLightBox = Array.from(document.querySelectorAll(".card_galerie"));
	console.log();
	let index = 0;
	LIGHTBOX.allPicsLightBox.forEach((item) => {
		item.listindex=index++;
	})
	LIGHTBOX.allPicsLightBox.forEach((item) => {
		item.onclick = item.onkeydown = (event) => {
			if(event.type=="click" || (event.type=="keydown" && event.keyCode==13)){
				console.log("click  => open lightBox","Item =" , item);
				LIGHTBOX.lightBox.style.display = "block";
				let elem = SetLightboxSrc(item);
				let titreImgLightBox = document.querySelector('.titreImgLightBox')
				titreImgLightBox.innerText = elem.alt;
				LIGHTBOX.photoEnCours = item; // élément HTML de manier générale | élément cliquer
				LIGHTBOX.indexEnCours = item.listindex; // index de la photo en cours
				console.log("index=",LIGHTBOX.indexEnCours, "photo =", elem.src);
				LIGHTBOX.lightBox.focus();
			}
		}
	})
}
async function main() {
	initLightBox();
	generateLightBoxEvents();
	getParamID();
	await loadData();
	render();
	formulaire(PHOTOGRAPHER);
	generateMediaLightBoxLinks();
}
// Ne charge le main qu'une fois le HTML chargé.
window.onload = main;