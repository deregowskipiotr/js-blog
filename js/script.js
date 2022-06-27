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
  optArticleAuthorSelector = '.post-author',
  
  



  
function generateTitleLinks(customSelector = '') {  
console.log('customSelector');
  /* remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList');

  /*for each art */
  const articles = document.querySelector(optArticleSelector + customSelector);
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

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag: ', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
  activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(sameTagLinks);
  /* START LOOP: for each found tag link */
  for(let sameTagLink of sameTagLinks){
    /* add class active */
    sameTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let allTagsLink of allTagsLinks){
    /* add tagClickHandler as event listener for that link */
  allTagsLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
}
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
  const titleList = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
  const articleAuthor = article.getAttribute('data-author');    
      /* generate HTML of the link */
      const linkHTMLData = {id: 'author-', title: articleAuthor};
      const authorlinkHTML = templates.authorLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + authorlinkHTML;
    

    /* insert HTML of all the links into the author wrapper */
  authorWrapper.innerHTML = html;  
  /* END LOOP: for every article: */
  }
}

generateAuthors()


function addClickListenersToAuthors(){
  /* find all links to author */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

}

addClickListenersToAuthors ();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */

  /* START LOOP: for each active author link */

    /* remove class active */

  /* END LOOP: for each active author link */

  /* find all author links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found author link */

    /* add class active */

  /* END LOOP: for each found author link */

  /* execute function "generateTitleLinks" with article selector as argument*/

}

authorClickHandler();