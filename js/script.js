'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = 'post-author .list',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';


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
  let allTags = {}; /* [NEW] create a new variable allTags with an empty object */ 
  const articles = document.querySelectorAll(optArticleSelector); /* [DONE] find all articles */ 
  for (let article of articles) { /* [DONE] START LOOP: for every article: */   
    const tags = article.querySelector(optArticleTagsSelector); /* [DONE] find tags wrapper */   
    console.log('"Tags warpper" ' + tags);
    console.log('"optArticleTagsSelector" ' + optArticleTagsSelector);
    let html = ''; /* [DONE] make html variable with empty string */   
    const articleTags = article.getAttribute('data-tags'); /* [DONE] get tags from data-tags attribute */
    console.log('"data-tags" attribute get from the article: ' + articleTags);   
    const articleTagsArray = articleTags.split(' '); /* [DONE] split tags into array */
    console.log(articleTagsArray);   
    for(let tag of articleTagsArray){ /* [DONE] START LOOP: for each tag */
      console.log('Found tag: ' + tag);         
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; /* [DONE] generate HTML of the link */
      console.log('Generated tag HTML code: ' + linkHTML);   
      html = html + linkHTML;   /* [DONE] add generated code to html variable */    
      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){ /* [NEW] check if this link is NOT already in allTags */     
        allTags[tag] = 1; /* [NEW] add tag to allTags object */
      } else {
        allTags[tag]++;
      }    
    } /* [DONE] END LOOP: for each tag */   
    console.log('TEST TAGA' + html);
    tags.innerHTML = html; /* [DONE] insert HTML of all the links into the tags wrapper */  
  } /* [DONE] END LOOP: for every article: */ 
  const tagList = document.querySelector(optTagsListSelector); /* [NEW] find list of tags in right column */ 
  const tagsParams = calculateTagsParams(allTags); /* [NEW] TAG CLOUD */
  console.log('"tagsParams": ', tagsParams); 
  let allTagsHTML = ''; /* [NEW] create variable for all links HTML code */ 
  for(let tag in allTags){ /* [NEW] START LOOP: for each tag in allTags: */   
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';  
  } /* [NEW] END LOOP: for each tag in allTags */ 
  tagList.innerHTML = allTagsHTML; /* [NEW] add html from allTagsHTML to tagList */
  //console.log(allTags);
}
generateTags();

// ***              ***
// TAG CLICKED ACTION
// ***              ***

function tagClickHandler(event){ 
  event.preventDefault(); /* [DONE] prevent default action for this event */ 
  const clickedElement = this; /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  console.log('Tag was clicked!'); 
  const href = clickedElement.getAttribute('href'); /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  console.log('Href attribute get from the clicked tag: ' + href); 
  const tag = href.replace('#tag-', ''); /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  console.log('Clicked tag: ' + tag); 
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]'); /* [DONE] find all tag links with class active */ 
  for (let activeTag of activeTags) { /* [DONE] START LOOP: for each active tag link */   
    activeTag.classList.remove('active'); /* [DONE] remove class active */   
  } /* [DONE] END LOOP: for each active tag link */ 
  const targetTags = document.querySelectorAll('a[href="' + href + '"]'); /* [DONE] find all tag links with "href" attribute equal to the "href" constant */ 
  for (let targetTag of targetTags) { /* [DONE] START LOOP: for each found tag link */   
    targetTag.classList.add('active'); /* [DONE] add class active */
    console.log('Target Tag: ' + targetTag);   
  } /* [DONE] END LOOP: for each found tag link */ 
  generateTitleLinks('[data-tags~="' + tag + '"]'); /* [DONE] execute function "generateTitleLinks" with article selector as argument */
}

// ***              ***
// ADD CLICK LISTENERS TO TAGS
// ***              ***

function addClickListenersToTags(){  
  const tagLinks = document.querySelectorAll('.post-tags .list a, .tags.list a'); /* [DONE] find all links to tags */
  console.log(tagLinks);
  for (let tagLink of tagLinks) { /* [DONE] START LOOP: for each link */  
    tagLink.addEventListener('click', tagClickHandler); /* [DONE] add tagClickHandler as event listener for that link */ 
  } /* [DONE] END LOOP: for each link */
}
addClickListenersToTags();

// ***              ***
// GENERATE AUTHORS
// ***              ***

function generateAuthors() {  
  let allAuthors = {}; /* [NEW] create a new variable allAuthors with an empty array */ 
  const articles = document.querySelectorAll(optArticleSelector); /* [DONE] find all articles */ 
  for (let article of articles) { /* [DONE] START LOOP: for every article: */   
    const authors = article.querySelector(optArticleAuthorsSelector); /* [DONE] find author wrapper */   
    console.log('"Authors wrapper:" ' + authors);
    console.log('"optArticleAuthorsSelector:" ' + optArticleAuthorsSelector);
    let html = ''; /* [DONE] make html variable with empty string */   
    const author = article.getAttribute('data-author'); /* [DONE] get author from data-author attribute */
    console.log('"data-author" attribute get from the article: ' + author);   
    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>'; /* [DONE] generate HTML of the link */
    console.log('Generated author HTML code: ' + linkHTML);   
    html = html + linkHTML; /* [DONE] add generated code to html variable */  
    if(!Object.prototype.hasOwnProperty.call(allAuthors, author)){ /* [NEW] check if this link is NOT already in allAuthors */     
      allAuthors[author] = 1; /* [NEW] add author to allAuthors object */
    } else {
      allAuthors[author]++;
    }   
    //console.log('TEST' + html);
    authors.innerHTML = html; /* [DONE] insert HTML of all the links into the authors wrapper */
    //title.insertAdjacentHTML('afterbegin', '<li><a href="#author-' + author + '">' + author + '</a></li>');  
  } /* [DONE] END LOOP: for every article: */ 
  const authorList = document.querySelector(optAuthorsListSelector); /* [NEW] find list of authors in right column */     
  const authorsParams = calculateTagsParams(allAuthors); /* [NEW] AUTHOR CLOUD */
  console.log('"authorsParams": ', authorsParams);    
  let allAuthorsHTML = ''; /* [NEW] create variable for all links HTML code */    
  for(let author in allAuthors){ /* [NEW] START LOOP: for each tag in allAuthors: */      
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a class="' + calculateTagClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '">' + author + '</a></li>';     
  } /* [NEW] END LOOP: for each tag in allAuthors */    
  authorList.innerHTML = allAuthorsHTML; /* [NEW] add html from allAuthorsHTML to uthorList */
  //console.log(allAuthors  );
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