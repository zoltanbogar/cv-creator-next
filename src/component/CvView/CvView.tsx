import React from 'react';

import './style.css';
import {redirect} from "next/navigation";
import CopyCvButton from "@/component/CopyCvButton/CopyCvButton";

{/*@ts-ignore*/}
const CvView = ({cvdata, componentRef, isMiniature, id}) => {
  const handleCvPick = () => {
    redirect('/'+id)
  }
  return (
    <section
      className={`border border-solid flex overflow-hidden relative ${isMiniature ? 'cv-mini' : 'cv-full'}`}
      style={isMiniature ? {} : {minHeight: '4000px'}}
      ref={componentRef}>
      {isMiniature && <a href={`resumes/${id}`} className={'cv-hover'} onClick={handleCvPick}></a>}
      {/*@ts-ignore*/}
      {isMiniature && <CopyCvButton id={id} />}
      <div className="left">
        <div className="name">{cvdata?.name}</div>
        <div className="title">{cvdata?.title}</div>
        <div className="image">
          <img src={cvdata?.image?.url} alt=""/>
        </div>
        <div className="contact">
          <h2>Contact</h2>
          {(cvdata && cvdata.contact) && Object.keys(cvdata.contact).map((e,i) => {
            return (
              <div key={e}>
                <div>{e}</div>
                <div>{cvdata?.contact[e]}</div>
              </div>
            )
          })}
        </div>
        <div className="language">
          <h2>Languages</h2>
          {(cvdata && cvdata?.languages) && Object.keys(cvdata?.languages).map((e,i) => {
            return (
              <div key={e} className={"language__line-wrapper"}>
                <div className={"language__title"}>{cvdata.languages[e]?.label}</div>
                <div className={"progress-bar__border"}>
                  <div className={"progress-bar__fill"} style={{width: `${cvdata.languages[e]?.value / 5 * 100}%`}}></div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="hard">
          <h2>Hard Skills</h2>
          {(cvdata && cvdata.hard) && Object.keys(cvdata.hard).map((e,i) => {
            //console.log(e, cvdata.hard[e])
            return (
              <div key={e} className={"hard__line-wrapper"}>
                <div className={"hard__title"}>{cvdata.hard[e]?.label}</div>
                <div className={"progress-bar__border"}>
                  <div className={"progress-bar__fill"} style={{width: `${cvdata.hard[e]?.value / 5 * 100}%`}}></div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="soft">
          <h2>Soft Skills</h2>
          {(cvdata && cvdata.soft) && Object.keys(cvdata.soft).map((e,i) => {
            //console.log(e, cvdata.hard[e])
            return (
              <div className={'my-2'} key={e}>
                <div>{cvdata.soft[e]?.label}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <div className="desc">{cvdata?.description}</div>
        <div className="work right-side-list">
          <h2>Work History</h2>
          {cvdata && cvdata.work && Object.keys(cvdata.work).map((e, i) => {
            return (
              <div className={"flex gap-4 work-data"} key={`${cvdata.work[e]['company']}_${cvdata.work[e]['title']}`} style={{marginTop: `${cvdata.work[e]['margin']}px`}}>
                <div className="dates w-20">{cvdata.work[e]['from-year']}-{cvdata.work[e]['from-month']?.length === 1 ? `0${cvdata.work[e]['from-month']}` : cvdata.work[e]['from-month']} - {cvdata.work[e]['current'] ? 'Current' : `${cvdata.work[e]['to-year']}-${cvdata.work[e]['to-month']?.length === 1 ? `0${cvdata.work[e]['to-month']}` : cvdata.work[e]['to-month']}`}</div>
                <div className="jobs-data">
                  <div className="job-title">{cvdata.work[e]['title']}</div>
                  <div className="job-company">{cvdata.work[e]['company']}</div>
                  {cvdata?.work[e]['responsibilities'] && (<div className="resp">
                    <div className="resp-label">Responsibilities:</div>
                    <div className="resp-content">{cvdata?.work?.[e]?.['responsibilities'].replaceAll('', '-')}</div>
                  </div>)}
                  {cvdata?.work[e]['results'] && (<div className="results">
                    <div className="results-label">Achieved results:</div>
                    <div className="results-content">{cvdata.work[e]['results']}</div>
                  </div>)}
                  {cvdata?.work[e]['tools'] && (<div className="tools">
                    <div className="tools-label">Used tools:</div>
                    <div className="tools-content">{cvdata.work[e]['tools']}</div>
                  </div>)}
                </div>
              </div>
            )
          })}
        </div>
        <div className="ed right-side-list">
          <h2>Education</h2>
          {cvdata && cvdata.school && Object.keys(cvdata.school).map((e, i) => {
            return (
              <div className={"flex gap-4 work-data"} key={`${cvdata.school[e]['school']}_${cvdata.school[e]['title']}`}>
                <div className="dates w-20">{cvdata.school[e]['from-year']}-{cvdata.school[e]?.['from-month']?.length === 1 ? `0${cvdata.school[e]['from-month']}` : cvdata.school[e]['from-month']} - {cvdata.school[e]['current'] ? 'Current' : `${cvdata.school[e]['to-year']}-${cvdata.school[e]?.['to-month']?.length === 1 ? `0${cvdata.school[e]['to-month']}` : cvdata.school[e]['to-month']}`}</div>
                <div className="jobs-data">
                  <div className="job-title">{cvdata.school[e]['title']}</div>
                  <div className="job-company">{cvdata.school[e]['school']}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="ref-wrapper right-side-list">
          <h2>References</h2>
          {cvdata && cvdata.ref && Object.keys(cvdata.ref).map((e, i) => {
            return (
              <div className={"flex gap-4 ref-data"} key={cvdata.ref[e]['title']}>
                <div className="ref">
                  <div className="ref-title">{cvdata.ref[e]['title']}</div>
                  <div className="ref-description">{cvdata.ref[e]['description']}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default CvView;