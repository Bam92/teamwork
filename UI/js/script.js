const modal = document.getElementById('modal')
, bars = document.getElementById('bars')
, closeBtn = document.getElementsByClassName('close')[0]
;

bars.addEventListener('click', () => {
    modal.style.display = "block";
});
    
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = "none";
});

// posts.js file
const articleDOM = document.getElementsByClassName('dash-main')[0]
//, articleElt = document.createElement('article')
;

const createElt = (elt) => document.createElement(elt);

for (let i = 0; i < posts.length; i += 1) {
    // Creates elements
    const articleElt = createElt('article')
    , title = createElt('h3')
    , message = createElt('p')
    , tags = createElt('span')
    , div = createElt('div')
    , paraDate = createElt('p')
    , paraAuthor = createElt('p')
    , imgElt = createElt('img')
    , divBloc = createElt('div') // contains all properties except img for purpose of flex style
    , divImg = createElt('div')
    ;

    // Add properties and content
    divBloc.className = 'post-bloc';
    articleElt.className = 'user-post';
    title.textContent = posts[i].title;
    title.className = 'post-title';
    message.textContent = posts[i].message.slice(0, 65);
    message.className = 'post-description';
    tags.textContent = posts[i].tags;
    tags.className = 'post-tags';
    paraDate.textContent = posts[i].date;
    paraDate.className = 'post-date';
    paraAuthor.textContent = posts[i].author;
    paraAuthor.className = 'post-author';
    imgElt.src = posts[i].img_url;
    imgElt.alt = 'illustration';
    divImg.className = 'post-illustration';

    divImg.appendChild(imgElt);
    div.append(paraDate, paraAuthor);

    divBloc.append(title, tags, message, div);
    articleElt.append(divImg, divBloc);
    articleDOM.appendChild(articleElt);
}