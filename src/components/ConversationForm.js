import React, { useState, useEffect } from 'react';
import {
  getConversation,
  createConversation,
  updateConversation,
  getRoadmapMainTopics,
} from '../services/api';

function ConversationForm({ conversationId, onBack, onSuccess }) {
  const [mainTopics, setMainTopics] = useState([]);
  const [formData, setFormData] = useState({
    mainTopic: '',
    subTopic: '',
    article: '',
    positiveConversation: '',
    negativeConversation: '',
  });
  const [articleAudioFile, setArticleAudioFile] = useState(null);
  const [conversationAudioFile, setConversationAudioFile] = useState(null);
  const [currentArticleAudioUrl, setCurrentArticleAudioUrl] = useState(null);
  const [currentConversationAudioUrl, setCurrentConversationAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchMainTopics = async () => {
      try {
        const topics = await getRoadmapMainTopics();
        setMainTopics(topics);
      } catch (err) {
        console.error('Failed to load main topics:', err);
      }
    };
    fetchMainTopics();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getConversation(conversationId);
        setFormData({
          mainTopic: data.mainTopic,
          subTopic: data.subTopic,
          article: data.article,
          positiveConversation: data.positiveConversation || '',
          negativeConversation: data.negativeConversation || '',
        });
        setCurrentArticleAudioUrl(data.articleAudio);
        setCurrentConversationAudioUrl(data.conversationAudio);
      } catch (err) {
        setError('Failed to load conversation');
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArticleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleAudioFile(file);
    }
  };

  const handleConversationAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setConversationAudioFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (conversationId) {
        await updateConversation(conversationId, formData, articleAudioFile, conversationAudioFile);
        setSuccess('Knowledge base updated successfully!');
      } else {
        await createConversation(formData, articleAudioFile, conversationAudioFile);
        setSuccess('Knowledge base created successfully!');
      }
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to save knowledge base entry'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && conversationId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          {conversationId ? 'Edit Entry' : 'New Entry'}
        </h2>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div>
          <label htmlFor="mainTopic" className="block text-sm font-medium text-gray-700 mb-1">
            Main Topic *
          </label>
          <select
            id="mainTopic"
            name="mainTopic"
            value={formData.mainTopic}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a main topic</option>
            {mainTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subTopic" className="block text-sm font-medium text-gray-700 mb-1">
            Sub Topic *
          </label>
          <input
            type="text"
            id="subTopic"
            name="subTopic"
            value={formData.subTopic}
            onChange={handleChange}
            required
            maxLength="200"
            placeholder="e.g., OOP Principles, JPA Transactions, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="article" className="block text-sm font-medium text-gray-700 mb-1">
            Article Content *
          </label>
          <textarea
            id="article"
            name="article"
            value={formData.article}
            onChange={handleChange}
            required
            rows="12"
            placeholder="Enter article content (supports HTML)..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Supports plain text or HTML markup</p>
        </div>

        <div>
          <label htmlFor="positiveConversation" className="block text-sm font-medium text-gray-700 mb-1">
            Positive Conversation
          </label>
          <textarea
            id="positiveConversation"
            name="positiveConversation"
            value={formData.positiveConversation}
            onChange={handleChange}
            rows="6"
            placeholder="Enter positive aspects or insights..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="negativeConversation" className="block text-sm font-medium text-gray-700 mb-1">
            Negative Conversation
          </label>
          <textarea
            id="negativeConversation"
            name="negativeConversation"
            value={formData.negativeConversation}
            onChange={handleChange}
            rows="6"
            placeholder="Enter pitfalls, anti-patterns, or warnings..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="articleAudio" className="block text-sm font-medium text-gray-700 mb-1">
              Article Audio
            </label>
            <input
              type="file"
              id="articleAudio"
              accept="audio/*"
              onChange={handleArticleAudioChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {articleAudioFile && (
              <p className="mt-1 text-sm text-green-600">✓ New file selected: {articleAudioFile.name}</p>
            )}
            {!articleAudioFile && currentArticleAudioUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Current audio:</p>
                <audio controls className="w-full">
                  <source src={`https://api.asknehru.com${currentArticleAudioUrl}`} />
                </audio>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="conversationAudio" className="block text-sm font-medium text-gray-700 mb-1">
              Conversation Audio
            </label>
            <input
              type="file"
              id="conversationAudio"
              accept="audio/*"
              onChange={handleConversationAudioChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {conversationAudioFile && (
              <p className="mt-1 text-sm text-green-600">✓ New file selected: {conversationAudioFile.name}</p>
            )}
            {!conversationAudioFile && currentConversationAudioUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Current audio:</p>
                <audio controls className="w-full">
                  <source src={`https://api.asknehru.com${currentConversationAudioUrl}`} />
                </audio>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center"
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {conversationId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConversationForm;
