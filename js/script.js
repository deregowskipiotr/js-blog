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