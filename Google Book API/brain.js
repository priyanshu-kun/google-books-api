window.addEventListener("load", () => {
    const query = document.querySelector("#book-info");
    const btn = document.querySelector(".btn");
    const card = document.querySelector(".container");
    const URL = "https://www.googleapis.com/books/v1/volumes?q=";

    btn.addEventListener("click", () => {
        if (query.value === "") {
            alert("Input cannot be empty!");
        }
        else {
            fetchData();
        }
        query.value = "";
    })

    async function fetchData() {
        try {
            const fetchCall = await fetch(URL + query.value);
            const data = await fetchCall.json();
            console.log(data)
            populateDOM(data);
        }
        catch (err) {
            console.log("Here is your error: ", err);
        }
    }


    function populateDOM(getData) {
        
       
        let concatenate = `<h1 class="card-main-heading">Here is your Result!</h1>`;
        // console.log(getData)
        getData.items.forEach(item => {
            const viewerURL = `book.html?isbn=${item.volumeInfo.industryIdentifiers[0].identifier}`;
            concatenate += `<div class="book-card">
            <h1>${item.volumeInfo.title}</h1>
            <img src="${item.volumeInfo.imageLinks.smallThumbnail}" alt="book img">
            <div class="content">
                <div><p class="book-info height">${item.volumeInfo.description}</p><a class="read-more" href="#">Read more.</a></div>
                <a class="getbook" target="_blank" href="${viewerURL}">Read Book.</a>
            </div>
        </div>`
        });
       formatDOM();
        card.innerHTML = concatenate;
    }

    function formatDOM() {
        // document.querySelector(".wrapper").style.height = "auto";
        document.querySelector(".wrapper").classList.add("newWrapper");
    }

})
