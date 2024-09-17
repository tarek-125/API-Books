const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get("bookId");

getbook();

function getbook() {
    toggleLoader(true)
    axios.get(`https://gutendex.com/books?ids=${id}`)
        .then((response) => {
            toggleLoader(false)
            const books = response.data.results; // 'books' is an array here

            let content = ``;
            for (let book of books) {
                let author;
            if (book.authors.length > 0) {
                author = book.authors[0];
            } else {
                author = { name: "Unknown", birth_year: "N/A", death_year: "N/A" };
            }

            let subjects;
            if (book.subjects  && book.subjects.length > 0) {
                subjects = `<ul>${book.subjects.map(subject => `<li>${subject}</li>`).join("")}</ul>`;
            } else {
                subjects = "No subjects available";
            }

            let languages;
            if (book.languages && book.languages.length > 0) {
                languages = book.languages.join(", ");
            } else {
                languages = "No languages available";
            }

            let copyright;
            if (book.copyright) {
                copyright = "Yes";
            } else {
                copyright = "No";
            }

            let formats;
            if (book.formats) {
                formats = `<ul>${Object.entries(book.formats).map(([type, url]) => `<li><a href="${url}" target="_blank">${type}</a></li>`).join("")}</ul>`;
            } else {
                formats = "No formats available";
            }

                content += `
                    <div class="container">
                        <h1> <span style="color:red;"> Name Book: </span> ${book.title}</h1>
                        <div style="border: solid 1px red;">
                            <p>Author Name: ${author.name}</p>
                            <p>Birth Year: ${author.birth_year}</p>
                            <p>Death Year: ${author.death_year}</p>
                        </div> <br>
                        <div>
                            <span style="color:red; font-size:22px;">Subjects:</span> ${subjects}
                        </div> <br>
                        <div>
                            <span style="color:red; font-size:22px;">Languages: </span>  ${languages}
                        </div>
                        <div>
                            <span style="color:red; font-size:22px;"> Copyright:</span>  ${copyright}
                        </div>
                        <div>
                            <span style="color:red; font-size:22px;"> Download Count:</span> ${book.download_count}
                        </div>
                        <div>
                            <span style="color:red; font-size:22px;"> Formats:</span> ${formats}
                        </div>
                    </div>
                `;
            }

            document.getElementById("book-container").innerHTML = content;
        })}








        function toggleLoader(show=true){
            if(show){
                document.getElementById("loader").style.visibility="visible"
            }else{
                document.getElementById("loader").style.visibility="hidden"
            }
        }