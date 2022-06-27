'use strict';





function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;   
    
  console.log('Link was clicked!');
  console.log('event');
  console.log('clickedElement' + clickedElement);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log('links');
  for(let activeLink of activeLinks) {
   activeLink.classList.remove('active');
   console.log('activeLinkes');
}

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:' , clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post a.active');

  for(let activeArticle of activeArticles) {
   activeArticle.classList.remove('active');
   console.log('activeArticle');
}
  

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector('articleSelector');
  console.log('targetArticle');

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

  console.log('targetArticle');

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  optArticleTagsSelector = '.post-tags .list';
  



  
function generateTitleLinks(customSelector = '') {  
console.log('customSelector');
  /* remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList');

  /*for each art */
  const articles = document.querySelector(optArticleSelector + customerSelector);
  let html = '';
  for(let article of articles) {
  /* get the article ID*/
    const articleId = article.getAttribute('id');
  /*find title element & get title */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  /*create html of the link */
    const linkHTMLData = {id: articleId, title, articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('linkHtml', linkHTML);
    html = html + linkHTML;
  }

  /* insert link into titleList*/
  html = html + linkHTML;

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    console.log('links');
    
}
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleTagsSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
  const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
  let html = '';

    /* get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');
  console.log('articleTags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
    const taglinkHTMLData = {id: articleTags, title: tag};
    const taglinkHTML = templates.articleTagsLink(taglinkHTMLData);
    console.log(taglinkHTML);  

      /* add generated code to html variable */
    html = html + taglinkHTML;
    /* END LOOP: for each tag */
}
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  /* END LOOP: for every article: */
}
}
generateTags();