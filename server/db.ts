import mongoose from 'mongoose';

export default async function () {
  try {
    // Подключение к MongoDB
 
    await mongoose.connect('mongodb+srv://user:12345@cluster0.hkqci6s.mongodb.net/', {
    	 //@ts-ignore
		 useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}