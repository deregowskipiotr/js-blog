'use strict';

const templates = {
  
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),

};



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

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    console.log('activeArticle');
  }
  

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

  //console.log('targetArticle:', targetArticle);

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.author';



  
function generateTitleLinks(customSelector = '') {  
  console.log('customSelector');
  /* remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList');

  /*for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles) {
  /* get the article ID*/
    const articleId = article.getAttribute('id');
    /*find title element & get title */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*create html of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('linkHtml', linkHTML);
    html = html + linkHTML;
  }

  /* insert link into titleList*/
  

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    //console.log(link);
    
  }
}

generateTitleLinks();

function calculateTagsParams(tags){

  const params = {max: 0, min: 9999};
  for(let tag in tags){
    console.log(tag + 'is used' + tags[tag] + 'times');

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}
function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

//calculateTagClass();


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      //console.log(tag);
      /* generate HTML of the link */
      const taglinkHTMLData = {id: articleTags, title: tag};
      const taglinkHTML = templates.tagLink(taglinkHTMLData);
      console.log(taglinkHTML);  

      /* add generated code to html variable */
      html = html + taglinkHTML;
      //console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
    
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags */
  for(let tag in allTags){
  /* [NEW] generate code of link and add it to allTagsHTML*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);

}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  //console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag:', '');

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
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');    
    /* generate HTML of the link */
    const linkHTMLData = {id: 'author-', title: articleAuthor};
    const authorlinkHTML = templates.authorLink(linkHTMLData);
    /* add generated code to html variable */
    html = html + authorlinkHTML;
    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors.hasOwnProperty(articleAuthor)) {
    /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;  
  /* END LOOP: for every article: */
  }
  const links = articles.querySelectorAll('.authors');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  }
  const authorList = document.querySelector('.authors');
  const authorParms = calculateAuthorParms(allAuthors);
  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {authors: []};
  /* [NEW] START LOOP: for each tag in allTags */
  for(let author in allAuthors){
  /* [NEW] generate code of link and add it to allTagsHTML*/
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author], authorsParams)
    });
  /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
 
}

generateAuthors();


function addClickListenersToAuthors(){
  /* find all links to author */
  const allLinksToAuthor = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let link of allLinksToAuthor){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click, authorClickHandler');
  /* END LOOP: for each link */
  }
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
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for(let authorLink of authorLinks){
    /* remove class active */
    authorLink.classList.remove('active');
  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinkHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for(let authorLinkHref of authorLinkHref){
    /* add class active */
    authorLinkHref.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-author="' + tag + '"]');
}

//authorClickHandler();