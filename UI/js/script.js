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
, editFormDOM = document.querySelector('.edit-art-form')
;

const createElt = (elt) => document.createElement(elt);

const sortedPosts = posts.slice().sort((a, b) => b.date - a.date)

for (let i = 0; i < posts.length; i += 1) {
  const { message, tags, date, author, title, img_url } = sortedPosts[i];

    const articleElt = createElt('article')
    , titleElt = createElt('h2')
    , messageElt = createElt('p')
    , tagsElt = createElt('p')
    , div = createElt('div')
    , paraDate = createElt('p')
    , paraAuthor = createElt('p')
    , imgElt = createElt('img')
    , divBloc = createElt('div') // contains all properties except img for purpose of flex style
    , divImg = createElt('div')
    , postLink = createElt('a')
    , delBtn = createElt('button')
    , editBtn = createElt('button')
    , barsElt = createElt('i')
    ;

    divBloc.className = 'post-bloc';
    articleElt.className = 'user-post';
    // title.textContent = posts[i].title;
    titleElt.className = 'post-title';
    messageElt.innerHTML = message.slice(0, 115);
    messageElt.className = 'post-description';
    tagsElt.textContent = tags.join('  ');
    tagsElt.className = 'post-tags';
    paraDate.textContent = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    paraDate.className = 'post-date';
    paraAuthor.textContent = author;
    paraAuthor.className = 'post-author';
    imgElt.src = img_url;
    imgElt.alt = 'illustration';
    divImg.className = 'post-illustration';
    // postLink.className = 'post-detail';
    postLink.textContent = title;
    postLink.href = './post.detail.html';
    delBtn.className = 'del-art-btn';
    delBtn.textContent = 'Delete';
    editBtn.className = 'edit-art-btn';
    editBtn.textContent = 'Edit';
    div.className = 'list-post-info';
    barsElt.className = 'fa fa-bars';
    barsElt.id = 'dash-art-actions';


    divImg.appendChild(imgElt);
    div.append(paraDate, tagsElt, paraAuthor);
    titleElt.appendChild(postLink);
    imgElt.appendChild(postLink);

    console.log('postlink', titleElt.appendChild(postLink));

    divBloc.append(titleElt, div, messageElt);
    articleElt.append(divImg, divBloc);

    if (i < 2 && employeeArtDOM) {
        console.log('postlink', titleElt.appendChild(postLink));
        articleElt.append(divImg, divBloc, delBtn, editBtn);
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
    if (e.target === delModal) delModal.style.display = 'none';
});

// Edit aticle
const editBtn = document.querySelectorAll('.edit-art-btn')
, editModal = document.querySelector('.edit-art-modal')
, formTitle = document.querySelector('#edit-title')
, formDescription = document.querySelector('[name=art-description]')
, formTags = document.querySelector('#edit-tags')
;

if (editFormDOM) {
    formTitle.value = title;
    formDescription.textContent = message;
    formTags.value = tags;
}

for (let i = 0; i < editBtn.length; i += 1) {
    editBtn[i].addEventListener('click', () => {
        editModal.style.display = 'block';
    });
}

window.addEventListener('click', e => {
    if (e.target === editModal) editModal.style.display = 'none';
});

// Scroll header
const header = document.querySelector('header');
const sticky = header.offsetTop;

const checkHeader = () => {
  if (window.pageYOffset > sticky) header.classList.add('sticky');
  else header.classList.remove('sticky');
}

window.addEventListener('scroll', checkHeader);
