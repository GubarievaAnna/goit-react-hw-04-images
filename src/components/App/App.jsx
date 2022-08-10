import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

const App = () => {
  const [keyWord, setKeyWord] = useState('');

  const onSubmitSearch = key => setKeyWord(key);

  const normalizedKeyWord = keyWord.toLowerCase().trim();

  return (
    <div className={s.container}>
      <Searchbar onSubmitSearch={onSubmitSearch} />
      <ImageGallery keyWord={normalizedKeyWord} />
      <ToastContainer />
    </div>
  );
};

export default App;
