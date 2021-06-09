import React, {useEffect, useState} from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
init("user_ryi2yglqohFlHpuZyAqiJ");

export default function SubmitCvForm() {
  console.log("ResumeForm worked");

  const {t} = useTranslation();
  const [checkBoxState, setCheckBoxState] = useState(true);
  const [sizeExceededError, setSizeExceededError] = useState();
  const [fileSize, setFileSize] = useState(0);
  const history = useHistory();

  useEffect(()=>{
        if(fileSize>512000){
          setSizeExceededError(true);
        }else{
          setSizeExceededError(false)
        }
      },[fileSize]
  );

  function sendEmail(e) {
    //This default function prevents the page from refreshing when we click the submit button;
    e.preventDefault();

    if(sizeExceededError===false) {
      e.preventDefault();

      emailjs.sendForm('service_neq4dxf', 'template_cmcxzgs', '#resume-form', 'user_ryi2yglqohFlHpuZyAqiJ')
          .then((result) => {
            console.log("The result is: " + result.text);
            result.text && history.push("/", {from: "/SubmitCVForm"});
          }, (error) => {
            console.log("An error intervened:" + error.text);
            alert("Your message was not sent because " + error.text);
          });
      e.target.reset();
    }
  }

  return (
    <>
      <div className='form-update__body'>
        <form
            className="form-update"
            id="resume-form"
            onSubmit={sendEmail}
            method="POST"
        >

          <label className='form-update__label'>
            Name
            <input
                className='form-update__input'
                placeholder={t('SubmitCVForm.NamePlaceHolder')}
                id="name"
                type="text"
                required
                name="name"
            />
          </label>
          <label className='form-update__label'>
            Email
            <input
                className='form-update__input'
                type="email"
                required
                placeholder="Email"
                id="email"
                aria-describedby="emailHelp"
                name="email"
            />
          </label>

          <label className="form-article__label-check form-cv ml-4">
            <input
                className="form-check-input mr"
                type="checkbox"
                value={!checkBoxState?"I consent to the processing of my personal data.":''}
                name="checkbox"
                onChange={()=> {
                  !checkBoxState?setCheckBoxState(true):setCheckBoxState(false);
                  console.log(checkBoxState)}}
            />
              {t('SubmitCVForm.Consent')}
          </label>

          <div className="form-article__box-btn">
            {/*<label className='form-article__label btn-upload'>*/}
            {/*  <span className='icon-upload2'></span>*/}
            {/*  Upload*/}
            {/*  <input className='form-article__btn visually-hidden' type="file" placeholder='file'/>*/}
            {/*</label>*/}

            {sizeExceededError&&<error>{t("SubmitCVForm.MaxFileSizeExceeded")}</error>}
            <label style={{display:"block"}}>Attach File:</label>
            <input className='form__name' type="file" name="attachment" id="fileInput" onChange={e=>setFileSize(e.target.files[0].size)}/>
            <input className='btn-upload' type="submit" value={t("SubmitCVForm.SubmitButton")} />
          </div>
        </form>
      </div>
    </>
  );
}