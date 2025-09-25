'use client';

import React, { useState } from 'react';
import { CreateJob, JobList, Navbar } from '@/components';
import { useAppContext } from '@/hooks/useAppContext';

const Home = () => {
    const { isModalOpen } = useAppContext();
    const [refreshFlag, setRefreshFlag] = useState(false);

    // This function will be called after a job is published
    const handleJobCreated = () => {
        setRefreshFlag((prev) => !prev); // Toggle to trigger re-fetch
    };

    return (
        <>
            {isModalOpen && <CreateJob onJobCreated={handleJobCreated} />}
            <div className='w-full h-screen bg-primary'>
                <div className='w-full bg-white'>
                    <Navbar />
                </div>
                <div className='container'>
                    <JobList refreshFlag={refreshFlag} />
                </div>
            </div>
        </>
    );
};

export default Home;
