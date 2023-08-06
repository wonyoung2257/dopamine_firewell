console.log('This is the background page.');
console.log('Put the background scripts here.');

const doEveryThing = (url) => {
  const isBlockSite = (url) => {
    // block 하기
    return true;
  };

  const blockSite = (url) => {};
  const shameOfYou = () => {
    setTimeout(() => {}, 1000);
    const xhitPrompt = prompt(
      '차단된 URL에 접근하시려면 다음 문자열을 따라 입력해주세요.\n: 나는 스스로를 통제하지 못하는 짐승이다.'
    );
    if (!xhitPrompt) {
      window.location.href =
        'https://www.google.com/search?q=%EC%83%9D%EC%82%B0%EC%A0%81%EC%9D%B8+%EC%82%B6+%EC%82%AC%EB%8A%94+%EB%B2%95&rlz=1C5CHFA_enKR1023KR1023&oq=%EC%83%9D%EC%82%B0%EC%A0%81%EC%9D%B8+%EC%82%B6+%EC%82%AC%EB%8A%94+%EB%B2%95&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIGCAIQABgeMgYIAxAAGB7SAQ4xNTczODE2ODRqMGoxNagCALACAA&sourceid=chrome&ie=UTF-8';
    } else if (xhitPrompt !== '나는 스스로를 통제하지 못하는 짐승이다.') {
      shameOfYou();
    }
  };

  // 차단된 url 처리
  if (isBlockSite(url)) {
    shameOfYou();
  } else if (
    // eslint-disable-next-line no-restricted-globals
    confirm('이 URL을 차단하시겠습니까?')
  ) {
    // alert("결국 접속하셨군요. 'ㅁ'");
    blockSite(url);
  }
  console.log('Script Executed .. ');
}

// if current url is in chrome storage then block it else allow it
chrome.history.onVisited.addListener(function (result) {
  // get blocked url from storage
  // chrome.storage.sync.get(['blockedUrl'], function (result) {
  //   console.log('Value currently is ' + result.blockedUrl);
  //   // if current url is in storage then block it
  //   if (result.blockedUrl.includes(details.url)) {
  //     return { redirectUrl: 'https://spartacodingclub.kr/' };
  //   }
  // });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(result.url);
    console.log(tabs[0].url);
    if (result.url === tabs[0].url) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          // files: ['content.js'],
          function: doEveryThing,
          args: [result.url],
        })
        .catch((err) => console.log(err));
    }
  });
});
