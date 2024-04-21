/*let post= {
    title:'',
    text: '',
}; */

const posts =[]; //пост состоит из заголока, текста и даты. называется объект
const TITLE_CHARACTER_LIMIT = 10;
const TEXT_CHARACTER_LIMIT = 20;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const addLimit = document.querySelector('.js-characterLimit');
let charCountTitle = document.querySelector('.charCountTitle')
let charCountText = document.querySelector('.charCountText')


newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();
    addPost(postFromUser);
    renderPosts();
});


postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

function validation() {
    const titleLen = postTitleInputNode.value.length;
    const textLen = postTextInputNode.value.length;
    if (titleLen > TITLE_CHARACTER_LIMIT) {
        addLimit.innerText = `Заголовок больше ${TITLE_CHARACTER_LIMIT} символов`;
        addLimit.classList.remove('characterLimit__hidden');
    return;
 }
    if (textLen > TEXT_CHARACTER_LIMIT ) {
        addLimit.innerText = `Пост больше ${TEXT_CHARACTER_LIMIT} символов`; 
        addLimit.classList.remove('characterLimit__hidden');
    return;
 }
addLimit.classList.add('characterLimit__hidden'); //если вышестоящие условия удовлетворены то запускаем скрыть
};

postTitleInputNode.addEventListener('input', countTitle);
postTextInputNode.addEventListener('input', countText);

function countTitle() {
    const titleLen = postTitleInputNode.value.length;
    charCountTitle.textContent = titleLen + "/100";
    
    if (countTitle>100) {
        titleLen.value = titleLen.value.slice(0, 100);
    }
};

function countText() {
    const textLen = postTextInputNode.value.length;
    charCountText.textContent = textLen + "/200";

    if (countText>200) {
        textLen.value = textLen.value.slice(0, 200);  
    }
};

function getPostFromUser() {
    const title = postTitleInputNode.value; // получить данные из поля ввода
    const text = postTextInputNode.value;
        
    return {
        title:title,
        text:text
    };
}

function addPost({title, text}) {
    const dateFix = Date.now();
    const date = new Date(dateFix);
    const formattedDate = `${date.toLocaleDateString()}  ${date.toLocaleTimeString().slice(0,-3)}`;

    posts.push({
        formattedDate: formattedDate,
        title,
        text
});  //сохранить пост
}

function getPost(){
    return posts;/*добавляю внутрь html*/ 
}

function renderPosts() {
    const posts = getPost();
    let postsHTML = '';
    posts.forEach(post => {
    postsHTML  +=  `
    <div class='post'>
        <p class='post__date'>${post.formattedDate}</p>
        <p class='post__title'>${post.title}</p>
        <p class='post__text'>${post.text}</p>
    </div>   
    `
   ;   
                   
});

postsNode.innerHTML = postsHTML;
}