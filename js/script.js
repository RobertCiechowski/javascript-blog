'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';


// ***              ***
// TITLE CLICK HANDLER
// ***              ***

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('"clickedElement": ' + clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('Href attribute get from the clicked link: ' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('TargetArticle: ' + articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('Added class active to: ' + articleSelector);
}

// ***              ***
// GENERATE TITLE LIST
// ***              ***

function generateTitleLinks(customSelector = '') {
  console.log('GENERATE TITLE LIST');

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('Contents of titleList removed');

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('CustomSelector: ' + customSelector);
  console.log('optArticleSelector + customSelector: ' + optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log('Found Article ID matching to the clicked element: ' + articleId);

    /* [DONE] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] get the title from the title element */

    console.log('Title of found element: ' + articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('Created link of the article added to the article list: ' + linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;

  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// ***              ***
// CALCULATE TAGS PARAMS - Calculate amount of tags - for TAG CLOUD
// ***              ***

function calculateTagsParams(tags) {

  /* [DONE] create a new const params with an object with 2 keys - max = 0, min = 999999 */

  const params = {max : '0', min : '999999'};

  /* [DONE] START LOOP: for every tag */

  for(let tag in tags){

    /* [DONE] set value of params.max and params.min */

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }else if(tags[tag] < params.min){
      params.min = tags[tag];
    }    
    console.log('Tag: "' + tag + '" is used ' + tags[tag] + ' times');

    /* [DONE] END LOOP: for every tag */
  }

  return params;
}

// ***              ***
// CALCULATE TAG CLASS
// ***              ***

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );  
  return optCloudClassPrefix + classNumber;
}

// ***              ***
// GENERATE TAGS
// ***              ***

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find tags wrapper */

    const tags = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('"data-tags" attribute get from the article: ' + articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log('Found tag: ' + tag);
      
      /* [DONE] generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('Generated tag HTML code: ' + linkHTML);

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;  
      
      /* [NEW] check if this link is NOT already in allTags */

      //  if(!allTags.hasOwnProperty(tag)){ **** Błąd w instrukcji? 6.3 Dodawanie nowych tagów do obiektu
      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tags.innerHTML = html;

    /* [DONE] END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */

  //const tagList = document.querySelector('.tags');
  const tagList = document.querySelector(optTagsListSelector);
    
  /* [NEW] TAG CLOUD */

  const tagsParams = calculateTagsParams(allTags);
  console.log('"tagsParams": ', tagsParams);

  /* [NEW] create variable for all links HTML code */

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){
    
    /* [NEW] generate code of a link and add it to allTagsHTML */

    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

  /* [NEW] END LOOP: for each tag in allTags */
  }

  /* [NEW] add html from allTagsHTML to tagList */

  tagList.innerHTML = allTagsHTML;
  //console.log(allTags);
}

generateTags();

// ***              ***
// TAG CLICKED ACTION
// ***              ***

function tagClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Tag was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('Href attribute get from the clicked tag: ' + href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('Clicked tag: ' + tag);

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* [DONE] remove class active */

    activeTag.classList.remove('active');
  
    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const targetTags = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for (let targetTag of targetTags) {

    /* [DONE] add class active */

    targetTag.classList.add('active');
    console.log('Target Tag: ' + targetTag);

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// ***              ***
// ADD CLICK LISTENERS TO TAGS
// ***              ***

function addClickListenersToTags(){

  /* [DONE] find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a, .tags.list a');
  console.log(tagLinks);

  /* [DONE] START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */

  }
}

addClickListenersToTags();

// ***              ***
// GENERATE AUTHORS
// ***              ***

function generateAuthors() {

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find author wrapper */

    const title = article.querySelector(optTitleSelector);

    /* [DONE] get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log('"data-author" attribute get from the article: ' + articleAuthor);

    title.insertAdjacentHTML('afterend', '<div class="post-author"><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></div>');

  /* [DONE] END LOOP: for every article: */
  }
}

generateAuthors();

// ***              ***
// AUTHOR CLICKED ACTION
// ***              ***

function authorClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Author was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('Href attribute get from the clicked author: ' + href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');
  console.log('Author: ' + author);

  /* [DONE] find all tag links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */

  for (let activeAuthor of activeAuthors) {

    /* [DONE] remove class active */

    activeAuthor.classList.remove('active');

    /* [DONE] END LOOP: for each active author link */

  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */

  for (let targetAuthor of targetAuthors) {

    /* [DONE] add class active */

    targetAuthor.classList.add('active');
    console.log('Target Author: ' + targetAuthor);

    /* [DONE] END LOOP: for each found author link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

// ***              ***
// ADD CLICK LISTENERS TO AUTHORS
// ***              ***

function addClickListenersToAuthors(){

  /* [DONE] find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for (let authorLink of authorLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */

  }
}

addClickListenersToAuthors();