
  var oReq = new XMLHttpRequest();
  var theSubReddit = 'funny';
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "http://www.reddit.com/r/" + theSubReddit + ".json");
  oReq.send();

  var body = document.body;
  body.id = 'body';

function reqListener() {
  var theResponse = JSON.parse(this.responseText);
  render(theResponse.data.children)
}

var dummyImage = 'http://www.userlogos.org/files/logos/lepht/reddit_alien.png';

function render(postArray){
  for(var i = 0; i < postArray.length; i++){
    var thePost = postArray[i].data;
    var id = thePost.id;
    var author = thePost.author;
    var created = thePost.created_utc;
    var domain = thePost.domain;
    var downs = thePost.downs;
    var name = thePost.name;
    var num_comments = thePost.num_comments;
    var permalink = thePost.permalink;
    var score = thePost.score;
    var selftext = thePost.selftext;
    var selftext_html = thePost.selftext_html;
    var stickied = thePost.stickied;
    var subreddit = thePost.subreddit;
    var subreddit_id = thePost.subreddit_id;
    var thumbnail = thePost.thumbnail;
    var title = thePost.title;
    var ups = thePost.ups;
    var url = thePost.url;
    var postDiv = makeElement('div', id, 'body', 'post');
    postDiv.setAttribute('data-domain',domain);
    postDiv.setAttribute('data-created',created);
    postDiv.setAttribute('data-subreddit',subreddit);
    postDiv.setAttribute('data-subreddit_id',subreddit_id);
    var postDivL = makeElement('div', 'postDivL'+id, id, 'postDivL rank');
    var postDivR = makeElement('div', 'postDivR'+id, id, 'postDivR postSummary');
    // var rankSpan = makeElement('span', 'rank'+id, 'postDivL'+id, 'rankSpan');
    var upsDiv = makeElement('div', 'ups'+id, 'postDivL'+id, 'upsDiv', String(ups));
    appendLinebreak('ups'+id);
    var downsDiv = makeElement('div', 'downs'+id, 'postDivL'+id, 'downsDiv', String(downs));
    var thumbDiv = makeElement('div', 'thumb_'+id, 'postDivR'+id, 'thumbDiv');
    var thumbImg = makeElement('img', 'img_'+id, 'thumb_'+id, 'thumbImg');
    if(thumbnail.indexOf('self')<0){
      thumbImg.src = thumbnail;
    } else {
      thumbImg.src = dummyImage;
    }
    var summaryDiv = makeElement('div', 'summary_'+id, 'postDivR'+id, 'summaryDiv');
    var titleSpan = makeElement('span','title'+id,'summary_'+id, 'title', title+'<br>');
    var authorSpan = makeElement('span','author_'+id,'title'+id, 'author', author);

  }
}

// // https://www.reddit.com/r/funny/comments/4qsvo0/developer_humor/

function makeElement(elementType, theElementId, theParentId_, theClassName_, theInnerHTML_, theEventListener_, theFunction_){
  // elementType: String. 'div', 'button', etc.
  // theElementId: String. id of the new element
  // theParentId_: [optional] String. The new element will be appended as a child of the element with this id
  // theClassName_: [optional] String. Class name of the new element
  // theInnerHTML_:  [optional] String. Text that will be in the new element.
  // theEventListener_:  [optional] String. Event listener type, if there is one.
  // theFunction_:  [optional] Function called by the event listener
  var theNewElement = document.createElement(elementType);
  theNewElement.id = theElementId;
  if(arguments.length > 3 && theClassName_.length > 1) theNewElement.className = theClassName_;
  if(arguments.length > 4 && theInnerHTML_.length > 0) theNewElement.innerHTML = theInnerHTML_;
  if(arguments.length > 2 && theParentId_.length > 0) {
    theParent = document.getElementById(theParentId_);
    theParent.appendChild(theNewElement);
  }
  if(arguments.length > 5) {
    theNewElement.addEventListener(theEventListener_, theFunction_);
  }
  return document.getElementById(theElementId);
}


function getRedditPostAge(redditSeconds){
  let currentDateInSeconds = Math.round(Date.now()/1000);
  let d = new Date();
  let currentTimeZoneOffsetInSeconds = d.getTimezoneOffset()*60;
  return (currentDateInSeconds + currentTimeZoneOffsetInSeconds) - redditSeconds;
}

function daysHoursMinutes(theSeconds) {
  let days = Math.floor(theSeconds / 86400);
  theSeconds -= days * 86400;
  let hours = Math.floor(theSeconds / 3600) % 24;
  theSeconds -= hours * 3600;
  let minutes = Math.floor(theSeconds / 60) % 60;
  theSeconds -= minutes * 60;
  return {days: days, hours: hours, minutes: minutes, seconds: theSeconds};
}

function setElementHTML(theElementId, theInnerHTML){
  let theElement = document.getElementById(theElementId);
  theElement.innerHTML = theInnerHTML;
}

function appendLinebreak(theElementId){
    let theElement = document.getElementById(theElementId);
    var lineBreak = document.createElement('br');
    theElement.appendChild(lineBreak);
}
