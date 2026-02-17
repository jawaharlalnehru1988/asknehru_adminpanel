import React, { useEffect, useState } from 'react';
import { createYogaPose, updateYogaPose, uploadYogaAudio, uploadYogaImage } from '../services/api';

const YOGA_NAME_GROUPS = [
  {
    label: '🧘 Foundational / Relaxation Asanas',
    options: [
      { value: 'Shavasana', label: 'Shavasana' },
      { value: 'Makarasana', label: 'Makarasana' },
      { value: 'Balasana', label: 'Balasana' },
      { value: 'Shashankasana', label: 'Shashankasana' },
      { value: 'Advasana', label: 'Advasana' },
      { value: 'Jyestikasana', label: 'Jyestikasana' },
      { value: 'Supta Baddha Konasana', label: 'Supta Baddha Konasana' },
      { value: 'Sukhasana', label: 'Sukhasana' },
      { value: 'Padmasana', label: 'Padmasana' },
      { value: 'Siddhasana', label: 'Siddhasana' },
      { value: 'Vajrasana', label: 'Vajrasana' },
      { value: 'Swastikasana', label: 'Swastikasana' },
    ],
  },
  {
    label: '🧘 Standing Asanas',
    options: [
      { value: 'Tadasana', label: 'Tadasana' },
      { value: 'Vrikshasana', label: 'Vrikshasana' },
      { value: 'Trikonasana', label: 'Trikonasana' },
      { value: 'Parsvakonasana', label: 'Parsvakonasana' },
      { value: 'Utkatasana', label: 'Utkatasana' },
      { value: 'Padahastasana', label: 'Padahastasana' },
      { value: 'Ardha Chakrasana', label: 'Ardha Chakrasana' },
      { value: 'Virabhadrasana I', label: 'Virabhadrasana I' },
      { value: 'Virabhadrasana II', label: 'Virabhadrasana II' },
      { value: 'Virabhadrasana III', label: 'Virabhadrasana III' },
      { value: 'Prasarita Padottanasana', label: 'Prasarita Padottanasana' },
      { value: 'Garudasana', label: 'Garudasana' },
      { value: 'Natarajasana', label: 'Natarajasana' },
    ],
  },
  {
    label: '🧘 Sitting Asanas',
    options: [
      { value: 'Paschimottanasana', label: 'Paschimottanasana' },
      { value: 'Janu Shirshasana', label: 'Janu Shirshasana' },
      { value: 'Ardha Matsyendrasana', label: 'Ardha Matsyendrasana' },
      { value: 'Vakrasana', label: 'Vakrasana' },
      { value: 'Baddha Konasana', label: 'Baddha Konasana' },
      { value: 'Mandukasana', label: 'Mandukasana' },
      { value: 'Gomukhasana', label: 'Gomukhasana' },
      { value: 'Simhasana', label: 'Simhasana' },
      { value: 'Ustrasana', label: 'Ustrasana' },
      { value: 'Yoga Mudrasana', label: 'Yoga Mudrasana' },
    ],
  },
  {
    label: '🧘 Supine Asanas',
    options: [
      { value: 'Pavanamuktasana', label: 'Pavanamuktasana' },
      { value: 'Uttanpadasana', label: 'Uttanpadasana' },
      { value: 'Setu Bandhasana', label: 'Setu Bandhasana' },
      { value: 'Supta Padangusthasana', label: 'Supta Padangusthasana' },
      { value: 'Matsyasana', label: 'Matsyasana' },
      { value: 'Chakrasana', label: 'Chakrasana' },
      { value: 'Anantasana', label: 'Anantasana' },
      { value: 'Supta Vajrasana', label: 'Supta Vajrasana' },
      { value: 'Naukasana', label: 'Naukasana' },
    ],
  },
  {
    label: '🧘 Prone Asanas',
    options: [
      { value: 'Bhujangasana', label: 'Bhujangasana' },
      { value: 'Shalabhasana', label: 'Shalabhasana' },
      { value: 'Dhanurasana', label: 'Dhanurasana' },
      { value: 'Makarasana (Prone)', label: 'Makarasana' },
      { value: 'Naukasana (Prone Variation)', label: 'Naukasana (Prone Variation)' },
      { value: 'Saral Bhujangasana', label: 'Saral Bhujangasana' },
      { value: 'Ardha Shalabhasana', label: 'Ardha Shalabhasana' },
    ],
  },
  {
    label: '🧘 Spine Twisting Asanas',
    options: [
      { value: 'Ardha Matsyendrasana (Spine Twisting)', label: 'Ardha Matsyendrasana' },
      { value: 'Vakrasana (Spine Twisting)', label: 'Vakrasana' },
      { value: 'Supta Matsyendrasana', label: 'Supta Matsyendrasana' },
      { value: 'Bharadvajasana', label: 'Bharadvajasana' },
      { value: 'Marichyasana', label: 'Marichyasana' },
    ],
  },
  {
    label: '🧘 Inverted Asanas',
    options: [
      { value: 'Sarvangasana', label: 'Sarvangasana' },
      { value: 'Halasana', label: 'Halasana' },
      { value: 'Viparita Karani', label: 'Viparita Karani' },
      { value: 'Shirshasana', label: 'Shirshasana' },
      { value: 'Adho Mukha Svanasana', label: 'Adho Mukha Svanasana' },
      { value: 'Pincha Mayurasana', label: 'Pincha Mayurasana' },
    ],
  },
  {
    label: '🧘 Core Strengthening Asanas',
    options: [
      { value: 'Naukasana (Core Strengthening)', label: 'Naukasana' },
      { value: 'Kumbhakasana (Plank Pose)', label: 'Kumbhakasana (Plank Pose)' },
      { value: 'Chaturanga Dandasana', label: 'Chaturanga Dandasana' },
      { value: 'Vasisthasana', label: 'Vasisthasana' },
      { value: 'Uttanpadasana (Core Strengthening)', label: 'Uttanpadasana' },
      { value: 'Phalakasana', label: 'Phalakasana' },
    ],
  },
  {
    label: '🧘 Hip Opening Asanas',
    options: [
      { value: 'Baddha Konasana (Hip Opening)', label: 'Baddha Konasana' },
      { value: 'Malasana', label: 'Malasana' },
      { value: 'Gomukhasana (Hip Opening)', label: 'Gomukhasana' },
      { value: 'Anjaneyasana', label: 'Anjaneyasana' },
      { value: 'Eka Pada Rajakapotasana', label: 'Eka Pada Rajakapotasana' },
    ],
  },
  {
    label: '🧘 Backward Bending Asanas',
    options: [
      { value: 'Bhujangasana (Backward Bending)', label: 'Bhujangasana' },
      { value: 'Ustrasana (Backward Bending)', label: 'Ustrasana' },
      { value: 'Chakrasana (Backward Bending)', label: 'Chakrasana' },
      { value: 'Setu Bandhasana (Backward Bending)', label: 'Setu Bandhasana' },
      { value: 'Dhanurasana (Backward Bending)', label: 'Dhanurasana' },
      { value: 'Matsyasana (Backward Bending)', label: 'Matsyasana' },
    ],
  },
];

