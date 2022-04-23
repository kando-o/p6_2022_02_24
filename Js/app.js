/**
 * @description  Qui contien la fonction getData qui stock dans la variable *datas tout les donées du site*
 * @returns {Array: photographer, media} | 
 */
async function main() {
    const datas = await getData()
    console.log(datas);
    for (const cartes of datas.photographers) {
        cartePhotographer(cartes)
    }
}
/**
 * @description Load data from local file
 * @returns {Array} | return data.json
 */
function getData() {
    return fetch("data.json")
   .then((res) => res.json())
   .catch(function(error) {
       alert(error)
    })
}

/**
 * @description init card photographer width data from data.json
 * @param {Array} carte | Array from * datas *
 */
async function cartePhotographer(carte) {
    await getData()
    document.getElementById('main').innerHTML += 
    `
    <div tabindex="0" class="cartePhotographer">
    <a href="/Page_Photographer/photographers.html?id=${carte.id} "target="_blanc">
    <div class="ppPhotograher">
    <img src="/Sample_Photos/Photographers-ID-Photos/${carte.portrait}">
    </div>
    </a>
    <div class="info">
    <h4 tabindex="0">${carte.name}</h4> 
    <p tabindex="0">${carte.country}, ${carte.city}</p> 
    <p tabindex="0">${carte.tagline}..</p> 
    <p tabindex="0">${carte.price}€/jour</p>
    </div>
    </div>
    `
}
main()




