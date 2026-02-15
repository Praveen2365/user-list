import { useState } from 'react';

const Table = ({ users, onDelete, onEdit }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    
    // Add a brief delay for animation
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 300);
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
      {/* Table header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Users Directory</h2>
            <p className="text-blue-100 text-sm mt-1">
              {users.length} {users.length === 1 ? 'user' : 'users'} found
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/80 text-sm">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                <div className="flex items-center">
                  <span>ID</span>
                  <span className="ml-1 text-xs text-gray-400">#</span>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                <div className="flex items-center">
                  <span>User Information</span>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Contact</span>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Status</span>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`
                  border-b border-gray-100 transition-all duration-300 ease-out
                  ${hoveredRow === user.id ? 'bg-blue-50 transform scale-[1.002]' : 'hover:bg-gray-50'}
                  ${deletingId === user.id ? 'opacity-50 bg-red-50' : ''}
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  animate-slideIn
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
                onMouseEnter={() => setHoveredRow(user.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* ID Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                      <span className="font-bold text-blue-700">#{user.id}</span>
                    </div>
                  </div>
                </td>

                {/* Name Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Member since {new Date().getFullYear()}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-900 font-medium">{user.email}</div>
                      <div className="text-xs text-gray-500">Active now</div>
                    </div>
                  </div>
                </td>

                {/* Status Cell */}
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Active
                  </span>
                </td>

                {/* Actions Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(user)}
                      className="
                        relative group
                        px-4 py-2
                        bg-gradient-to-r from-amber-500 to-orange-500
                        text-white
                        rounded-xl
                        font-medium
                        text-sm
                        shadow-md
                        hover:shadow-lg
                        transform transition-all duration-300
                        hover:scale-105
                        active:scale-95
                        overflow-hidden
                        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                      "
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </div>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                      className={`
                        relative group
                        px-4 py-2
                        bg-gradient-to-r from-rose-500 to-red-600
                        text-white
                        rounded-xl
                        font-medium
                        text-sm
                        shadow-md
                        hover:shadow-lg
                        transform transition-all duration-300
                        hover:scale-105
                        active:scale-95
                        overflow-hidden
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                        ${deletingId === user.id ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      
                      {/* Loading animation */}
                      {deletingId === user.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Delete</span>
                        </div>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      {users.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
          <p className="text-gray-500">Add your first user to get started</p>
        </div>
      ) : (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span>Showing {users.length} entries</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Last updated:</span>
              <span className="ml-2 font-medium">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Table;