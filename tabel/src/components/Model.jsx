import { useState, useEffect, useRef } from "react";
import Button from "./AddButton";

const Modal = ({ onClose, onSave, editUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shakeErrors, setShakeErrors] = useState({ name: false, email: false });
  const modalRef = useRef();
  const firstInputRef = useRef();

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
    }
    
    // Focus first input on mount
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 100);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [editUser, onClose]);

  const validateForm = () => {
    const errors = {
      name: !name.trim(),
      email: !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    };
    
    setShakeErrors(errors);
    
    // Trigger shake animations
    if (errors.name || errors.email) {
      setTimeout(() => setShakeErrors({ name: false, email: false }), 500);
    }
    
    return !errors.name && !errors.email;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const userData = { name: name.trim(), email: email.trim() };
    
    if (editUser) {
      onSave({ id: editUser.id, ...userData });
    } else {
      onSave(userData);
    }

    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <>
      {/* Background overlay with animation */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={handleBackgroundClick}
      >
        {/* Modal container with animations */}
        <div 
          ref={modalRef}
          className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-200"
          style={{
            animation: 'modalAppear 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}
        >
          {/* Header with gradient border */}
          <div className="relative mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {editUser ? "✏️ Edit User" : "👤 Add New User"}
            </h2>
            <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Form fields */}
          <div className="space-y-5">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  ref={firstInputRef}
                  type="text"
                  className={`
                    w-full px-4 py-3 pl-11 
                    border-2 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300
                    ${shakeErrors.name 
                      ? 'border-red-500 bg-red-50 animate-shake' 
                      : 'border-gray-300 hover:border-blue-400'}
                    placeholder-gray-400
                  `}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  👤
                </div>
                {shakeErrors.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 animate-pulse">
                    ⚠️
                  </div>
                )}
              </div>
              {shakeErrors.name && (
                <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                  Please enter a valid name
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  className={`
                    w-full px-4 py-3 pl-11
                    border-2 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300
                    ${shakeErrors.email 
                      ? 'border-red-500 bg-red-50 animate-shake' 
                      : 'border-gray-300 hover:border-blue-400'}
                    placeholder-gray-400
                  `}
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ✉️
                </div>
                {shakeErrors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 animate-pulse">
                    ⚠️
                  </div>
                )}
              </div>
              {shakeErrors.email && (
                <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                  Please enter a valid email address
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-gray-200">
            <Button 
              text="Cancel"
              variant="outline"
              onClick={onClose}
              className="px-6"
            />
            <Button
              text={editUser ? "Update User" : "Add User"}
              variant="primary"
              onClick={handleSubmit}
              className="px-6"
              icon={editUser ? "✅" : "➕"}
            />
          </div>

          {/* Form status indicator */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full mr-2 ${name && email ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span>{name && email ? 'Ready to save' : 'Fill all fields'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes modalAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default Modal;