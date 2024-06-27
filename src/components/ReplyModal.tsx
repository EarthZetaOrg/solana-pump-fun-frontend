import React from 'react';

const ReplyModal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-4 rounded-lg">
        <button onClick={onClose} className="absolute top-0 right-0 m-2 text-black font-bold">X</button>
        {children}
      </div>
    </div>
  );
};

export default ReplyModal;
