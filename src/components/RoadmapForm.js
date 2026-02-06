import React, { useState, useEffect } from 'react';
import {
  getRoadmap,
  createRoadmap,
  updateRoadmap,
} from '../services/api';

function RoadmapForm({ roadmapId, onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    mainTopic: '',
    syllabus: '',
    routerLink: '',
    intro: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (roadmapId) {
      fetchRoadmap();
    }
  }, [roadmapId]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const data = await getRoadmap(roadmapId);
      setFormData({
        mainTopic: data.mainTopic,
        syllabus: data.syllabus || '',
        routerLink: data.routerLink || '',
        intro: data.intro || '',
      });
      setCurrentImageUrl(data.imageUrl);
    } catch (err) {
      setError('Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setCurrentImageUrl(null); // Clear current image when new file selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      if (roadmapId) {
        await updateRoadmap(roadmapId, formData, imageFile);
        setSuccess('Roadmap updated successfully!');
      } else {
        await createRoadmap(formData, imageFile);
        setSuccess('Roadmap created successfully!');
      }
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save roadmap');
    } finally {
      setLoading(false);
    }
  };

  if (loading && roadmapId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {roadmapId ? 'Edit Roadmap' : 'New Roadmap'}
        </h2>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mainTopic"
              value={formData.mainTopic}
              onChange={handleChange}
              maxLength={200}
              required
              placeholder="e.g., Angular Blogs, Java Core and DSA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Router Link
            </label>
            <input
              type="text"
              name="routerLink"
              value={formData.routerLink}
              onChange={handleChange}
              placeholder="e.g., /angular-demystified, /java"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {!imageFile && currentImageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Current image:</p>
                <img 
                  src={`https://api.asknehru.com${currentImageUrl}`} 
                  alt="Current" 
                  className="h-20 w-20 rounded object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
            {imageFile && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">New image preview:</p>
                <img 
                  src={URL.createObjectURL(imageFile)} 
                  alt="Preview" 
                  className="h-20 w-20 rounded object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intro
            </label>
            <input
              type="text"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              maxLength={100}
              placeholder="Short description (max 100 chars)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.intro.length}/100 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Syllabus
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Supports plain text or HTML markup
            </p>
            <textarea
              name="syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              rows={15}
              placeholder="Enter course syllabus or roadmap details (supports HTML)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : roadmapId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoadmapForm;
