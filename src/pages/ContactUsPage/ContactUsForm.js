//https://www.youtube.com/watch?v=NgWGllOjkbs
//https://www.geeksforgeeks.org/how-to-send-attachments-and-email-using-nodemailer-in-node-js/
//https://www.emailjs.com/docs/examples/reactjs/
import React, {useEffect, useState} from 'react';
import emailjs from 'emailjs-com';
import {init} from 'emailjs-com';
import {useHistory} from 'react-router-dom';

init("user_ryi2yglqohFlHpuZyAqiJ");

export default function ContactUsForm() {
  console.log("contactUsForm worked");

  const [checkBoxState, setCheckBoxState] = useState(true);
  const [sizeExceededError, setSizeExceededError] = useState();
  const [fileSize, setFileSize] = useState(0);
  const history = useHistory();

  useEffect(() => {
      if (fileSize > 512000) {
        setSizeExceededError(true);
      } else {
        setSizeExceededError(false)
      }
    }, [fileSize]
  );

  function sendEmail(e) {
    //This default function prevents the page from refreshing when we click the submit button;
    e.preventDefault();

    if (sizeExceededError === false) {
      e.preventDefault();

      emailjs.sendForm('service_neq4dxf', 'template_sij1vgl', '#contactus-form', 'user_ryi2yglqohFlHpuZyAqiJ')
        .then((result) => {
          console.log("The result is: " + result.text);
          result.text && history.push("/MessageSentPage", {from: "/ContactUsForm"});
        }, (error) => {
          console.log("An error intervened:" + error.text);
          alert("Your message was not sent because " + error.text);
        });
      e.target.reset();
    }
  }

  return (

    <form className="form contact-intro__form" id="contact-form" onSubmit={sendEmail} method="POST">

      <div className="form__box">
        <input className="input"
               placeholder="Name"
               id="name"
               type="text"
               required
               name="name"
        />
      </div>
      <input
        className="input"
        type="email"
        aria-describedby="emailHelp"
        name="email"
        required
        placeholder="Email"
        id="email"
      />
      <input
        className="input"
        aria-describedby="Subject"
        placeholder="Subject"
        id="subject"
        type="text"
        required
        name="subject"
      />

      <textarea
        className="input"
        cols="30"
        rows="1"
        id="message"
        name='message'
        placeholder="Message"
        required
      >
         </textarea>

      <div className="form__box-btn">
        {sizeExceededError && <error>Max file size exceeded</error>}
        <label className='btn-upload label'>
          <span className='icon-upload2'></span>
          Upload
          <input className='visually-hidden' type="file" name="attachment" id="fileInput"
                 onChange={e => setFileSize(e.target.files[0].size)}/>
        </label>
        <button className='btn-upload' type="submit">Submit</button>
      </div>

      {/*<button*/}
      {/*    className="form__upload"*/}
      {/*    type="file"*/}
      {/*><span className="icon-upload2"></span>*/}
      {/*    Upload*/}
      {/*</button>*/}

      {/*<button className="form__send" type="submit">Submit</button>*/}


      <label className='form__check-label'>
        <input
          className="form__check"
          type="checkbox"
          value={!checkBoxState ? "I consent to the processing of my personal data" : ''}
          name="checkbox"
          onChange={() => {
            !checkBoxState ? setCheckBoxState(true) : setCheckBoxState(false);
            console.log(checkBoxState)
          }}
        />
        I consent to the processing of my personal data
      </label>

    </form>


  );

  {/*<form id="contact-form" onSubmit={sendEmail} method="POST">*/
  }
  {/*    <div className="form-group">*/
  }
  {/*        <div className="row">*/
  }
  {/*            <div className="col-md-6">*/
  }
  {/*                <input placeholder="Name"*/
  }
  {/*                       id="name"*/
  }
  {/*                       type="text"*/
  }
  {/*                       className="form-control"*/
  }
  {/*                       required*/
  }
  {/*                       name="name"*/
  }
  {/*                />*/
  }
  {/*            </div>*/
  }
  {/*            <div className="col-md-6">*/
  }
  {/*                <input placeholder="Email"*/
  }
  {/*                       id="email"*/
  }
  {/*                       type="email"*/
  }
  {/*                       className="form-control"*/
  }
  {/*                       aria-describedby="emailHelp"*/
  }
  {/*                       required*/
  }
  {/*                       name="email"*/
  }
  {/*                />*/
  }
  {/*            </div>*/
  }
  {/*        </div>*/
  }
  {/*    </div>*/
  }
  {/*    <div className="form-group">*/
  }
  {/*        <input*/
  }
  {/*            placeholder = "Subject"*/
  }
  {/*            id="subject"*/
  }
  {/*            type="text"*/
  }
  {/*            className="form-control"*/
  }
  {/*            required*/
  }
  {/*            name="subject"*/
  }
  {/*        />*/
  }
  {/*    </div>*/
  }
  {/*    <div className="form-group">*/
  }
  {/*        <textarea placeholder = "Message"  id="message"*/
  }
  {/*                  className="form-control" rows="1"*/
  }
  {/*                  required*/
  }
  {/*                  name="message"*/
  }
  {/*        />*/
  }
  {/*    </div>*/
  }
  {/*    <form>*/
  }
  {/*        <label>*/
  }
  {/*            <input type="file" onChange={()=> ("ContactUsForm form file uploaded.")} />*/
  }
  {/*        </label>*/
  }
  {/*   </form>*/
  }

  {/*    <div className="input-group mb-3">*/
  }
  {/*            <input className="form-check-input mt-0" type="checkbox" value=""/>*/
  }
  {/*            <div> process data</div>*/
  }
  {/*    </div>*/
  }
  {/*   <button type="submit" className="primary-btn submit">Submit</button>*/
  }
  {/*</form>*/
  }
}

