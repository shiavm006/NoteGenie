import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  StorageReference 
} from 'firebase/storage';
import { storage } from './firebase';

export const uploadFile = async (
  userId: string, 
  file: File, 
  folder: 'notes' | 'images' | 'avatars' = 'notes'
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const fileRef = ref(storage, `users/${userId}/${folder}/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      url: downloadURL
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const uploadNoteFile = async (
  userId: string, 
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  return uploadFile(userId, file, 'notes');
};

export const uploadImage = async (
  userId: string, 
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  return uploadFile(userId, file, 'images');
};

export const uploadAvatar = async (
  userId: string, 
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  return uploadFile(userId, file, 'avatars');
};

export const deleteFile = async (fileUrl: string): Promise<boolean> => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

export const getUserFiles = async (
  userId: string, 
  folder: 'notes' | 'images' | 'avatars' = 'notes'
): Promise<string[]> => {
  try {
    const folderRef = ref(storage, `users/${userId}/${folder}`);
    const result = await listAll(folderRef);
    
    const urls = await Promise.all(
      result.items.map(async (itemRef) => {
        return await getDownloadURL(itemRef);
      })
    );
    
    return urls;
  } catch (error) {
    console.error('Error getting user files:', error);
    return [];
  }
};

export const getFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFile = (file: File, maxSize: number = 10 * 1024 * 1024): { valid: boolean; error?: string } => {
  // Check file size (default 10MB)
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${getFileSize(maxSize)}`
    };
  }
  
  // Check file type
  const allowedTypes = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not supported. Please upload a text, PDF, Word document, or image file.'
    };
  }
  
  return { valid: true };
}; 