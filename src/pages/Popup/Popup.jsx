import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [url, setUrl] = useState('');
  const [blockUrl, setBlockUrl] = useState([]);

  useEffect(() => {
    const getChromeTab = async () => {
      let queryOptions = { active: true, currentWindow: true };
      let tabs = await chrome.tabs.query(queryOptions);
      setUrl(tabs[0].url);
      return tabs[0].url;
    };
    getChromeTab();
  }, []);
  return <div className="App">{url}</div>;
};

export default Popup;
