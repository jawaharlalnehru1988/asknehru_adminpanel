import React, { useState } from 'react';
import ConversationsList from './ConversationsList';
import ConversationForm from './ConversationForm';
import RoadmapsList from './RoadmapsList';
import RoadmapForm from './RoadmapForm';
import YogaPosesList from './YogaPosesList';
import YogaPoseForm from './YogaPoseForm';

function Dashboard() {
  const [view, setView] = useState('conversations');
  const [subView, setSubView] = useState('list'); // 'list' or 'form'
  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = () => {
    setEditingItem(null);
    setSubView('form');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setSubView('form');
  };

  const handleBack = () => {
    setEditingItem(null);
    setSubView('list');
  };

  const switchView = (newView) => {
    setView(newView);
    setSubView('list');
    setEditingItem(null);
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
          <a
            href="#yoga"
            className={view === 'yoga' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              switchView('yoga');
            }}
          >
            Yoga Poses
          </a>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>AskNehru Content Management</h1>
        </div>
        
        {view === 'conversations' && subView === 'list' && (
          <ConversationsList onNew={handleAdd} onEdit={(item) => handleEdit(item.id)} />
        )}
        {view === 'conversations' && subView === 'form' && (
          <ConversationForm
            conversationId={editingItem}
            onBack={handleBack}
            onSuccess={handleBack}
          />
        )}
        
        {view === 'roadmaps' && subView === 'list' && (
          <RoadmapsList onNew={handleAdd} onEdit={(item) => handleEdit(item.id)} />
        )}
        {view === 'roadmaps' && subView === 'form' && (
          <RoadmapForm
            roadmapId={editingItem}
            onBack={handleBack}
            onSuccess={handleBack}
          />
        )}
        
        {view === 'yoga' && subView === 'list' && (
          <>
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Yoga Poses Management</h2>
              <button
                onClick={handleAdd}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add New Pose
              </button>
            </div>
            <YogaPosesList onEdit={handleEdit} />
          </>
        )}
        {view === 'yoga' && subView === 'form' && (
          <YogaPoseForm
            pose={editingItem}
            onClose={handleBack}
            onSuccess={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
