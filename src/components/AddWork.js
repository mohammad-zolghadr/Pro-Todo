import React, { useEffect, useRef, useState } from 'react';
import useTitle from '../hooks/useTitle';

// Components & Functions
import { Dialog } from './dialog/Dialog';

// Styles & Icons
import style from './AddWork.module.css';
import voiceOn from '../assets/image/voice-on.png';
import voiceOff from '../assets/image/voice-off.png';

// Redux
import { useDispatch } from 'react-redux';
import { addWork } from '../redux/workAdding/workAddAction';

// Speech Recognition
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddWork = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('');
  const [voiceCanSubmit, setVoiceCanSubmit] = useState(false);
  let voiceData = { title: '', desc: '', time: '', priority: '' };
  const [dialogInfo, setDialogInfo] = useState({
    message: '',
    type: false,
    show: false,
  });

  let { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  let [focus, setFocus] = useState('title');
  const inTitleRef = useRef(null),
    inDescRef = useRef(null),
    inPriorityRef = useRef(null),
    inTimeRef = useRef(null);

  const dispatch = useDispatch();
  useTitle('اضافه کردن کار جدید');

  useEffect(() => {
    speechAlgorithm();
    focusHandler();
    if (!listening) {
      if (
        ((focus === 'title' && title) ||
          (focus === 'desc' && desc) ||
          (focus === 'priority' && priority) ||
          (focus === 'time' && time)) &&
        !voiceCanSubmit
      ) {
        speechHandler();
        changeFocus();
      }
      if (voiceCanSubmit) {
        setVoiceCanSubmit(false);
        addWorkHandler();
      }
    }
  }, [transcript, listening]);

  const changeFocus = () => {
    switch (focus) {
      case 'title':
        setFocus('desc');
        break;
      case 'desc':
        setFocus('priority');
        break;
      case 'priority':
        setFocus('time');
        break;
      default:
        setFocus('title');
        break;
    }
  };
  const focusHandler = () => {
    switch (focus) {
      case 'title':
        inTitleRef.current.focus();
        break;
      case 'desc':
        inDescRef.current.focus();
        break;
      case 'priority':
        inPriorityRef.current.focus();
        break;
      case 'time':
        inTimeRef.current.focus();
        break;
      default:
        break;
    }
  };

  const setInfo = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        focus = 'title';
        break;
      case 'description':
        setDesc(e.target.value);
        focus = 'desc';
        break;
      case 'select':
        setPriority(e.target.value);
        focus = 'priority';
        break;
      case 'time':
        e.target.value > 0 && e.target.value < 24 ? setTime(e.target.value) : setTime('');
        focus = 'time';
        break;
    }
    focusHandler();
    setDialogInfo({ ...dialogInfo, show: false });
  };

  const clearInputs = () => {
    setTitle('');
    setDesc('');
    setPriority('');
    setTime('');
  };

  const addWorkHandler = (e = null) => {
    e && e.preventDefault();

    if (title && desc && time && priority) {
      const data = {
        id: getRandom(),
        title: title,
        desc: desc,
        priority: priority,
        time: time,
        isDone: false,
      };
      dispatch(addWork(data));
      clearInputs();
      setFocus('title');
      focusHandler();
      showDialog(true);
    } else showDialog(false);
  };

  const showDialog = (isDone) => {
    isDone
      ? setDialogInfo({ message: 'با موفقیت انجام شد', type: true, show: true })
      : setDialogInfo({ message: 'لطفا همه ورودی ها رو پر کن', type: false, show: true });
  };

  const getRandom = () => {
    return Math.floor(Math.random() * 100000) + 1;
  };

  // ============================ Speech Detection Voice ============================

  const speechAlgorithm = () => {
    // Convert Persian Numbers To English Number
    let e = '۰'.charCodeAt(0);
    transcript = transcript.replace(/[۰-۹]/g, function (t) {
      return t.charCodeAt(0) - e;
    });

    const detectionKey = {
      title: 'عنوان',
      desc: 'توضیح',
      priority: 'اولویت',
      time: 'زمان',
    };

    // Detection Arrays
    const key_high_priority = ['بالا', 'زیاد', 'مهم'];
    const key_low_priority = ['کم', 'پایین', 'بی اهمیت'];
    const key_add_work = ['اوکی', 'تمام', 'اضافه کردن', 'اضافه کن', 'کار بعدی'];

    if (transcript.includes(detectionKey.title)) {
      setFocus('title');
      resetTranscript();
    } else if (transcript.includes(detectionKey.desc)) {
      setFocus('desc');
      resetTranscript();
    } else if (transcript.includes(detectionKey.priority)) {
      setFocus('priority');
      resetTranscript();
    } else if (transcript.includes(detectionKey.time)) {
      setFocus('time');
      resetTranscript();
    } else {
      // Text Algorithm
      switch (focus) {
        case 'title':
          voiceData = { ...voiceData, title: transcript };
          setTitle(voiceData.title);
          break;
        case 'desc':
          voiceData = { ...voiceData, desc: transcript };
          setDesc(voiceData.desc);
          break;
        case 'priority':
          if (checkKey(key_high_priority)) voiceData = { ...voiceData, priority: 'high' };
          else if (transcript.includes('متوسط'))
            voiceData = { ...voiceData, priority: 'medium' };
          else if (checkKey(key_low_priority))
            voiceData = { ...voiceData, priority: 'low' };
          setPriority(voiceData.priority);
          break;
        case 'time':
          if (typeof +transcript === 'number') {
            voiceData = { ...voiceData, time: transcript };
            setTime(transcript);
            setVoiceCanSubmit(true);
          }
          break;
        default:
          break;
      }
      if (checkKey(key_add_work)) addWorkHandler();
    }
  };
  const checkKey = (key) => {
    return key.some((e) => transcript.includes(e));
  };
  const speechHandler = (e) => {
    e && e.preventDefault();
    setDialogInfo({ ...dialogInfo, show: false });
    SpeechRecognition.startListening({ language: 'fa-IR' });
  };

  const btnVoiceStyleChanger = (isListening) => {
    let btnStyle = { className: '', text: '', img: '', imgAnimation: '' };
    isListening
      ? (btnStyle = {
          className: style.btnVoiceOn,
          text: 'در حال ضبط...',
          img: voiceOff,
          imgAnimation: style.animation,
        })
      : (btnStyle = {
          className: style.btnVoiceOff,
          text: 'اطلاعات رو با ویس پر کن',
          img: voiceOn,
        });

    return (
      <button className={btnStyle.className} onClick={(e) => speechHandler(e)}>
        {btnStyle.text}
        <img
          className={`${style.btnVoiceImage} ${btnStyle.imgAnimation}`}
          src={btnStyle.img}
          alt="voice"
        />
      </button>
    );
  };

  return (
    <>
      <form onSubmit={(e) => addWorkHandler(e)}>
        <Dialog data={dialogInfo} />
        <div className={style.btnVoiceWrapper}>
          {listening ? btnVoiceStyleChanger(true) : btnVoiceStyleChanger(false)}
        </div>
        <div>
          <label>عنوان</label>
          <input
            ref={inTitleRef}
            placeholder="مثلا ورزش کردن..."
            type="text"
            value={title}
            onChange={setInfo}
            name="title"
          />
        </div>

        <div>
          <label>توضیحات بیشتر</label>
          <textarea
            ref={inDescRef}
            placeholder="هر توضیحی که بنظرت برای بهتر انجام دادن کار به دردت میخوره بنویس..."
            type="text"
            value={desc}
            onChange={setInfo}
            name="description"
          />
        </div>

        <div className={style.addTimeAndPriority}>
          <div>
            <label>اولویت</label>
            <select ref={inPriorityRef} name="select" value={priority} onChange={setInfo}>
              <option value="low" key="low">
                کم
              </option>
              <option value="medium" key="medium">
                متوسط
              </option>
              <option value="high" key="high">
                مهم
              </option>
            </select>
          </div>
          <div>
            <label>زمان</label>
            <input
              ref={inTimeRef}
              name="time"
              type="number"
              value={time}
              onChange={setInfo}
              placeholder="مدت به ساعت"
            />
          </div>
        </div>

        <button type="submit">اضافه کردن</button>
      </form>
    </>
  );
};

export default AddWork;
