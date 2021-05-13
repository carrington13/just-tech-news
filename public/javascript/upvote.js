const { response } = require("express");

async function upvoteClickHandler(event) {
    event.preventDefault();
    
    // takes current url, converts it to a string, splits into separte strings
    // at every '/' and saves the value at index[url.split.length - 1] to get param
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
  }
  
  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);