const CATEGORY_OPTIONS = [
  'Neck Relief',
  'Shoulder Relief',
  'Upper Back Relief',
  'Lower Back Relief',
  'Spine Flexibility',
  'Hip Joint Relief',
  'Knee Joint Relief',
  'Ankle & Foot Relief',
  'Digestive Improvement',
  'Respiratory Improvement',
  'Stress & Anxiety Relief',
  'Hormonal Balance',
  'Reproductive Health',
  'Blood Circulation',
  'Weight Management',
  'Full Body Relaxation',
  'Core Strengthening',
  'Sciatica Relief',
  'Arthritis Relief',
  'Posture Correction',
];

const YOGA_NAME_VALUES = YOGA_NAME_GROUPS.flatMap((group) =>
  group.options.map((option) => option.value)
);

const YogaPoseForm = ({ pose, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    yogaName: '',
    blogContent: '',
    audioURL: '',
    videoURL: '',
    imageURL: '',
    category: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [audioPreview, setAudioPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isCustomYogaName, setIsCustomYogaName] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  useEffect(() => {
    if (pose) {
      const poseYogaName = pose.yogaName || '';
      const poseCategory = pose.category || '';
      const customYoga = !!poseYogaName && !YOGA_NAME_VALUES.includes(poseYogaName);
      const customCategory = !!poseCategory && !CATEGORY_OPTIONS.includes(poseCategory);

      setIsCustomYogaName(customYoga);
      setIsCustomCategory(customCategory);

      setFormData({
        yogaName: poseYogaName,
        blogContent: pose.blogContent || '',
        audioURL: pose.audioURL || '',
        videoURL: pose.videoURL || '',
        imageURL: pose.imageURL || '',
        category: poseCategory,
      });
      setImagePreview(pose.imageURL || '');
      setAudioPreview(pose.audioURL || '');
    }
  }, [pose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleYogaNameSelectChange = (e) => {
    const { value } = e.target;
    if (value === '__custom__') {
      setIsCustomYogaName(true);
      setFormData((prev) => ({ ...prev, yogaName: '' }));
      return;
    }

    setIsCustomYogaName(false);
    setFormData((prev) => ({ ...prev, yogaName: value }));
  };

  const handleCategorySelectChange = (e) => {
    const { value } = e.target;
    if (value === '__custom__') {
      setIsCustomCategory(true);
      setFormData((prev) => ({ ...prev, category: '' }));
      return;
    }

    setIsCustomCategory(false);
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('Audio size must be less than 50MB');
      return;
    }

    setAudioFile(file);
    setAudioPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setUploading(true);

    try {
      let audioURL = formData.audioURL;
      if (audioFile) {
        const uploadedAudio = await uploadYogaAudio(audioFile);
        audioURL = uploadedAudio.url;
      }

      let imageURL = formData.imageURL;
      if (imageFile) {
        const uploadedImage = await uploadYogaImage(imageFile);
        imageURL = uploadedImage.url;
      }

      const payload = {
        ...formData,
        audioURL,
        imageURL,
      };

      if (pose) {
        await updateYogaPose(pose.id, payload);
      } else {
        await createYogaPose(payload);
      }

      onSuccess();
    } catch (error) {
      alert('Failed to save yoga pose: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{pose ? 'Edit' : 'Add'} Yoga Pose</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Yoga Name *</label>
              <select
                name="yogaName"
                value={isCustomYogaName ? '__custom__' : formData.yogaName}
                onChange={handleYogaNameSelectChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select yoga name</option>
                {YOGA_NAME_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="__custom__">Other (type custom)</option>
              </select>
              {isCustomYogaName && (
                <input
                  type="text"
                  name="yogaName"
                  value={formData.yogaName}
                  onChange={handleChange}
                  placeholder="Type custom yoga name"
                  required
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={isCustomCategory ? '__custom__' : formData.category}
                onChange={handleCategorySelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="__custom__">Other (type custom)</option>
              </select>
              {isCustomCategory && (
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Type custom category"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Video URL</label>
              <input
                type="url"
                name="videoURL"
                value={formData.videoURL}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload Audio</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {audioPreview && (
              <div className="mt-2">
                <audio controls className="w-full">
                  <source src={audioPreview} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Max file size: 50MB. Accepted formats: MP3, WAV, M4A, OGG</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs h-40 object-cover rounded border border-gray-300"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Accepted formats: JPG, PNG, GIF, WebP</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Blog Content</label>
            <textarea
              name="blogContent"
              value={formData.blogContent}
              onChange={handleChange}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              disabled={submitting || uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {uploading ? 'Uploading Image...' : submitting ? 'Saving...' : 'Save Pose'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YogaPoseForm;
