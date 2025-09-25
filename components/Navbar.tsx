'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { app_logo } from '@/assets';
import { navLinks } from '@/constants';
import { useAppContext } from '@/hooks/useAppContext';
import JobFilters from './JobFilters';

const Navbar = () => {
	const [isMouseOver, setIsMouseOver] = useState(false);
	const { setIsModalOpen } = useAppContext();

	return (
		<>
			<div className='w-full flex items-center justify-center '>
				<nav className='flex items-center justify-around lg:justify-between px-2 md:px-3 lg:px-5 py-3 bg-white rounded-[122px] w-full max-w-[890px] h-[80px] drop-shadow-lg drop-shadow-[#7F7F7F26] mt-[21px]'>
					<Image src={app_logo} width={44} height={44} alt='logo' />
					<ul className='flex items-center justify-center flex-1'>
						{navLinks?.map((item) => (
							<li
								key={item}
								className='text-navbar font-[600] px-[24px] py-[8px] rounded-[12px] p-5 hover:shadow-lg hover:translate-x-1 hover:translate-y-1 duration-300 cursor-default'
							>
								{item}
							</li>
						))}
					</ul>

					<button
						className='linear_gradient cursor-pointer py-[8px] px-[24px] rounded-[30px] text-white text-[16px] font-bold min-w-[140px] relative overflow-hidden h-[40px]'
						onMouseEnter={() => setIsMouseOver(true)}
						onMouseLeave={() => setIsMouseOver(false)}
						onClick={() => setIsModalOpen((prev) => !prev)}
					>
						<span
							className={`absolute left-0 right-0 top-0 w-full flex justify-center items-center transition-all duration-300 ${
								isMouseOver
									? '-translate-y-full opacity-0'
									: 'translate-y-0 opacity-100'
							}`}
							style={{ height: '40px' }}
						>
							Create Jobs
						</span>
						<span
							className={`absolute left-0 right-0 top-0 w-full flex justify-center items-center transition-all duration-300 ${
								isMouseOver
									? 'translate-y-0 opacity-100'
									: 'translate-y-full opacity-0'
							}`}
							style={{ height: '40px' }}
						>
							Login
						</span>
					</button>
				</nav>
			</div>
			<JobFilters />
		</>
	);
};

export default Navbar;
