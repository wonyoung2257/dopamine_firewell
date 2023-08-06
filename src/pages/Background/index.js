console.log('This is the background page.');
console.log('Put the background scripts here.');

// if current url is in chrome storage then block it else allow it
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    // get blocked url from storage
    chrome.storage.sync.get(['blockedUrl'], function (result) {
      console.log('Value currently is ' + result.blockedUrl);
      // if current url is in storage then block it
      if (result.blockedUrl.includes(details.url)) {
        return { redirectUrl: 'https://spartacodingclub.kr/' };
      }
    });

    console.log('details', details);
    return { redirectUrl: 'https://spartacodingclub.kr/' };
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);
