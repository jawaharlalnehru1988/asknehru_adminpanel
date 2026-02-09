import React, { useState, useEffect } from 'react';
import { createYogaPose, updateYogaPose } from '../services/api';

const YogaPoseForm = ({ pose, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    poseId: '',
    name: '',
    englishName: '',
    sanskritName: '',
    difficulty: 'BEGINNER',
    imageUrl: '',
    imageContext: '',
    description: '',
    quickBenefit: '',
    duration: '',
    category: '',
    popularity: 50,
    contraindications: [],
    mistakes: [],
    tags: [],
    benefits: [],
    detailedSteps: [],
    spiritualQuote: { text: '', author: '' }
  });

  const [contraindication, setContraindication] = useState('');
  const [mistake, setMistake] = useState('');
  const [tag, setTag] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (pose) {
      setFormData({
        ...pose,
        contraindications: pose.contraindications || [],
        mistakes: pose.mistakes || [],
        tags: pose.tags || [],
        benefits: pose.benefits || [],
        detailedSteps: pose.detailedSteps || [],
        spiritualQuote: pose.spiritualQuote || { text: '', author: '' }
      });
    }
  }, [pose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      spiritualQuote: { ...prev.spiritualQuote, [name]: value }
    }));
  };

  const addContraindication = () => {
    if (contraindication.trim()) {
      setFormData(prev => ({
        ...prev,
        contraindications: [...prev.contraindications, contraindication.trim()]
      }));
      setContraindication('');
    }
  };

  const removeContraindication = (index) => {
    setFormData(prev => ({
      ...prev,
      contraindications: prev.contraindications.filter((_, i) => i !== index)
    }));
  };

  const addMistake = () => {
    if (mistake.trim()) {
      setFormData(prev => ({
        ...prev,
        mistakes: [...prev.mistakes, mistake.trim()]
      }));
      setMistake('');
    }
  };

  const removeMistake = (index) => {
    setFormData(prev => ({
      ...prev,
      mistakes: prev.mistakes.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
      setTag('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, { title: '', description: '', icon: '' }]
    }));
  };

  const updateBenefit = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map((b, i) => 
        i === index ? { ...b, [field]: value } : b
      )
    }));
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      detailedSteps: [...prev.detailedSteps, { title: '', stage: '', description: '', breath: '' }]
    }));
  };

  const updateStep = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      detailedSteps: prev.detailedSteps.map((s, i) => 
        i === index ? { ...s, [field]: value } : s
      )
    }));
  };

  const removeStep = (index) => {
    setFormData(prev => ({
      ...prev,
      detailedSteps: prev.detailedSteps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (pose) {
        await updateYogaPose(pose.id, formData);
      } else {
        await createYogaPose(formData);
      }
      onSuccess();
    } catch (error) {
      alert('Failed to save yoga pose: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{pose ? 'Edit' : 'Add'} Yoga Pose</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pose ID *</label>
              <input
                type="text"
                name="poseId"
                value={formData.poseId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">English Name</label>
              <input
                type="text"
                name="englishName"
                value={formData.englishName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sanskrit Name</label>
              <input
                type="text"
                name="sanskritName"
                value={formData.sanskritName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 15-30 seconds"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Popularity (1-100)</label>
              <input
                type="number"
                name="popularity"
                value={formData.popularity}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image Context</label>
            <input
              type="text"
              name="imageContext"
              value={formData.imageContext}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quick Benefit</label>
            <input
              type="text"
              name="quickBenefit"
              value={formData.quickBenefit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((t, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-2">
                  {t}
                  <button type="button" onClick={() => removeTag(index)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Contraindications */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contraindications</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={contraindication}
                onChange={(e) => setContraindication(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addContraindication())}
                placeholder="Add a contraindication"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={addContraindication} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add
              </button>
            </div>
            <ul className="list-disc list-inside">
              {formData.contraindications.map((c, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="flex-1">{c}</span>
                  <button type="button" onClick={() => removeContraindication(index)} className="text-red-600 hover:text-red-800">Remove</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Common Mistakes</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={mistake}
                onChange={(e) => setMistake(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMistake())}
                placeholder="Add a common mistake"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={addMistake} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add
              </button>
            </div>
            <ul className="list-disc list-inside">
              {formData.mistakes.map((m, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="flex-1">{m}</span>
                  <button type="button" onClick={() => removeMistake(index)} className="text-red-600 hover:text-red-800">Remove</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Benefits</label>
              <button type="button" onClick={addBenefit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                Add Benefit
              </button>
            </div>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded p-4 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                    placeholder="Title"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                    placeholder="Icon"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  value={benefit.description}
                  onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <button type="button" onClick={() => removeBenefit(index)} className="text-red-600 hover:text-red-800 text-sm">
                  Remove Benefit
                </button>
              </div>
            ))}
          </div>

          {/* Detailed Steps */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Detailed Steps</label>
              <button type="button" onClick={addStep} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                Add Step
              </button>
            </div>
            {formData.detailedSteps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded p-4 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                    placeholder="Title"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={step.stage}
                    onChange={(e) => updateStep(index, 'stage', e.target.value)}
                    placeholder="Stage (optional)"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={step.breath}
                  onChange={(e) => updateStep(index, 'breath', e.target.value)}
                  placeholder="Breath instruction"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <button type="button" onClick={() => removeStep(index)} className="text-red-600 hover:text-red-800 text-sm">
                  Remove Step
                </button>
              </div>
            ))}
          </div>

          {/* Spiritual Quote */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Spiritual Quote</label>
            <textarea
              name="text"
              value={formData.spiritualQuote.text}
              onChange={handleQuoteChange}
              placeholder="Quote text"
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <input
              type="text"
              name="author"
              value={formData.spiritualQuote.author}
              onChange={handleQuoteChange}
              placeholder="Author"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {submitting ? 'Saving...' : 'Save Pose'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YogaPoseForm;
