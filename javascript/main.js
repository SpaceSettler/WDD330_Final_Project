const baseURL = "https://openscriptureapi.org/api/scriptures/v1/lds/en/volume/";
const BoM = document.querySelector("#bom");
const Bible = document.querySelector("#bible");
const DC = document.querySelector("#dc");
const PoGP = document.querySelector("#pgp");



    //.get('https://openscriptureapi.org/api/scriptures/v1/lds/en/volume/bookofmormon/1nephi/1')
    //.then((result) => {
    //    if (result?.data?.chapter) {
    //        const { bookTitle, number, verses } = result.data.chapter;
    //        console.log('Got', bookTitle, number);
    //        verses.forEach((verse, i) => {
    //            console.log(i + 1, verse?.text);
    //        });
    //    }
    //})
    //.catch((err) => {
    //    console.error(err);
//});

// ^Code from their site



async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "servicesError", message: data };
    }
}

async function getVerses(volume, book, chapter, verse1, verse2) {
    const options = {
        method: "GET",
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
    const response = await fetch(baseURL + `${volume}/${book}/${chapter}.verses[].text`, options);
    const data = await convertToJson(response);
    return data.Result;
}

async function gatherInfo() {  // Gathers inofrmation from the clicked verses, to then pass to the api to get the verses
    let volume = "bookofmormon";
    let book = "nephi";
    let chapter = "1";
    let verse1 = 1;
    let verse2 = 4;
    let verse = getVerses(volume, book, chapter, verse1, verse2)
}


BoM.addEventListener("click", gatherInfo);
Bible.addEventListener("click", gatherInfo);
PoGP.addEventListener("click", gatherInfo);
DC.addEventListener("click", gatherInfo);