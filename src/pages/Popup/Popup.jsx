import React, { useEffect } from 'react';
import './Popup.css';
import { useState } from 'react';
import { AddUrlStorage } from './AddUrlStorage';
import { ShowSaveUrl } from './ShowSaveUrl';

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

  useEffect(() => {
    chrome.storage.sync.get(['blockUrl'], (result) => {
      setBlockUrl(result.blockUrl);
    });

    if (blockUrl.includes(url)) {
      alert('차단된 url입니다.');
      chrome.tabs.update({ url: 'https://spartacodingclub.kr/' });
    }
  }, [url]);

  return (
    <div>
      <AddUrlStorage />
      <ShowSaveUrl />
    </div>
  );
};

class Rule {
  constructor() {
    this.rule = [
      {
        url: 'https://www.naver.com',
        time: 10,
      },
      {
        url: 'https://www.google.com',
        time: 10,
      },
    ];
  }

  addRule(rule) {
    this.rule.push(rule);
  }

  getRule() {
    return this.rule;
  }
}

class RuleHandler {
  constructor() {
    this.rule = new Rule();
  }

  addRule(rule) {
    this.rule.addRule(rule);
  }

  getRule() {
    return this.rule.getRule();
  }

  checkRule(url) {
    const rule = this.rule.getRule();
    for (let i = 0; i < rule.length; i++) {
      if (rule[i].url === url) {
        return true;
      }
    }
    return false;
  }
}

export default Popup;
