import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="social__title">Seguici sui social</h2>
        <ul className="social__list">
          <li className="social__item">
            <a href="https://www.facebook.com/" className="social__link">
              <span class="icon-facebook2"></span>
            </a>
          </li>
          <li className="social__item">
            <a href="https://www.instagram.com/" className="social__link">
              <span class="icon-instagram"></span>
            </a>
          </li>
          <li className="social__item">
            <a href="https://www.youtube.com/" className="social__link">
              <span class="icon-youtube"></span>
            </a>
          </li>
          <li className="social__item">
            <a href="https://www.twitch.tv/" className="social__link">
              <span class="icon-twitch"></span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};