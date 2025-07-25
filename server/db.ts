import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// MongoDB connection
let mongoServer: MongoMemoryServer;
let isConnected = false;

export async function connectToMongoDB() {
  if (isConnected) {
    return;
  }

  try {
    // Start in-memory MongoDB server for development
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('Connected to MongoDB successfully (in-memory)');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectFromMongoDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  isConnected = false;
}

// Mongoose schemas
const legalDocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // 'constitution', 'penal_code', 'act', 'case_law'
  section: { type: String, default: null },
  article: { type: String, default: null },
  content: { type: String, required: true },
  citation: { type: String, default: null },
  metadata: { type: mongoose.Schema.Types.Mixed, default: null },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const legalQuerySchema = new mongoose.Schema({
  question: { type: String, required: true },
  response: { type: String, required: true },
  sources: { type: mongoose.Schema.Types.Mixed, default: null }, // Array of source citations
  category: { type: String, default: null }, // 'constitutional', 'criminal', 'civil', etc.
  confidence: { type: String, default: null }, // 'high', 'medium', 'low'
}, {
  timestamps: true
});

export const LegalDocument = mongoose.model('LegalDocument', legalDocumentSchema);
export const LegalQuery = mongoose.model('LegalQuery', legalQuerySchema);