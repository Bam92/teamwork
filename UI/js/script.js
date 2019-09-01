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
const articleDOM = document.getElementsByClassName('list-posts')[0]
, employeeArtDOM = document.querySelector('.my-posts')
;

const createElt = (elt) => document.createElement(elt);

for (let i = 0; i < posts.length; i += 1) {
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
    , postLink = createElt('a')
    , delBtn = createElt('button')
    ;

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
    postLink.className = 'post-detail';
    postLink.textContent = 'Read the article';
    postLink.href = './post.detail.html';
    delBtn.className = 'del-art-btn';
    delBtn.textContent = 'Delete';

    divImg.appendChild(imgElt);
    div.append(paraDate, paraAuthor);

    divBloc.append(title, tags, message, div);
    articleElt.append(divImg, divBloc, postLink);

    if (i < 2 && employeeArtDOM) {
        articleElt.append(divImg, divBloc, postLink, delBtn);
        employeeArtDOM.appendChild(articleElt);
    }

    if (articleDOM) articleDOM.appendChild(articleElt);
}

const randomPost = () => {
    const index = Math.floor(Math.random() * posts.length);
    return index;
}

const artDetailContent = document.getElementsByClassName('post-content')[0]
, titleDOM = document.getElementsByClassName('post-detail-title')[0]
, imgDOM = document.querySelector('[post-detail-img]')
, authorDOM = document.querySelector('.author-name')
, dateDOM = document.querySelector('.post-date')
;

const { title, message, img_url, date, author, tags } = posts[randomPost()];

if (titleDOM) {
    titleDOM.append(title);
    imgDOM.src = img_url;
    authorDOM.textContent = author;
    dateDOM.textContent = date;
    artDetailContent.innerHTML += message;
}

// Confirm deletion of article
const delBtn = document.querySelectorAll('.del-art-btn')
, delModal = document.querySelector('.del-art-modal')
;

for (let i = 0; i < delBtn.length; i += 1) {
    delBtn[i].addEventListener('click', () => {
        delModal.style.display = "block";
    });
}

window.addEventListener('click', e => {
    if (e.target === delModal) delModal.style.display = "none";
});