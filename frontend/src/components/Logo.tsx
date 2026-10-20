import React from 'react';

interface DiaryLogoProps {
    className?: string;
    iconClassName?: string;
}

export default function DiaryLogo({
    className = '',
    iconClassName = '',
}: DiaryLogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>

            <img
            src="/diary-logo.png"
            alt="Diary Madagascar Logo"
            className={`w-10 h-10 ${iconClassName}`}    
            />
            <span className="bg-[linear-gradient(135deg,#fff3a3_0%,#f0ce52_28%,#d9ab21_58%,#fff1a0_78%,#a87400_100%)] leading-tight uppercase bg-clip-text text-[16px] font-semibold tracking-[-0.015em] text-transparent [text-shadow:0_1px_10px_rgba(184,134,11,0.18)]">
                Diary <br/>
                <span>Madagascar</span>
            </span>
        </div>
    );
}
