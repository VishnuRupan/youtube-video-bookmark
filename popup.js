
window.addEventListener('DOMContentLoaded', async function () {

  await renderVideoBookmarkList();

  [...document.querySelectorAll('.remove-btn')].forEach(function (item) {
    item.addEventListener('click', removeVideoFromList);
  });

}
);


chrome.storage.onChanged.addListener(async function () {

  await renderVideoBookmarkList();

  [...document.querySelectorAll('.remove-btn')].forEach(function (item) {
    item.addEventListener('click', removeVideoFromList);
  });
});


async function renderVideoBookmarkList(event, area) {
  (document.querySelector('#video-list-ctn')).innerHTML = "";

  let bkmarkImg = document.createElement('img');
  bkmarkImg.src = chrome.runtime.getURL("images/bookmark.svg");

  let videoArr = await chrome.storage.sync.get("videoObj");

  let ul = document.createElement('ul');
  ul.className = 'video-list';

  for (let video of videoArr.videoObj) {

    ul.innerHTML += ` 
    <li>
          <div class="line"></div>

      <div class="video-item">
      <a href="${video.urlTimestamp}" target="_blank">
        <img src="${video.thumbnail}" width=160 height=90> </a>
        <div class="info">
          <a href="${video.urlTimestamp}" target="_blank">
            <h3>${video.title}</h3>
          </a>

            <span class="text"><strong>Date Updated:</strong> ${video.dateUpdated}</span>
          <div class="details">
          
            <div><p><strong>Timestamp:</strong> ${video.timeStamp}</p> </div>
          
            <button class="remove-btn" id=${video.url} >REMOVE</button>
            </div>
        </div>
      </div>
    </li>
    `;

  }
  //document.querySelector('#video-list-ctn').innerHTML = "";
  document.querySelector('#video-list-ctn').appendChild(ul);
}

async function removeVideoFromList(item) {

  const removeUrl = item.target.id;
  let videoArr = await chrome.storage.sync.get("videoObj");

  for (let video of videoArr.videoObj) {
    if (video.url === removeUrl) {
      let index = videoArr.videoObj.indexOf(video);
      if (index > -1) {
        videoArr.videoObj.splice(index, 1);
      }
      await chrome.storage.sync.set({ "videoObj": videoArr.videoObj });

    }
  }

  let elem = document.getElementById(removeUrl);
  elem.parentNode.removeChild(elem);

}