import React from 'react';
import {Link} from "react-router-dom";
import logoBig from '../../assets/images/dest/logo-big.png';

function AboutUsPage() {

  console.log();

  return (
    <main className="page">
      <section className="intro"></section>
      <section className="about">
        <div className="container">
          <div className="about__inner">
            <div className="about__image">
              <img src={logoBig} alt="" className="about__img"/>
            </div>
            <div className="about__content">
              <h2 className="about__title title"><span>Chi</span> siamo</h2>
              <p className="about__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                blanditiis earum minus perspiciatis impedit sint, mollitia
                omnis. Odio nesciunt placeat consequatur reprehenderit eligendi
                iusto asperiores autem aliquam iure perferendis. Esse facere
                nihil eveniet quas, consectetur eius possimus perspiciatis
                aliquid fugiat? At eum libero ea dolorum incidunt eius quae
                repellendus maiores. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ipsum, quaerat! In, pariatur aperiam non
                tempora commodi fugit expedita modi minus enim sapiente
                perspiciatis natus qui nam? Veritatis harum ipsa pariatur,
                corporis tempora voluptas illo et veniam! Quo eos ea deserunt.
              </p>
              <button className="about__btn">
                Scopri di piu su Gold Fox Gaming
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <div className="mission__wrapper">
            <div className="mission__image">
              <img src="https://i.pcmag.com/imagery/roundups/06PrCnKwZ4IEdw5J7cYtmlg-2.fit_lim.size_1050x.jpg" alt="" className="mission__img"/>
            </div>
            <h2 className="mission__title title">Mission</h2>
            <p className="mission__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              tempora cupiditate enim aliquam blanditiis recusandae quasi quia
              facere. Porro, magnam optio? Qui, obcaecati quaerat? In labore
              aspernatur nobis ullam expedita assumenda, earum molestiae laborum
              ex totam nesciunt at id eum harum consequatur, molestias sequi a
              nemo commodi unde minus adipisci. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Modi blanditiis quae eaque pariatur
              iure incidunt molestias architecto delectus! Expedita, mollitia.
            </p>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="team__wrapper">
            <h2 className="team__title title">Crew</h2>
            <ul className="team__list">
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
            </ul>
            <ul className="team__list team__list--second">
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="partner">
        <div className="container">
          <h2 className="partner__title title">Partner</h2>
          <ul className="partner__list">
            <li className="partner__item"><img src="https://pbs.twimg.com/profile_images/1227196756036898821/7TX7ZmQ4_400x400.jpg" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://game-tournaments.com/media/logo/t43022.png?91" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3nRr6HLTmOZq_uLX7ErrHyG5poYecNliwmJiRdkRGwSu2t0WvsX7iIRcqvCwq-kgEgY&usqp=CAU" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://image.freepik.com/free-vector/kurokage-samurai-esport-logo_18228-1114.jpg" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://game-tournaments.com/media/logo/t55124.png?85" alt="" className="partner__image"/></li>
          </ul>
        </div>
      </section>

      <section className="career">
        <div className="container">
          <div className="career__inner">
            <div className="career__image">
              <img src="https://corporate.exxonmobil.com/-/media/Global/Images/New-purchases/business-meeting-breakout-discussions_supporting.jpg" alt="" className="career__img"/>
            </div>
            <div className="career__content">
              <h2 className="career__title title">Career</h2>
              <p className="career__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolores fugit facere
                itaque quisquam doloremque similique qui in! Unde, nam. Aliquid tempora ab porro
                aspernatur, similique
                molestiae ipsam natus, ullam velit earum obcaecati laboriosam iste quae. Voluptates
                ipsum amet
                praesentium, quibusdam nisi dolor, inventore dolore voluptate, accusamus possimus
                dignissimos nam
                aperiam beatae rerum explicabo. Vel recusandae eius nulla, odit reiciendis numquam?</p>
              <Link className="career__btn" to='/SubmitCvForm'>Invia il tuo CV</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;