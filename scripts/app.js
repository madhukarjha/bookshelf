const api = "https://www.googleapis.com/books/v1/volumes?startIndex=0&maxResults=30&q=";

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
                    console.log(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
document.getElementById("searchbtn").addEventListener("click", search);