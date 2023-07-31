import React from 'react';

const ShowNoteWidget = ({ title, content = '', onClick }) => {
  const truncateContent = (text, limit) => {
    const words = text.split(' ');
    const truncatedWords = [];
    
    words.forEach((word) => {
      if (word.length > limit) {
        // If the word is longer than the limit, split it into chunks
        const chunkSize = Math.ceil(word.length / limit);
        for (let i = 0; i < chunkSize; i++) {
          const start = i * limit;
          const end = (i + 1) * limit;
          truncatedWords.push(word.slice(start, end));
        }
      } else {
        truncatedWords.push(word);
      }
    });

    if (truncatedWords.length > limit) {
      return truncatedWords.slice(0, limit).join(' ') + '...';
    }

    return truncatedWords.join(' ');
  };

  const truncatedContent = truncateContent(content, 10);

  return (
    <div className='flex flex-col h-24'>
      <p className='font-semibold text-white text-lg mb-3 mt-2' onClick={onClick}><span className='font-light text-[#d1d1d2] text-sm'>Title: </span>{title}</p>
      <p className='mb-2 cursor-pointer' onClick={onClick}>{truncatedContent}</p>
    </div>
  );
};

export default ShowNoteWidget;
