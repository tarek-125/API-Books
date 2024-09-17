
let nextPageUrl = null;
let prevPageUrl = null;

getBooks()
function getBooks(url =`https://gutendex.com/books`){
    toggleLoader(true)
    axios.get(url)
    .then((response)=>{
        toggleLoader(false)
        const total_books=response.data.count
        const cardes=response.data.results
        nextPageUrl = response.data.next;
        prevPageUrl = response.data.previous;
            document.getElementById("rows").innerHTML = ""; 
        document.getElementById("total-books").innerHTML = "";
        let content1=`
        
        <div class="total-books">Total number of books : ${total_books} </div>
        
        `
        document.getElementById("total-books").innerHTML +=content1
        document.getElementById("rows").innerHTML=""
        
        for(let carde of cardes){
            
        let content2=`
        <div class="carde" id="cardes">
                <h1 class="name-book">Name Book : ${carde.title}</h1>
                <p>Author name : ${carde.authors[0].name} </p>
                <p>Book Languages : ${carde.languages.join(", ")} </p>
                <p>Download Count : ${carde.download_count}</p>
                    
                
                <button id="Learn-more"  onclick="bookDetails(${carde.id})">Learn more</button>
            </div>
        
        `
        document.getElementById("rows").innerHTML += content2
    }})
}

document.getElementById("next").addEventListener("click", () => {
    if (nextPageUrl) {
        getBooks(nextPageUrl);
    }
});

document.getElementById("prev").addEventListener("click", () => {
    if (prevPageUrl) {
        getBooks(prevPageUrl);
    }
});

function toggleLoader(show=true){
    if(show){
        document.getElementById("loader").style.visibility="visible"
    }else{
        document.getElementById("loader").style.visibility="hidden"
    }
}


function bookDetails(bookId){
    window.location=`../bookDetail/bookDetail.html?bookId=${bookId}`
}



function getbookSearch(){
    let search=document.getElementById("searchInput").value
    toggleLoader(true)
    axios.get(`https://gutendex.com/books?search=${search}`)
    .then((response)=>{
        toggleLoader(false)
        document.getElementById("rows").innerHTML=""
        document.getElementById("total-books").innerHTML = "";
        const cardes=response.data.results
        
        for(let carde of cardes){
        let content=`
                <div class="carde" id="cardes">
                <h1 class="name-book">Name Book : ${carde.title}</h1>
                <p>Author name : ${carde.authors[0].name} </p>
                <p>Book Languages : ${carde.languages.join(", ")} </p>
                <p>Download Count : ${carde.download_count}</p>
                    
                
                <button id="Learn-more"  onclick="bookDetails(${carde.id})">Learn more</button>
            </div>
        
        
        
        `
        document.getElementById("rows").innerHTML += content
}})

}