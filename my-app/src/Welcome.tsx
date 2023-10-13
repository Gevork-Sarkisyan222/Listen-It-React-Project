import React, { useEffect } from 'react';
import './App.scss';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const naivgate = useNavigate();

  //   Scroll Top: 695

  const hadleWentToHome = () => {
    naivgate('/');
  };

  const handleScroll = () => {
    const scrollToY = 695;
    window.scrollTo({
      top: scrollToY,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="Welcome-Main">
        <div className="title-content">
          <h1>Лучший Сайт Музыки</h1>
          <p>Слушайте популярные музыки, только здесь радуйтесь, вдохновляйтесь только здесь.</p>

          <section className="buttons-section">
            <button onClick={hadleWentToHome} className="first-button">
              Перейти
            </button>
            <button className="second-button" onClick={handleScroll}>
              Узнать Больше
            </button>
          </section>
        </div>
        <div className="main">
          <div className="currentplaying">
            <img
              className="logo"
              src="https://cdn-icons-png.flaticon.com/512/3003/3003089.png"
              alt=""
            />
            <p className="heading">Listen It</p>
          </div>
          <div className="loader">
            <div className="song">
              <p className="name">Слушайте наши песни</p>
              <p className="artist">Трендовые песни 🔥🔥🔥🔥</p>
            </div>
            <div className="albumcover"></div>
            <div className="loading">
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
            </div>
          </div>
          <div className="loader">
            <div className="song">
              <p className="name">Добавляй в плейлист</p>
              <p className="artist">новые песни 🎧🎧🎧</p>
            </div>
            <div className="albumcover"></div>
            <div className="play"></div>
          </div>
          <div className="loader">
            <div className="song">
              <p className="name">Наслаждайся хитом</p>
              <p className="artist">душевные песни 🎶 🎼 🎶</p>
            </div>
            <div className="albumcover"></div>
            <div className="play"></div>
          </div>
        </div>
      </div>
      <div className="Down-Welcome-Main">
        <div className="first-title-block">
          <h1>Описание о нашем сайте</h1>
          <p>
            Наш сайт представляет собой уникальное пространство для всех любителей музыки, где
            каждый найдет что-то особенное и вдохновляющее.
          </p>
        </div>
        <div className="Radius-images">
          <div className="First-images-content"></div>
          <div className="Second-images-content"></div>
        </div>
        <div className="left-content-info">
          <h1>Наша миссия</h1>
          <p>
            Мы стремимся сделать музыку доступной для каждого. Независимо от того, являетесь ли вы
            музыкантом или просто ценителем музыки, здесь вы найдете музыкальное вдохновение.
          </p>
          <button onClick={hadleWentToHome} className="btn" type="button">
            <strong>НАЧАТЬ</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </div>
        <form className="Email-Help-Form">
          <div className="form-container">
            <form className="form">
              <div className="form-group">
                <label htmlFor="email">Укажите вашу почту</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="textarea">Задайте вопрос как мы можем вам помочь?</label>
                <textarea name="textarea" id="textarea" rows={10} cols={50} required></textarea>
              </div>
              <button className="form-submit-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </form>
      </div>
    </>
  );
};

export default Welcome;
