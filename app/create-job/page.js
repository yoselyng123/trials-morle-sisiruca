'use client';
import React, { useState } from 'react';
import styles from './createJob.module.css';
import ActionBtn from '../components/ActionBtn/ActionBtn';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { useAuthContext } from '@/src/context/AuthContext';
import JobOfferForm from '../components/JobOfferForm/JobOfferForm';

function page() {
  const { user } = useAuthContext();

  const [createJobBtnClick, setCreateJobBtnClick] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <p className={styles.pageTitleTop}>Create Job</p>
          <BiChevronRight size={18} fill='#000' />
          <p className={styles.pageSubtitleTop}>Job Details</p>
        </div>
        <div className={styles.topRightContainer}>
          <ActionBtn
            title='Create job'
            icon={<AiOutlineArrowRight size={18} fill='#000' />}
            actionFunction={() => setCreateJobBtnClick(true)}
            disabled={loading}
          />
        </div>
      </div>
      <JobOfferForm
        setCreateJobBtnClick={setCreateJobBtnClick}
        createJobBtnClick={createJobBtnClick}
        typeForm='create'
      />
    </div>
  );
}

export default page;
