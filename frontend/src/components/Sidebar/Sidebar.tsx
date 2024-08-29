import React, { useState, ChangeEvent, useEffect, useContext } from 'react';
import { Mail, Linkedin, Globe, Github, Copy, X } from 'lucide-react'; 
import './Sidebar.css';
import { AuthContext } from '../../context/AuthContext';

// TextWithCopyIcon component
const TextWithCopyIcon: React.FC<{ text: string, isEditing: boolean, onChange: (event: ChangeEvent<HTMLInputElement>) => void, onCopy: () => void, onClear: () => void, isDisabled: boolean }> = ({ text, isEditing, onChange, onCopy, onClear, isDisabled }) => (
  <div className={`bg-[#232323] rounded-md p-2 flex items-center flex-1 ml-2 border-2 ${isDisabled ? 'border-gray-600' : 'border-[rgba(169,169,169,0.6)]'}`} style={{ boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)' }}>
    {isEditing && !isDisabled ? (
      <input 
        type="text" 
        value={text} 
        onChange={onChange} 
        placeholder={text}
        className="flex-1 bg-[#232323] text-[rgba(169,169,169,0.6)] border-none outline-none font-rubik text-sm placeholder-[rgba(169,169,169,0.4)]"
      />
    ) : (
      <span className={`flex-1 ${isDisabled ? 'text-gray-600' : 'text-[rgba(169,169,169,0.6)]'} font-rubik text-sm`}>
        {text}
      </span>
    )}
    {isEditing && !isDisabled ? (
      <X 
        color="#d9d9d9" 
        className="ml-2 cursor-pointer text-white" 
        onClick={onClear} 
        style={{ maxWidth: "20px" }}
      />
    ) : (
      <Copy 
        color={isDisabled ? "#6b7280" : "#d9d9d9"} 
        className={`ml-2 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} text-white`} 
        onClick={isDisabled ? undefined : onCopy} 
        style={{ maxWidth: "20px" }}
      />
    )}
  </div>
);

// TextWithIcon component
const TextWithIcon: React.FC<{ text: string, icon: React.ReactNode, isEditing: boolean, onChange: (event: ChangeEvent<HTMLInputElement>) => void, onCopy: () => void, onClear: () => void, isDisabled: boolean }> = ({ text, icon, isEditing, onChange, onCopy, onClear, isDisabled }) => (
  <div className="flex items-center my-2 w-4/5 p-3 rounded-md" >
    <div className={`mr-7 text-3xl ${isDisabled ? 'text-gray-600' : 'icon-hover'}`}>{icon}</div>
    <TextWithCopyIcon text={text} isEditing={isEditing} onChange={onChange} onCopy={onCopy} onClear={onClear} isDisabled={isDisabled} />
  </div>
);

// SidebarContent component
const SidebarContent: React.FC<{ texts: { text: string, icon: React.ReactNode }[], isEditing: boolean, handleTextChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void, handleCopyClick: (text: string) => void, handleEditClick: () => void, handleClearClick: (index: number) => void, isDisabled: boolean }> = ({ texts, isEditing, handleTextChange, handleCopyClick, handleEditClick, handleClearClick, isDisabled }) => (
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
        isDisabled={isDisabled}
      />
    ))}
    {!isDisabled && (
      <button onClick={handleEditClick} className="self-start mb-4 ml-10 mt-4 flex items-center bg-[#67FFA4] text-black px-4 py-2 rounded-full shadow-lg hover:bg-[#57e293] text-center font-bold text-sm">
        {isEditing ? 'Save' : 'Edit'}
      </button>
    )}
  </div>
);

// Sidebar component
const Sidebar: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [texts, setTexts] = useState<{ text: string, icon: React.ReactNode }[]>([
    { text: 'Email', icon: <Mail className="text-[#67ffa4]" /> },
    { text: 'Linkedin', icon: <Linkedin className="text-[#67ffa4]" /> },
    { text: 'Website', icon: <Globe className="text-[#67ffa4]" /> },
    { text: 'Github', icon: <Github className="text-[#67ffa4]" /> },
  ]);

  const { user } = useContext(AuthContext);

  const id = user?.id;
  const isDisabled = !user; // Gray out content if no user is logged in

  const handleEditClick = () => {
    if (isEditing && user) {
      const commonLinks = texts.map((item) => item.text);

      fetch(`http://localhost:8080/users/${id}/commonLinks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(commonLinks),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Common links updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating common links:', error);
      });
    }
    setIsEditing(!isEditing);
  };

  const handleTextChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newTexts = [...texts];
    newTexts[index].text = event.target.value;
    setTexts(newTexts);
  };

  const handleCopyClick = (text: string) => {
    if (!isDisabled) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        alert('Failed to copy!');
        console.error('Error copying text: ', err);
      });
    }
  };

  const handleClearClick = (index: number) => {
    if (!isDisabled) {
      const newTexts = [...texts];
      newTexts[index].text = '';
      setTexts(newTexts);
    }
  };

  const getCommonLinks = () => {
    if (user && user.accessToken) {
      fetch(`http://localhost:8080/users/${id}/commonLinks`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        const updatedTexts = texts.map((item, index) => ({
          ...item,
          text: data[index] || item.text // Use fetched data if available, otherwise keep the placeholder
        }));
        setTexts(updatedTexts);
      })
      .catch(error => {
        console.error('Error fetching common links:', error);
      });
    }
  };

  useEffect(() => {
    getCommonLinks();
  }, [user]);

  return (
    <div className={`bg-[#201c1c] flex flex-col items-center p-4 h-screen ${isDisabled ? 'opacity-100 pointer-events-none' : ''}`}>
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
        isDisabled={isDisabled} 
      />
    </div>
  );
};

export default Sidebar;
