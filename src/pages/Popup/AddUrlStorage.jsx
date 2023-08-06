// Create a component that receives url and stores it in local storage.

import React, { useEffect } from 'react';
import './Popup.css';
import { useState } from 'react';

export const AddUrlStorage = () => {
  const [blockUrl, setBlockUrl] = useState('');

  // chack url format
  const checkUrl = (url) => {
    const urlRegex = /^(http|https):\/\/[a-zA-Z0-9-_.]+/;
    return urlRegex.test(url);
  };

  // save url list in chrome storage sync
  const saveUrl = () => {
    if (!checkUrl(blockUrl)) {
      alert('url 형식이 올바르지 않습니다.');
      return;
    }
    chrome.storage.sync.get(['blockUrl'], (result) => {
      if (result.blockUrl) {
        const urlList = result.blockUrl.split(',');
        urlList.push(blockUrl);
        chrome.storage.sync.set({ blockUrl: urlList.join(',') }, () => {
          console.log('blockUrl is set to ' + urlList.join(','));
        });
      } else {
        chrome.storage.sync.set({ blockUrl: blockUrl }, () => {
          console.log('blockUrl is set to ' + blockUrl);
        });
      }
    });
  };


  return (
    <div>
      <div>
        <h1>차단할 url을 작성해주세요</h1>
        <input
          type="text"
          value={blockUrl}
          onChange={(e) => {
            setBlockUrl(e.target.value);
          }}
        />
        <button
          onClick={saveUrl}
        >
          차단하기
        </button>
      </div>
    </div>
  );
};
