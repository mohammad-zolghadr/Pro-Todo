import { useEffect, useState } from 'react';

const SpeechRecognationController = ({ getTextSpeech }) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'fa-IR';
  recognition.interimResults = true;

  const [resultText, setResultText] = useState(['']);
  // const [start, setStart] = useState(true);
  let canSpeech = true;

  useEffect(() => {
    recognition.start();
    // console.log(resultText);
    return () => {
      canSpeech = false;
      recognition.stop();
    };
  }, [resultText]);

  recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join(' ');
    startDetection(text);
    // getTextSpeech('changeFocus');
  });

  recognition.addEventListener('end', () => {
    if (canSpeech) {
      recognition.start();
      // getTextSpeech('changeFocus');
    }
  });

  function startDetection(text) {
    // Convert Numbers To EnglishNumber
    let e = '۰'.charCodeAt(0);
    text = text.replace(/[۰-۹]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    // let tDetection = text.split(' ');
    // let result = { title: '', desc: '', priority: 'low', time: '', addWork: false };

    // tDetection.forEach((element, index) => {
    // if (element.includes('زیاد')) result = { ...result, priority: 'high' };
    // if (element.includes('متوسط')) result = { ...result, priority: 'medium' };
    // if (element.includes('ساعت')) result = { ...result, time: +tDetection[index - 1] };
    // if (element.includes('تمام')) result = { ...result, addWork: true };
    // });

    console.log(text);
    const nextWord = 'خوب';
    // setResultText([...resultText, ` ${text}`]);
    if (text.includes(nextWord)) {
      // getTextSpeech(resultText.toString().replace(',', ''));
      getTextSpeech(text.replace(nextWord, ''));
      // setResultText([]);
    }

    // console.log(text.split(' '));
  }

  return <>{/* <p style={{ marginTop: '100px', color: '#a22' }}>{resultText}</p> */}</>;
};

export default SpeechRecognationController;
