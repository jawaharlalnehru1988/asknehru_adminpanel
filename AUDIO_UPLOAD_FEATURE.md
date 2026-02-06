# Audio Upload Feature for Conversations

## Overview
Added audio file upload functionality to the conversation management system. Admins can now upload audio files when creating or editing conversations, and these files are stored in the backend media directory.

## Backend Changes

### 1. Database Schema
- Added `audio` column (VARCHAR 500) to `conversation_topics` table
- Stores the filename of uploaded audio files

### 2. File Storage Service
**Location**: `/var/www/spring-apps/asknehrubackend/src/main/java/com/asknehru/asknehrubackend/conversations/FileStorageService.java`

**Features**:
- Stores files with UUID-based filenames to prevent conflicts
- Saves files to `media/audio/` directory
- Handles file deletion when conversations are deleted or audio is replaced
- Preserves original file extensions

### 3. API Changes
**Create Conversation**: `POST /api/conversations`
- Now accepts `multipart/form-data` instead of JSON
- Fields: `data` (JSON with conversation details), `audio` (file, optional)

**Update Conversation**: `PUT /api/conversations/{id}`
- Now accepts `multipart/form-data`
- Replaces old audio file if new one is uploaded

**Get Audio**: `GET /api/conversations/audio/{filename}`
- Serves audio files with proper content-type headers
- Returns 404 if file doesn't exist

**Response Format**:
- Audio field in responses now contains URL path: `/api/conversations/audio/{filename}`
- Frontend can use: `https://api.asknehru.com/api/conversations/audio/{filename}`

### 4. Configuration
**application.properties**:
```properties
file.upload.dir=media/audio
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

## Frontend Changes

### 1. File Upload UI
**Location**: `/var/www/asknehru-admin/src/components/ConversationForm.js`

**Features**:
- File input with `accept="audio/*"` filter
- Shows existing audio player if conversation has audio
- Displays selected file name before upload
- Audio preview with HTML5 audio controls

### 2. API Service Updates
**Location**: `/var/www/asknehru-admin/src/services/api.js`

**Changes**:
- `createConversation()` and `updateConversation()` now accept `audioFile` parameter
- Constructs FormData with JSON blob for data and file for audio
- Sets `Content-Type: multipart/form-data` header

### 3. Conversations List
**Location**: `/var/www/asknehru-admin/src/components/ConversationsList.js`

**Features**:
- Added "Audio" column to table
- Shows audio player for conversations with audio files
- Shows "-" for conversations without audio

## File Storage Structure

```
/var/www/spring-apps/asknehrubackend/
└── media/
    └── audio/
        ├── {uuid}.mp3
        ├── {uuid}.wav
        └── ...
```

## Usage

### Upload Audio via Admin Panel

1. Navigate to https://admin.asknehru.com
2. Click "Add New Conversation" or edit existing one
3. Fill in the conversation details
4. Click "Choose File" under "Audio File (Optional)"
5. Select an audio file (MP3, WAV, OGG, etc.)
6. Click "Create" or "Update"

### Access Audio Files

**Via API**:
```
GET https://api.asknehru.com/api/conversations/audio/{filename}
```

**Via Admin Panel**:
- Audio players automatically display in the form (edit view)
- Audio players appear in the conversations list table

## Technical Details

### Supported Audio Formats
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- M4A (.m4a)
- AAC (.aac)
- Any format supported by HTML5 audio element

### File Size Limits
- Maximum file size: 10MB
- Maximum request size: 10MB

### Security
- Files stored with UUID names to prevent path traversal attacks
- JWT authentication required for upload/update operations
- File serving endpoint is public (read-only)

### Error Handling
- Frontend shows error if upload fails
- Backend returns appropriate HTTP status codes
- Old files are cleaned up when replaced or deleted

## Testing

1. **Create with audio**: Upload a new conversation with an audio file
2. **Edit without changing audio**: Update text fields, keep existing audio
3. **Replace audio**: Upload a different audio file for existing conversation
4. **Delete conversation**: Verify audio file is removed from disk
5. **Playback**: Test audio playback in list view and edit form

## Future Enhancements

- Audio file validation (format, duration)
- Audio transcription integration
- Waveform visualization
- Bulk audio upload
- Audio compression/optimization
- CDN integration for better performance

---
**Deployed**: February 6, 2026
**Backend**: Spring Boot 4.0.2
**Frontend**: React 18
**Storage**: Local filesystem (media/audio/)
