let myPhoto = [];
const API_key = '563492ad6f91700001000001a50248a19756492687753a2523d04a50';
const search = document.querySelector("#search");

getImageApi = async (input) => {
    document.getElementById("gllry").innerHTML = `<h2 class="d-flex justify-content-center text-light">Loading...</h2>`;
    const URL = await fetch(`https://api.pexels.com/v1/search?query=${input}&per_page=10`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_key,
        }
    })
    const data = await URL.json();
    // console.log(data);
    display(data);
}
display = (data) => {
    if (data.status == 400) {
        document.getElementById("gllry").innerHTML = "Error 404"
    }
    console.log(data.photos);
    myPhoto = data.photos;
    document.getElementById("gllry").innerHTML = myPhoto.map((value) => {
        return `
        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img src="${value.src.original}" class="w-100 shadow-1-strong rounded mb-4"
            data-mdb-img="${value.src.original}" alt="...">
        </div>
        `
    }).join("");
}

document.querySelector("form").addEventListener("submit", (event) => {
    getImageApi(search.value);
    event.preventDefault();
})