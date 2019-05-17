const api = "https://www.googleapis.com/books/v1/volumes?startIndex=0&maxResults=30&q=";
const bookList = [];

const registerSW = function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('./sw.js').then(function (registration) {
                console.log('Service worker registration successfull with scope ', registration.scope);
            }, function (error) {
                console.log('Error in serviceWorker registration ', error);
            });
        });
    };
}

function search() {
    fetch(api + document.getElementById('searchInput').value)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    parse(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
const parse = function (response) {
    let bookinfo = "";
    let lst = "<ul class='mdc-list' role='group' aria-label='List with checkbox items'>";
    response.items.forEach(element => {
        lst += `<li class="mdc-list-item" role="checkbox" aria-checked="false">
                <span class="mdc-list-item__graphic">
                <div class="mdc-checkbox">
                    <input type="checkbox"
                            class="mdc-checkbox__native-control"
                            id="list-checkbox-item-${element.volumeInfo.title}" onclick="selectedBook('${element.volumeInfo.title}')" />
                    <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark"
                            viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                </div>
                </span>
                <label class="mdc-list-item__text" for="demo-list-checkbox-item-1">
                ${element.volumeInfo.title}${element.volumeInfo.subtitle ? +'&nbsp;:' + '&nbsp;' + element.volumeInfo.subtitle : ''}</label>
            </li>`
    });
    bookinfo = lst + "</ul>";

    display(bookinfo);
}
const display = function (display) {
    document.getElementById("searchResult").innerHTML = display;
}
const selectedBook = function (bookName) {
    bookList.push(bookName);
}
const addtoshelf = function () {
    console.log(bookList);
}

registerSW();
document.getElementById("addtoshelf").addEventListener("click", addtoshelf);
document.getElementById("searchbtn").addEventListener("click", search);
