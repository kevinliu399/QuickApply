import React, { useState, ChangeEvent, useEffect } from 'react';
import { Mail, Linkedin, Globe, Github, Copy, X } from 'lucide-react'; // Import icons from Lucide
import './Sidebar.css';

// TextWithCopyIcon component
const TextWithCopyIcon: React.FC<{ text: string, isEditing: boolean, onChange: (event: ChangeEvent<HTMLInputElement>) => void, onCopy: () => void, onClear: () => void }> = ({ text, isEditing, onChange, onCopy, onClear }) => (
  <div className="bg-[#232323] rounded-md p-2 flex items-center flex-1 ml-2 border-2 border-[rgba(169,169,169,0.6)]" style={{ boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)' }}>
    {isEditing ? (
      <input 
        type="text" 
        value={text} 
        onChange={onChange} 
        className="flex-1 bg-[#232323] text-[rgba(169,169,169,0.6)] border-none outline-none font-rubik text-sm"
      />
    ) : (
      <span className="flex-1 text-[rgba(169,169,169,0.6)] font-rubik text-sm">{text}</span>
    )}
    {isEditing ? (
      <X 
        color="#d9d9d9" 
        className="ml-2 cursor-pointer text-white" 
        onClick={onClear} 
        style={{ maxWidth: "20px" }}
      />
    ) : (
      <Copy 
        color="#d9d9d9" 
        className="ml-2 cursor-pointer text-white" 
        onClick={onCopy} 
        style={{ maxWidth: "20px" }}
      />
    )}
  </div>
);

// TextWithIcon component
const TextWithIcon: React.FC<{ text: string, icon: React.ReactNode, isEditing: boolean, onChange: (event: ChangeEvent<HTMLInputElement>) => void, onCopy: () => void, onClear: () => void }> = ({ text, icon, isEditing, onChange, onCopy, onClear }) => (
  <div className="flex items-center my-2 w-4/5 my-3 p-3 rounded-md" >
    <div className="mr-7 text-3xl">{icon}</div>
    <TextWithCopyIcon text={text} isEditing={isEditing} onChange={onChange} onCopy={onCopy} onClear={onClear} />
  </div>
);

// SidebarContent component
const SidebarContent: React.FC<{ texts: { text: string, icon: React.ReactNode }[], isEditing: boolean, handleTextChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void, handleCopyClick: (text: string) => void, handleEditClick: () => void, handleClearClick: (index: number) => void }> = ({ texts, isEditing, handleTextChange, handleCopyClick, handleEditClick, handleClearClick }) => (
  <div className="links-box flex flex-col items-center w-full">
    {texts.map((item, index) => (
      <TextWithIcon 
        key={index} 
        text={item.text} 
        icon={item.icon} 
        isEditing={isEditing} 
        onChange={(e) => handleTextChange(index, e)} 
        onCopy={() => handleCopyClick(item.text)} 
        onClear={() => handleClearClick(index)} 
      />
    ))}
    <button onClick={handleEditClick} className="self-start mb-4 ml-10 mt-4 flex items-center bg-[#67FFA4] text-black px-4 py-2 rounded-full shadow-lg hover:bg-[#57e293] text-center font-bold text-sm">
      {isEditing ? 'Save' : 'Edit'}
    </button>
  </div>
);

// Sidebar component
const Sidebar: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [texts, setTexts] = useState<{ text: string, icon: React.ReactNode }[]>([
    { text: 'Text 1', icon: <Mail className="text-[#67ffa4]" /> },
    { text: 'Text 2', icon: <Linkedin className="text-[#67ffa4]" /> },
    { text: 'Text 3', icon: <Globe className="text-[#67ffa4]" /> },
    { text: 'Text 4', icon: <Github className="text-[#67ffa4]" /> },
  ]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newTexts = [...texts];
    newTexts[index].text = event.target.value;
    setTexts(newTexts);
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy!');
      console.error('Error copying text: ', err);
    });
  };

  const handleClearClick = (index: number) => {
    const newTexts = [...texts];
    newTexts[index].text = '';
    setTexts(newTexts);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1300);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isSidebarVisible && (
        <div className="sidebar bg-[#201c1c] flex flex-col items-center p-4 h-screen">
          <h1 className="text-5xl mb-20 mt-20 font-rubik font-semibold text-center text-[rgba(255,255,255)]">
            QuickApply
          </h1>
          <SidebarContent 
            texts={texts} 
            isEditing={isEditing} 
            handleTextChange={handleTextChange} 
            handleCopyClick={handleCopyClick} 
            handleEditClick={handleEditClick} 
            handleClearClick={handleClearClick} 
          />
        </div>
      )}
      {!isSidebarVisible && (
        <button onClick={() => setIsSidebarVisible(true)} className="toggleButton fixed top-4 right-4 bg-[#67FFA4] text-black px-4 py-2 rounded-full shadow-lg hover:bg-[#57e293]">
          Links
        </button>
      )}
    </div>
  );
};

export default Sidebar;
