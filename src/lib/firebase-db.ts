import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { LibraryBook } from './utils';

// Types
export interface UserBook extends LibraryBook {
  userId: string;
  addedAt: any; // Firestore timestamp
  readingProgress?: {
    currentPage: number;
    totalPages: number;
    percentage: number;
    lastRead: any; // Firestore timestamp
  };
}

export interface UserNote {
  id?: string;
  userId: string;
  title: string;
  content: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  bookId?: string;
  tags: string[];
  isPublic: boolean;
  createdAt: any; // Firestore timestamp
  updatedAt: any; // Firestore timestamp
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: any; // Firestore timestamp
  lastLogin: any; // Firestore timestamp
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
    privacy: 'public' | 'private';
  };
  statistics: {
    totalBooks: number;
    totalNotes: number;
    readingTime: number;
  };
}

// Books Collection
export const booksCollection = (userId: string) => 
  collection(db, 'users', userId, 'books');

export const addBookToLibrary = async (userId: string, book: Omit<LibraryBook, 'addedAt'>): Promise<boolean> => {
  try {
    const bookData: Omit<UserBook, 'id'> = {
      ...book,
      userId,
      addedAt: serverTimestamp(),
    };
    
    await addDoc(booksCollection(userId), bookData);
    return true;
  } catch (error) {
    console.error('Error adding book to library:', error);
    return false;
  }
};

export const removeBookFromLibrary = async (userId: string, bookId: string): Promise<boolean> => {
  try {
    const bookDoc = doc(db, 'users', userId, 'books', bookId);
    await deleteDoc(bookDoc);
    return true;
  } catch (error) {
    console.error('Error removing book from library:', error);
    return false;
  }
};

export const getUserBooks = async (userId: string): Promise<UserBook[]> => {
  try {
    const q = query(booksCollection(userId), orderBy('addedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserBook[];
  } catch (error) {
    console.error('Error getting user books:', error);
    return [];
  }
};

export const updateBookProgress = async (
  userId: string, 
  bookId: string, 
  progress: { currentPage: number; totalPages: number }
): Promise<boolean> => {
  try {
    const bookDoc = doc(db, 'users', userId, 'books', bookId);
    const percentage = (progress.currentPage / progress.totalPages) * 100;
    
    await updateDoc(bookDoc, {
      readingProgress: {
        currentPage: progress.currentPage,
        totalPages: progress.totalPages,
        percentage: Math.round(percentage),
        lastRead: serverTimestamp(),
      }
    });
    return true;
  } catch (error) {
    console.error('Error updating book progress:', error);
    return false;
  }
};

// Notes Collection
export const notesCollection = (userId: string) => 
  collection(db, 'users', userId, 'notes');

export const addNote = async (userId: string, note: Omit<UserNote, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const noteData: Omit<UserNote, 'id'> = {
      ...note,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(notesCollection(userId), noteData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding note:', error);
    return null;
  }
};

export const updateNote = async (userId: string, noteId: string, updates: Partial<UserNote>): Promise<boolean> => {
  try {
    const noteDoc = doc(db, 'users', userId, 'notes', noteId);
    await updateDoc(noteDoc, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating note:', error);
    return false;
  }
};

export const deleteNote = async (userId: string, noteId: string): Promise<boolean> => {
  try {
    const noteDoc = doc(db, 'users', userId, 'notes', noteId);
    await deleteDoc(noteDoc);
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    return false;
  }
};

export const getUserNotes = async (userId: string): Promise<UserNote[]> => {
  try {
    const q = query(notesCollection(userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserNote[];
  } catch (error) {
    console.error('Error getting user notes:', error);
    return [];
  }
};

export const getPublicNotes = async (): Promise<UserNote[]> => {
  try {
    const q = query(
      collection(db, 'users'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserNote[];
  } catch (error) {
    console.error('Error getting public notes:', error);
    return [];
  }
};

// User Profile
export const createUserProfile = async (userData: Omit<UserProfile, 'createdAt' | 'lastLogin'>): Promise<boolean> => {
  try {
    const userDoc = doc(db, 'users', userData.uid);
    await updateDoc(userDoc, {
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<boolean> => {
  try {
    const userDoc = doc(db, 'users', uid);
    await updateDoc(userDoc, {
      ...updates,
      lastLogin: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = doc(db, 'users', uid);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Real-time listeners
export const subscribeToUserBooks = (userId: string, callback: (books: UserBook[]) => void) => {
  const q = query(booksCollection(userId), orderBy('addedAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserBook[];
    callback(books);
  });
};

export const subscribeToUserNotes = (userId: string, callback: (notes: UserNote[]) => void) => {
  const q = query(notesCollection(userId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserNote[];
    callback(notes);
  });
}; 