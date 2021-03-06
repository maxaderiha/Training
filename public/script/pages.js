'use strict';

function mainPage() {
    requestModel.showContent('mainPage').then((code) => {
        document.getElementById('content-body').innerHTML = code;
        reloadNews();
    });
}

function authorizationPage() {
    requestModel.getUserName().then(
        () => {
            requestModel.logOut().then(() => {
                addUserUI();
            });
        },
        () => {
            requestModel.showContent('logInPage').then((code) => {
                const cont = document.getElementById('login-page');
                cont.innerHTML = code;
                cont.style.display = 'block';
                document.querySelector('.incorrect-input').style.visibility = 'hidden';
            });
        });
}

function errorPage() {
    requestModel.showContent('errorPage').then((code) => {
        const cont = document.getElementById('login-page');
        cont.innerHTML = code;
        cont.style.display = 'block';
    });
}

function closeAuthorizationPage() {
    document.getElementById('login-page').style.display = 'none';
}

function closeErrorPage() {
    document.getElementById('login-page').style.display = 'none';
    filter = null;
    filterPage();
}

const options = {weekday: 'narrow', year: 'numeric', month: 'long', day: 'numeric'};

function addPage() {
    requestModel.showContent('addPage').then((code) => {
        document.getElementById('content-body').innerHTML = code;
        document.getElementById('scrollUp').style.display = 'none';
        document.querySelector('.error-add').style.visibility = 'hidden';
    });
}

function filterPage() {
    requestModel.showContent('filterPage').then((code) => {
        document.getElementById('content-body').innerHTML = code;
        document.getElementById('scrollUp').style.display = 'none';
        document.querySelector('.error-filter').style.visibility = 'hidden';
    });
}

function detailViewPage(id) {
    setScroll(window.pageYOffset);
    idEditPage = id;
    requestModel.getArticle(id).then((article) => {
        const artDate = article.createdAt.toLocaleDateString('ru', options);

        window.scrollTo(0, 0);
        requestModel.showContent('detailView').then((code) => {
            document.getElementById('content-body').innerHTML = code;
            document.getElementById('summary-dw').innerHTML = article.summary.slice(0, article.summary.length - 3);
            document.getElementById('title-dw').innerHTML = article.title;
            document.getElementById('author-dw').innerHTML = article.author;
            document.getElementById('time-dw').innerHTML = artDate;
            document.getElementById('img-dw').setAttribute('src', article.img);
            document.getElementById('content-dw').innerHTML = article.content.slice(article.summary.length - 3);
            document.getElementById('scrollUp').style.display = 'block';
            document.getElementById('upOrBackButton').className = 'fa fa-arrow-left fa-3x';
            const tagList = document.querySelector('.tag_list');
            while (tagList.firstChild) {
                tagList.removeChild(tagList.firstChild);
            }
            article.tags.forEach((tag) => {
                const newTag = document.createElement('a');
                newTag.innerHTML = tag;
                tagList.appendChild(newTag);
            });
            addUserUI();
        });
    });
}

function scrollAfterDV() {
    if (getScroll()) {
        window.scrollTo(0, getScroll());
        removeScroll();
    }
}
