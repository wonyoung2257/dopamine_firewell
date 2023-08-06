//list up all the saved urls
import React from 'react';
import './Popup.css';
import { useState } from 'react';

export const ShowSaveUrl = () => {
  const [blockUrl, setBlockUrl] = useState([]);

  const getBlockUrl = () => {
    chrome.storage.sync.get(['blockUrl'], (result) => {
      result.blockUrl = result.blockUrl.split(',');

      setBlockUrl(result.blockUrl);
    });
  };

  getBlockUrl();

  return (
    <div>
      <div>
        <h1>저장된 url</h1>
        {blockUrl.map((url, index) => {
          return <div key={index}>{url}</div>;
        })}
      </div>
    </div>
  );
};
