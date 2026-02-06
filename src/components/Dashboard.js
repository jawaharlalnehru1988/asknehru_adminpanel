import React, { useState } from 'react';
import ConversationsList from './ConversationsList';
import ConversationForm from './ConversationForm';
import RoadmapsList from './RoadmapsList';
import RoadmapForm from './RoadmapForm';

function Dashboard({ onLogout }) {
  const [view, setView] = useState('conversations');
  const [subView, setSubView] = useState('list'); // 'list' or 'form'
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    setEditingId(null);
    setSubView('form');
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setSubView('form');
  };

  const handleBack = () => {
    setEditingId(null);
    setSubView('list');
  };

  const switchView = (newView) => {
    setView(newView);
    setSubView('list');
    setEditingId(null);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <a
            href="#conversations"
            className={view === 'conversations' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              switchView('conversations');
            }}
          >
            Knowledge Base
          </a>
          <a
            href="#roadmaps"
            className={view === 'roadmaps' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              switchView('roadmaps');
            }}
          >
            Roadmaps
          </a>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>AskNehru Content Management</h1>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
        
        {view === 'conversations' && subView === 'list' && (
          <ConversationsList onNew={handleAdd} onEdit={handleEdit} />
        )}
        {view === 'conversations' && subView === 'form' && (
          <ConversationForm
            conversationId={editingId}
            onBack={handleBack}
            onSuccess={handleBack}
          />
        )}
        
        {view === 'roadmaps' && subView === 'list' && (
          <RoadmapsList onNew={handleAdd} onEdit={handleEdit} />
        )}
        {view === 'roadmaps' && subView === 'form' && (
          <RoadmapForm
            roadmapId={editingId}
            onBack={handleBack}
            onSuccess={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
