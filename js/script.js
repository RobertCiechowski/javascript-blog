/* eslint-disable no-unused-vars */
'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

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
  console.log('clickedElement: ' + clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('href attribute get from the clicked link: ' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle: ' + articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('added class active to: ' + articleSelector);
}

// ***              ***
// GENERATE TITLE LIST
// ***              ***

function generateTitleLinks(customSelector = '') {
  console.log('GENERATE TITLE LIST');

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('Contents od titleList removed');

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('CustomSelector: ' + customSelector);
  console.log('optArticleSelector + customSelector: ' + optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log('id attribute get from the article: ' + articleId);

    /* [DONE] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] get the title from the title element */

    console.log('title from the title element: ' + articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML: ' + linkHTML);

    /* [IN PROGRESS] insert link into titleList */

    html = html + linkHTML;
    //console.log(html);

  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('const links: ' + links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// ***              ***
// GENERATE TAGS
// ***              ***

function generateTags() {
  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles: ' + articles);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find tags wrapper */

    const tags = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('data-tags attribute get from the article: ' + articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log('Znaleziony tag: ' + tag);
      
      /* [DONE] generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('wygenerowany HTML: ' + linkHTML);

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;        

    /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tags.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
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
  console.log('tag: ' + tag);

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Linki tagów z klasą active: ' + activeTags);

  /* [DONE] START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* [DONE] remove class active */

    activeTag.classList.remove('active');
  
    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const targetTags = document.querySelector('a[href="' + href + '"]');
  console.log('targetTags: ' + targetTags);

  /* [DONE] START LOOP: for each found tag link */

  for (let targetTag of targetTags) {
    console.log('targetTag: ' + targetTag);

    /* [DONE] add class active */

    targetTag.classList.add('active');
    console.log('Target Tag: ' + targetTag);

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);
}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a');
  console.log(tagLinks);

  /* [DONE] START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */

  }
}

addClickListenersToTags();