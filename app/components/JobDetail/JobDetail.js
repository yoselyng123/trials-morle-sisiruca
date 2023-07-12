import React, { useEffect, useState } from 'react';
import styles from './jobDetail.module.css';
import { HiLightBulb } from 'react-icons/hi';
import {
  BsFillBriefcaseFill,
  BsFillBuildingFill,
  BsArrowUpRightCircle,
} from 'react-icons/bs';
import ReactTimeago from 'react-timeago';
import { useAuthContext } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import Modal from '../Modal/Modal';
import CVSelector from '../CVSelector/CVSelector';
import { getJob } from '@/src/firebase/firestore/job';
import ActionBtn from '../ActionBtn/ActionBtn';

function JobDetail({ clickedCompany, clickedJob, setClickedJob }) {
  const { user } = useAuthContext();

  const router = useRouter();

  const [selectedCVUrl, setSelectedCVUrl] = useState('');
  const [isModalCVOpen, setIsModalCVOpen] = useState(false);
  const [applyBtnClicked, setApplyBtnClicked] = useState(false);

  const handleApply = () => {
    setIsModalCVOpen(true);
  };

  useEffect(() => {
    refetchJob();
  }, [applyBtnClicked]);

  const refetchJob = async () => {
    const { docRef, errorGet } = await getJob(clickedJob);

    if (docRef) {
      setClickedJob(docRef);
    }
  };

  const checkIfUserHasAppliedAlready = () => {
    const found = clickedJob.applicants.find(
      (applicant) => applicant.userId === user.uid
    );

    if (found) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <h5 className={styles.jobTitle}>{clickedJob.title}</h5>
      <p className={styles.jobInfo}>
        {clickedCompany.name} - {clickedJob.location}
      </p>
      <ReactTimeago
        date={clickedJob.publishedDate}
        style={{
          color: '#7C8AA3',
          fontWeight: '400',
          fontSize: '14px',
        }}
      />

      <div className={styles.jobInfoWithIconWrapper}>
        <BsFillBriefcaseFill color='#56687a' size={20} />
        <p className={styles.jobInfo}>
          {clickedJob.jobType} - {clickedJob.requiredExperience}
        </p>
      </div>
      <div className={styles.jobInfoWithIconWrapper}>
        <BsFillBuildingFill color='#56687a' size={20} />
        <p className={styles.jobInfo}>{clickedCompany.companySize} employees</p>
      </div>
      <div className={styles.jobInfoWithIconWrapper}>
        <HiLightBulb color='#56687a' size={20} />
        <p className={styles.jobInfo}>
          {clickedJob.applicants.length} applicants
        </p>
      </div>
      {user ? (
        checkIfUserHasAppliedAlready() ? (
          <button
            className={styles.applyBtn}
            onClick={() => handleApply()}
            disabled={true}
          >
            <p className={styles.applyBtnText}>Already Applied</p>
            <BsArrowUpRightCircle color='rgba(0,0,0,0.2)' size={20} />
          </button>
        ) : (
          <button className={styles.applyBtn} onClick={() => handleApply()}>
            <p className={styles.applyBtnText}>Apply</p>
            <BsArrowUpRightCircle color='#000' size={20} />
          </button>
        )
      ) : (
        <button
          className={styles.applyBtn}
          onClick={() => {
            router.push('/sign-in');
          }}
        >
          <p className={styles.applyBtnText}>Sign in to apply</p>
          <BsArrowUpRightCircle color='#000' size={20} />
        </button>
      )}
      <p className={styles.subtitle}>About the job</p>
      <p className={styles.jobInfoDescription}>{clickedJob.description}</p>

      {user && (
        <>
          <p className={styles.subtitle}>About the company</p>
          <div className={styles.companyWrapper}>
            <img
              className={styles.personalAvatar}
              alt='avatar'
              src={clickedCompany.profilePic}
            />
            <div className={styles.companyInfoWrapper}>
              <p className={styles.companyTitle}>{clickedCompany.name}</p>
              <p className={styles.companyInfoText}>
                Web Url: {clickedCompany.webUrl}
              </p>
              <p className={styles.companyInfoText}>
                Location: {clickedCompany.location}
              </p>
              <p className={styles.companyInfoText}>
                Email: {clickedCompany.email}
              </p>
            </div>
          </div>
        </>
      )}

      {isModalCVOpen && (
        <Modal
          setIsOpen={setIsModalCVOpen}
          modalContent={
            <CVSelector
              selectedCVUrl={selectedCVUrl}
              setSelectedCVUrl={setSelectedCVUrl}
              clickedJob={clickedJob}
              setIsModalCVOpen={setIsModalCVOpen}
              setApplyBtnClicked={setApplyBtnClicked}
              applyBtnClicked={applyBtnClicked}
            />
          }
          overwriteStyle={{
            width: '40vw',
            height: '40vh',
          }}
          overWriteStyleModalContent={{
            padding: '0px',
          }}
        />
      )}
    </div>
  );
}

export default JobDetail;